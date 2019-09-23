import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'

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

  public async getClActivityList () {
    const query = `admin/panel/clActivities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminAllBands () {
    const query = `admin/panel/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminForSiteSectionBrands (siteSectionId: number) {
    const query = `admin/panel/brands/activities/${siteSectionId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminForBusinessServiceBrands (serviceId: number) {
    const query = `admin/panel/brands/serivce/${serviceId}`
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

  public async saveBrand (brand: ClBrand) {
    return HttpUtil.httpPut(this.buildHttRequest('brands'), brand)
  }

  public async deleteBrand (id: number) {
    return HttpUtil.httpDelete(this.buildHttRequest(`brands/${id}`))
  }

  public async sendFormMessage (formData: FormData) {
    const result = HttpUtil.httpPostForm('user/message', formData)
    return result
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

