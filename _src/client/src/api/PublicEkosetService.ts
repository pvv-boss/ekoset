import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer'
import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity';
import Partner from '@/models/ekoset/Partner';
import PartnerGroup from '@/models/ekoset/PartnerGroup';
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter';
import DynamicComponentInfo from '@/models/DynamicComponentInfo';

export default class PublicEkosetService extends BaseService {

  public async getDynamicComponentsInfo (siteSectionSlug: string, serviceSlug?: string): Promise<DynamicComponentInfo[]> {

    // Нас рекомендуют (брэнды) (для услуги или раздела или для главной)
    let brandItems: any = null

    if (!!serviceSlug) {
      brandItems = this.getBrandsByBusinessServiceSlug(serviceSlug)
    }

    if (!serviceSlug && !!siteSectionSlug) {
      brandItems = this.getBrandsBySiteSectionSlug(siteSectionSlug)
    }

    if (!brandItems) {
      brandItems = this.getBrandsForHomePage()
    }


    // Рекомендательные письма (в зависимости от услуги, раздела или главное. Определяется по брендам)
    // ReccomendationLetter
    let reccomendationLetterItems: any = null
    if (!!serviceSlug) {
      reccomendationLetterItems = this.getRecommendationLettersByBusinessServiceSlug(serviceSlug)
    }

    if (!serviceSlug && !!siteSectionSlug) {
      reccomendationLetterItems = this.getRecommendationLettersBySiteSectionSlug(siteSectionSlug)
    }

    if (!reccomendationLetterItems) {
      reccomendationLetterItems = this.getRecommendationLettersForHomePage()
    }


    // Новости (для услуги или для раздела или для главной)
    let articleItems: any = null
    if (!!serviceSlug) {
      articleItems = getServiceContainer().articleService.getArticleListByBusinessServiceSlug(siteSectionSlug, serviceSlug)
    }

    if (!serviceSlug && !!siteSectionSlug) {
      articleItems = getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSectionSlug)
    }

    if (!articleItems) {
      articleItems = getServiceContainer().articleService.getRootArticleList()
    }


    // Прописываем данные в компопонте (в его пропы)
    const data = await Promise.all([brandItems, articleItems, reccomendationLetterItems])

    const componentsInfo: DynamicComponentInfo[] = await HttpUtil.httpGet('admin/panel/cms/blocks/info')

    componentsInfo.sort((a, b) => {
      return a.visibleIndex - b.visibleIndex;
    })

    const newsCompoenentInfo = componentsInfo.find((iter) => {
      return iter.id === 3
    })
    if (!!newsCompoenentInfo) {
      newsCompoenentInfo.props.articleList = data[1]
      newsCompoenentInfo.props.articleList = !!newsCompoenentInfo.props.articleList ? newsCompoenentInfo.props.articleList.slice(0, 3) : newsCompoenentInfo.props.articleList
      newsCompoenentInfo.props.mode = 'columns'
      newsCompoenentInfo.visible = !!newsCompoenentInfo.props.articleList && newsCompoenentInfo.props.articleList.length > 0
    }

    const lettersCompoenentInfo = componentsInfo.find((iter) => {
      return iter.id === 2
    })
    if (!!lettersCompoenentInfo) {
      lettersCompoenentInfo.props.recommLetterList = data[2]
      lettersCompoenentInfo.visible = !!lettersCompoenentInfo.props.recommLetterList && lettersCompoenentInfo.props.recommLetterList.length > 0
    }

    const recommendCompoenentInfo = componentsInfo.find((iter) => {
      return iter.id === 1
    })
    if (!!recommendCompoenentInfo) {
      recommendCompoenentInfo.props.brandList = data[0]
      recommendCompoenentInfo.visible = !!recommendCompoenentInfo.props.brandList && recommendCompoenentInfo.props.brandList.length > 0
    }

    return componentsInfo

  }


  public async getSiteSectionBySlug (slug: string) {
    return this.getSiteSectionById(this.getIdBySlug(slug))
  }

  public async getSiteSectionNameBySlug (slug: string) {
    const query = `activities/query/name/${this.getIdBySlug(slug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getSiteSections () {
    const query = `activities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  // Клиенты
  public async getPartners () {
    const query = `clients`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  // Клиент
  public async getPartnerById (id: number) {
    const query = `clients/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async savePartner (partner: Partner) {
    const query = `clients`
    return HttpUtil.httpPut(this.buildHttRequest(query), partner)
  }

  public async getPartnerGroups () {
    const query = 'admin/panel/clients/groups'
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async savePartnerGroup (partnerGroup: PartnerGroup) {
    const query = 'admin/panel/clients/groups'
    return HttpUtil.httpPut(this.buildHttRequest(query), partnerGroup)
  }

  public async getClActivityList () {
    const query = `admin/panel/clActivities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminAllBands () {
    const query = `admin/panel/brands`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBrandById (id: number) {
    const query = `admin/panel/brands/${id}`
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

  public async saveClActivity (clActivity: ClActivity) {
    return HttpUtil.httpPut(this.buildHttRequest('admin/panel/clActivities'), clActivity)
  }

  public async addOrRemoveBrand2SiteSection (brandId: number, siteSectionId: number, isAdd: boolean) {
    const query = `brands/${brandId}/sitesection/${siteSectionId}`
    if (isAdd) {
      return HttpUtil.httpPut(query)
    } else {
      return HttpUtil.httpDelete(query)
    }
  }

  public async addOrRemoveBrand2Service (brandId: number, serviceId: number, isAdd: boolean) {
    const query = `brands/${brandId}/service/${serviceId}`
    if (isAdd) {
      return HttpUtil.httpPut(query)
    } else {
      return HttpUtil.httpDelete(query)
    }
  }

  public async deleteBrand (id: number) {
    return HttpUtil.httpDelete(this.buildHttRequest(`brands/${id}`))
  }

  // Рекомендации
  public async getRecommendationLettersByBrand (brandId: number) {
    const query = `brands/${brandId}/letters`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }


  public async saveRecommendation (letter: ReccomendationLetter) {
    const query = 'brands/letters'
    return HttpUtil.httpPut(this.buildHttRequest(query), letter)
  }


  public async deleteRecommendationLetter (id: number) {
    const query = `brands/letters/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  public async getRecommendationLettersByBusinessServiceSlug (serviceSlug: string) {
    const query = `letters/services/${this.getIdBySlug(serviceSlug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async   getRecommendationLettersBySiteSectionSlug (siteSectionSlug: string) {
    const query = `letters/sitesection/${this.getIdBySlug(siteSectionSlug)}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async  getRecommendationLettersForHomePage () {
    const query = `letters`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  //

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

