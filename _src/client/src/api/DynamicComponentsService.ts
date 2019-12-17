import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import { getServiceContainer } from './ServiceContainer';
import DynamicComponentInfo from '@/models/DynamicComponentInfo';
import SitePage, { SitePageType } from '@/models/SitePage';

export default class DynamicComponentsService extends BaseService {

  public async getSiteSectionDynamicComponentsInfo (siteSectionUrl: string, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(siteSectionUrl, null, null), siteSectionUrl, null, adminMode, null, null, null)
  }

  public async getServiceDynamicComponentsInfo (siteSectionUrl: string, serviceUrl: string, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, serviceUrl, null), siteSectionUrl, serviceUrl, adminMode, null, null, null)
  }

  public async getIndOfferDynamicComponentsInfo (siteSectionUrl: string, indOfferUrl: string, offerForClentType: string | null, clActivityId: number | null, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, null, indOfferUrl), siteSectionUrl, null, adminMode, indOfferUrl, offerForClentType, clActivityId)
  }

  public async getSitePageDynamicComponents (sitePageId: number, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    const httpResponse = HttpUtil.httpGet(`admin/panel/cms/blocks/info/pages/${sitePageId}`)
    return this.getDynamicComponentsInfo(httpResponse, null, null, adminMode, null, null, null)
  }

  public async getSitePageDynamicComponentsWithSiteSection (siteSectionUrl: string, sitePageId: number, adminMode: boolean = false): Promise<DynamicComponentInfo[]> {
    const httpResponse = HttpUtil.httpGet(`admin/panel/cms/blocks/info/pages/${sitePageId}`)
    return this.getDynamicComponentsInfo(httpResponse, siteSectionUrl, null, adminMode, null, null, null)
  }

  public async saveSitePageDynamicComponentsInfo (sitePage: number, infos: DynamicComponentInfo[]) {
    return HttpUtil.httpPost(`admin/panel/cms/blocks/info/pages/${sitePage}`, infos)
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
    return HttpUtil.httpDelete(`admin/panel/cms/blocks/ ${blockId} `)
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

  private async getDynamicComponentsInfo (httpResultPr: Promise<DynamicComponentInfo[]>, siteSectionSlug: string | null, serviceSlug: string | null, adminMode: boolean, indOfferUrl: string | null, offerForClentType: string | null, clActivityId: number | null): Promise<DynamicComponentInfo[]> {
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

    // Услуги для услуги (сама услуга или вторго уровня)
    let serviceList: any = null
    let serviceHasParent = false
    if (!!serviceSlug) {
      const businessService = await getServiceContainer().businessServiceService.getBySlug(serviceSlug)
      const childServiceList = await getServiceContainer().businessServiceService.getChildServicesByParentId(businessService.businessServiceId)
      serviceList = !!childServiceList && childServiceList.length && childServiceList.length > 0 ? [...childServiceList] : [businessService]
      serviceHasParent = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0
    }

    // Услуги для инд.предложения
    if (!!indOfferUrl && !!siteSectionSlug) {
      if (!!offerForClentType) {
        serviceList = offerForClentType === 'business'
          ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(siteSectionSlug)
          : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(siteSectionSlug)
      } else {
        serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(siteSectionSlug, clActivityId)
      }
    }

    // Услуги для раздела
    if (!serviceList && !!siteSectionSlug) {
      serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSectionSlug, true)
    }

    // Для рутовых страниц
    if (!serviceList) {
      serviceList = getServiceContainer().businessServiceService.getMainList()
    }

    // Индивидуальные предложения
    let busineesTypeOfferList: any = null
    if (!!siteSectionSlug && !adminMode) {
      busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(siteSectionSlug)
    }

    if (!!indOfferUrl && !offerForClentType && adminMode) {
      busineesTypeOfferList = null
    }

    const promises = [brandItems, articleItems, reccomendationLetterItems, busineesTypeOfferList, serviceList]
    const data = await Promise.all(promises)

    // Прописываем данные в компопонте (в его пропы) - для динамических. Формы и конструкторы уже с данными придут из баазы
    const componentsInfo: DynamicComponentInfo[] = await httpResultPr

    componentsInfo.sort((a, b) => {
      return a.visibleIndex - b.visibleIndex;
    })

    const newsCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.NEWS
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
      return iter.code === BlockType.LETTERS
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
      return iter.code === BlockType.BRANDS
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
      return iter.code === BlockType.BUSINESSTYPE_OFFER
    })
    if (!!busineesTypeOfferListInfo && busineesTypeOfferListInfo.visible === 1) {
      busineesTypeOfferListInfo.props.offerList = data[3]

      if (!adminMode) {
        busineesTypeOfferListInfo.visible = 0
        busineesTypeOfferListInfo.visible = !!busineesTypeOfferListInfo.props.offerList && busineesTypeOfferListInfo.props.offerList.length > 0 ? 1 : 0
      }

      // Для индивидуальных предлождений для бизнеса или частных показываем, для типов клиентов нет
      if (!!indOfferUrl && !offerForClentType) {
        busineesTypeOfferListInfo.visible = 0
      }
    }

    const clientTypeOfferListInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.CLIENTTYPE_OFFER
    })
    if (!!clientTypeOfferListInfo && clientTypeOfferListInfo.visible === 1) {
      // Для типов клиентов нет
      if (!!indOfferUrl && !!offerForClentType) {
        clientTypeOfferListInfo.visible = 0
      }
    }

    const serviceInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.SERVICE_LIST
    })
    if (!!serviceInfo && serviceInfo.visible === 1) {
      serviceInfo.props.serviceList = data[4]

      if (!adminMode) {
        serviceInfo.visible = 0
        serviceInfo.visible = !serviceHasParent && !!serviceInfo.props.serviceList && serviceInfo.props.serviceList.length > 1 ? 1 : 0
      }
    }

    const servicePriceInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.SERVICE_PRICE
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

enum BlockType {
  UFO = 0,
  BRANDS = 1,
  LETTERS = 2,
  NEWS = 3,
  BUY_FORM = 4,
  ASKEXPERT_FORM = 5,
  FREE_CONTENT = 6,
  CLIENTTYPE_OFFER = 7,
  BUSINESSTYPE_OFFER = 8,
  SERVICE_LIST = 9,
  SERVICE_PRICE = 10
}
