import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer';
import DynamicComponentInfo from '@/models/DynamicComponentInfo';

export default class DynamicComponentsService extends BaseService {

  public async getSiteSectionDynamicComponentsInfo (siteSectionUrl: string, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(siteSectionUrl, null, null), siteSectionUrl, null, adminMode)
  }

  public async getServiceDynamicComponentsInfo (siteSectionUrl: string, serviceUrl: string, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, serviceUrl, null), siteSectionUrl, serviceUrl, adminMode)
  }

  public async getIndOfferDynamicComponentsInfo (siteSectionUrl: string, indOfferUrl: string, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, null, indOfferUrl), siteSectionUrl, null, adminMode)
  }

  public async getTopMenuDynamicComponents (adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, null, null), null, null, adminMode)
  }

  public async saveSiteSectionDynamicComponentsInfo (siteSectionId: number, infos: DynamicComponentInfo[]) {
    return HttpUtil.httpPost(this.createRequestQueryString('slug-' + siteSectionId, null, null), infos)
  }

  public async saveServiceDynamicComponentsInfo (serviceId: number, infos: DynamicComponentInfo[]) {
    return HttpUtil.httpPost(this.createRequestQueryString(null, 'slug-' + serviceId, null), infos)
  }

  public async adminSaveDynamicComponentsOffer (offerId: number, infos: DynamicComponentInfo[]) {
    return HttpUtil.httpPost(this.createRequestQueryString(null, null, 'slug-' + offerId), infos)
  }

  public async adminDeleteDynamicComponent (blockId: number) {
    return HttpUtil.httpDelete(`admin/panel/cms/blocks/${blockId}`)
  }

  private async adminGetDynamicComponentsInfo (siteSectionUrl: string | null, serviceUrl: string | null, indOfferUrl: string | null): Promise<DynamicComponentInfo[]> {
    return HttpUtil.httpGet(this.createRequestQueryString(siteSectionUrl, serviceUrl, indOfferUrl))
  }

  private createRequestQueryString (siteSectionUrl: string | null, serviceUrl: string | null, indOfferUrl: string | null) {
    const queryParamSlug = !!siteSectionUrl ? siteSectionUrl : (!!serviceUrl ? serviceUrl : (!!indOfferUrl ? indOfferUrl : 'slug-0'))
    const id = this.getIdBySlug(queryParamSlug)
    const queryParam = id === 0 ? 'default' : !!siteSectionUrl ? 'sitesection' : (!!serviceUrl ? 'service' : (!!indOfferUrl ? 'offer' : 'default'))
    return `admin/panel/cms/blocks/info/${queryParam}/${id}`
  }

  private async getDynamicComponentsInfo (httpResultPr: Promise<DynamicComponentInfo[]>, siteSectionSlug: string | null, serviceSlug: string | null, adminMode: boolean): Promise<DynamicComponentInfo[]> {

    // Услуга м.б. второго уровня, если так, то данные берем от его предка
    let serviceIdForRelations = 0
    if (!!serviceSlug) {
      const businessService = await getServiceContainer().businessServiceService.getBySlug(serviceSlug)
      serviceIdForRelations = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0 ? businessService.businessServiceParentId : businessService.businessServiceId
    }

    // Нас рекомендуют (брэнды) (для услуги или раздела или для главной)
    let brandItems: any = null
    let reccomendationLetterItems: any = null
    if (serviceIdForRelations > 0) {
      brandItems = getServiceContainer().publicEkosetService.getBrandsByBusinessServiceSlug('slug-' + serviceIdForRelations)
    }

    if (!brandItems && !!siteSectionSlug) {
      brandItems = getServiceContainer().publicEkosetService.getBrandsBySiteSectionSlug(siteSectionSlug)
    }

    if (!brandItems) {
      brandItems = getServiceContainer().publicEkosetService.getBrandsForHomePage()
    }

    // Рекомендательные письма (в зависимости от услуги, раздела или главное. Определяется по брендам)
    // ReccomendationLetter
    if (serviceIdForRelations > 0) {
      reccomendationLetterItems = getServiceContainer().publicEkosetService.getRecommendationLettersByBusinessServiceSlug('slug-' + serviceIdForRelations)
    }

    if (!reccomendationLetterItems && !!siteSectionSlug) {
      reccomendationLetterItems = getServiceContainer().publicEkosetService.getRecommendationLettersBySiteSectionSlug(siteSectionSlug)
    }

    if (!reccomendationLetterItems) {
      reccomendationLetterItems = getServiceContainer().publicEkosetService.getRecommendationLettersForHomePage()
    }

    // Новости (для услуги или для раздела или для главной)
    let articleItems: any = null
    if (serviceIdForRelations > 0) {
      articleItems = getServiceContainer().articleService.getArticleListByBusinessServiceSlug(siteSectionSlug, 'slug-' + serviceIdForRelations)
    }

    if (!articleItems && !!siteSectionSlug) {
      articleItems = getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSectionSlug)
    }

    if (!articleItems) {
      articleItems = getServiceContainer().articleService.getRootArticleList()
    }

    // Индивидуальные предложения
    let busineesTypeOfferList: any = null
    if (!!siteSectionSlug) {
      busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(siteSectionSlug)
    }

    // Услуги
    let serviceList: any = null
    let serviceHasParent = false
    if (!!serviceSlug) {
      const businessService = await getServiceContainer().businessServiceService.getBySlug(serviceSlug)
      const childServiceList = await getServiceContainer().businessServiceService.getChildServicesByParentId(businessService.businessServiceId)
      serviceList = !!childServiceList && childServiceList.length && childServiceList.length > 0 ? [...childServiceList] : [businessService]
      serviceHasParent = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0
    }

    if (!serviceList && !!siteSectionSlug) {
      serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSectionSlug, true)
    }

    const promises = [brandItems, articleItems, reccomendationLetterItems, busineesTypeOfferList, serviceList]
    const data = await Promise.all(promises)

    // Прописываем данные в компопонте (в его пропы) - для динамических. Формы и конструкторы уже с данными придут из баазы
    const componentsInfo: DynamicComponentInfo[] = await httpResultPr

    componentsInfo.sort((a, b) => {
      return a.visibleIndex - b.visibleIndex;
    })

    const newsCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === 3
    })
    if (!!newsCompoenentInfo) {
      newsCompoenentInfo.props.articleList = data[1]
      newsCompoenentInfo.props.articleList = !!newsCompoenentInfo.props.articleList ? newsCompoenentInfo.props.articleList.slice(0, 3) : newsCompoenentInfo.props.articleList
      newsCompoenentInfo.props.mode = 'columns'
      if (!adminMode && newsCompoenentInfo.visible === 1) {
        newsCompoenentInfo.visible = 0
        newsCompoenentInfo.visible = !!newsCompoenentInfo.props.articleList && newsCompoenentInfo.props.articleList.length > 0 ? 1 : 0
      }
    }


    const lettersCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === 2
    })
    if (!!lettersCompoenentInfo) {
      lettersCompoenentInfo.props.recommLetterList = data[2]
      lettersCompoenentInfo.props.recommLetterList = !!lettersCompoenentInfo.props.recommLetterList ? lettersCompoenentInfo.props.recommLetterList.slice(0, 3) : lettersCompoenentInfo.props.recommLetterList

      if (!adminMode && lettersCompoenentInfo.visible === 1) {
        lettersCompoenentInfo.visible = 0
        lettersCompoenentInfo.visible = !!lettersCompoenentInfo.props.recommLetterList && lettersCompoenentInfo.props.recommLetterList.length > 0 ? 1 : 0
      }
    }

    const recommendCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === 1
    })
    if (!!recommendCompoenentInfo && recommendCompoenentInfo.visible === 1) {
      recommendCompoenentInfo.props.brandList = data[0]
      recommendCompoenentInfo.props.brandList = !!recommendCompoenentInfo.props.brandList ? recommendCompoenentInfo.props.brandList.slice(0, 12) : recommendCompoenentInfo.props.brandList

      if (!adminMode) {
        recommendCompoenentInfo.visible = 0
        recommendCompoenentInfo.visible = !!recommendCompoenentInfo.props.brandList && recommendCompoenentInfo.props.brandList.length > 0 ? 1 : 0
      }
    }

    const busineesTypeOfferListInfo = componentsInfo.find((iter) => {
      return iter.code === 8
    })
    if (!!busineesTypeOfferListInfo && busineesTypeOfferListInfo.visible === 1) {
      busineesTypeOfferListInfo.props.offerList = data[3]

      if (!adminMode) {
        busineesTypeOfferListInfo.visible = 0
        busineesTypeOfferListInfo.visible = !!busineesTypeOfferListInfo.props.offerList && busineesTypeOfferListInfo.props.offerList.length > 0 ? 1 : 0
      }
    }

    const serviceInfo = componentsInfo.find((iter) => {
      return iter.code === 9
    })
    if (!!serviceInfo && serviceInfo.visible === 1) {
      serviceInfo.props.serviceList = data[4]

      if (!adminMode) {
        serviceInfo.visible = 0
        serviceInfo.visible = !serviceHasParent && !!serviceInfo.props.serviceList && serviceInfo.props.serviceList.length > 1 ? 1 : 0
      }
    }

    const servicePriceInfo = componentsInfo.find((iter) => {
      return iter.code === 10
    })
    if (!!servicePriceInfo && servicePriceInfo.visible === 1) {
      servicePriceInfo.props.servicePriceList = data[4]

      if (!adminMode) {
        servicePriceInfo.visible = 0
        servicePriceInfo.visible = !!servicePriceInfo.props.servicePriceList && servicePriceInfo.props.servicePriceList.length > 0 ? 1 : 0
      }
    }

    return componentsInfo

  }
}
