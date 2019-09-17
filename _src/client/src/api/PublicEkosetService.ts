import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer';
import ApiSharedData from '@/models/ekoset/ApiSharedData';
import SiteSection from '@/models/ekoset/SiteSection';

export default class PublicEkosetService extends BaseService {

  public async getApiSharedData (siteSectionSlug: string, serviceSlug?: string): Promise<ApiSharedData> {
    // Нас рекомендуют (брэнды) (для услуги или раздела или для главной)
    let brandItems: any
    if (serviceSlug) {
      brandItems = this.getBrandsByBusinessServiceSlug(serviceSlug)
    }

    if (!serviceSlug && siteSectionSlug) {
      brandItems = this.getBrandsBySiteSectionSlug(siteSectionSlug)
    }

    if (!brandItems) {
      brandItems = this.getBrandsForHomePage()
    }

    // Новости (для услуги или для раздела или для главной)
    let articleItems: any
    if (serviceSlug) {
      articleItems = getServiceContainer().articleService.getArticleListByBusinessServiceSlug(siteSectionSlug, serviceSlug)
    }

    if (!serviceSlug && siteSectionSlug) {
      articleItems = getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSectionSlug)
    }

    if (!articleItems) {
      articleItems = getServiceContainer().articleService.getRootArticleList()
    }

    // Мета
    const seoMeta = getServiceContainer().seoMetaService.getForHomePage()

    const data = await Promise.all([brandItems, articleItems, seoMeta])

    const result = new ApiSharedData()
    result.brandItems = data[0]
    result.articleItems = data[1]
    result.seoMeta = data[2]

    return result
  }

  public async getSiteSectionBySlug (slug: string) {
    return this.getSiteSectionById(this.getIdBySlug(slug))
  }

  public async getSiteSections () {
    const query = `activities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getPartners () {
    const query = `clients`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAllBrands () {
    const query = `allbrands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandsForHomePage () {
    const query = `brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandsBySiteSectionSlug (slug: string) {
    return this.getBrandsBySiteSection(this.getIdBySlug(slug))
  }

  public async getBrandsByBusinessServiceSlug (slug: string) {
    return this.getBrandsByBusinessService(this.getIdBySlug(slug))
  }

  public async saveSiteSection (siteSection: SiteSection) {
    return HttpUtil.httpPut(this.buildHttRequest('activities'), siteSection)
  }

  public async deleteSiteSection (slug: string) {
    return HttpUtil.httpDelete(this.buildHttRequest(`activities/${this.getIdBySlug(slug)}`))
  }

  private async getBrandsBySiteSection (siteSectionId: number) {
    const query = `${siteSectionId}/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async getBrandsByBusinessService (serviceId: number) {
    const query = `services/${serviceId}/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async getSiteSectionById (siteSectionId: number) {
    const query = `activities/${siteSectionId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }
}

