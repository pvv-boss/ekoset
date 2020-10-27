import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import { Store } from 'vuex'
import ClBrand from '@/models/ekoset/ClBrand'
import { BaseService } from './BaseService'
import { ServiceRegistry } from '@/ServiceRegistry'
import BusinessServiceService from './BusinessServiceService'
import PublicEkosetService from './PublicEkosetService'
import ArticleService from './ArticleService'
import IndividualOfferService from './IndividualOfferService'
import { data } from 'autoprefixer'



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
  SERVICE_PRICE = 10,
  RELATED_SERVICE = 11,
  CLIENTS = 12
}

export default class DynamicComponentsService extends BaseService {

  public async getSiteSectionDynamicComponentsInfo (siteSectionUrl: string, adminMode = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(siteSectionUrl, null, null), siteSectionUrl, null, adminMode, null, null, null)
  }

  public async getServiceDynamicComponentsInfo (siteSectionUrl: string, serviceUrl: string, adminMode = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, serviceUrl, null), siteSectionUrl, serviceUrl, adminMode, null, null, null)
  }

  public async getIndOfferDynamicComponentsInfo (siteSectionUrl: string, indOfferUrl: string, offerForClentType: string | null, clActivityId: number | null, adminMode = false): Promise<DynamicComponentInfo[]> {
    return this.getDynamicComponentsInfo(this.adminGetDynamicComponentsInfo(null, null, indOfferUrl), siteSectionUrl, null, adminMode, indOfferUrl, offerForClentType, clActivityId)
  }

  public async getSitePageDynamicComponents (sitePageId: number, adminMode = false): Promise<DynamicComponentInfo[]> {
    const httpResponse = await this.apiRequest.getJSON(`admin/panel/cms/blocks/info/pages/${sitePageId}`)
    return this.getDynamicComponentsInfo(httpResponse.data?.data, null, null, adminMode, null, null, null)
  }

  public async getSitePageDynamicComponentsWithSiteSection (siteSectionUrl: string, sitePageId: number, adminMode = false): Promise<DynamicComponentInfo[]> {
    const httpResponse = await this.apiRequest.getJSON(`admin/panel/cms/blocks/info/pages/${sitePageId}`)
    return this.getDynamicComponentsInfo(httpResponse.data?.data, siteSectionUrl, null, adminMode, null, null, null)
  }

  public async saveSitePageDynamicComponentsInfo (sitePage: number, infos: DynamicComponentInfo[]) {
    return await this.apiRequest.post(`admin/panel/cms/blocks/info/pages/${sitePage}`, {}, infos)
  }

  public async saveSiteSectionDynamicComponentsInfo (siteSectionId: number, infos: DynamicComponentInfo[]) {
    return this.apiRequest.post(this.createRequestQueryString('slug-' + siteSectionId, null, null), {}, infos)
  }

  public async saveServiceDynamicComponentsInfo (serviceId: number, infos: DynamicComponentInfo[]) {
    return this.apiRequest.post(this.createRequestQueryString(null, 'slug-' + serviceId, null), {}, infos)
  }

  public async adminSaveDynamicComponentsOffer (offerId: number, infos: DynamicComponentInfo[]) {
    return this.apiRequest.post(this.createRequestQueryString(null, null, 'slug-' + offerId), {}, infos)
  }

  public async adminDeleteDynamicComponent (blockId: number) {
    return this.apiRequest.delete(`admin/panel/cms/blocks/ ${blockId} `)
  }

  private async adminGetDynamicComponentsInfo (siteSectionUrl: string | null, serviceUrl: string | null, indOfferUrl: string | null): Promise<DynamicComponentInfo[]> {
    const res = await this.apiRequest.getJSON(this.createRequestQueryString(siteSectionUrl, serviceUrl, indOfferUrl))
    return res.data?.data
  }

  private createRequestQueryString (siteSectionUrl: string | null, serviceUrl: string | null, indOfferUrl: string | null) {
    const queryParamSlug = siteSectionUrl || (serviceUrl || (indOfferUrl || 'slug-0'))
    const id = this.getIdBySlug(queryParamSlug)
    const queryParam = id === 0 ? 'default' : siteSectionUrl ? 'sitesection' : (serviceUrl ? 'service' : (indOfferUrl ? 'offer' : 'default'))
    return `admin/panel/cms/blocks/info/${queryParam}/${id}`
  }

  private async getDynamicComponentsInfo (httpResultPr: Promise<DynamicComponentInfo[]>, siteSectionSlug: string | null, serviceSlug: string | null, adminMode: boolean, indOfferUrl: string | null, offerForClentType: string | null, clActivityId: number | null): Promise<DynamicComponentInfo[]> {
    // Услуга м.б. второго уровня, если так, то данные берем от его предка
    let serviceIdForRelations = 0
    if (serviceSlug) {
      const businessService = await ServiceRegistry.instance.getService(BusinessServiceService).getBySlug(serviceSlug)
      serviceIdForRelations = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0 ? businessService.businessServiceParentId : businessService.businessServiceId
    }

    // Нас рекомендуют (брэнды) (для услуги или раздела или для главной)
    let brandItems: any = null
    if (serviceIdForRelations > 0) {
      brandItems = ServiceRegistry.instance.getService(PublicEkosetService).getBrandsByBusinessServiceSlug('slug-' + serviceIdForRelations)
    }

    if (!brandItems && !!siteSectionSlug) {
      brandItems = ServiceRegistry.instance.getService(PublicEkosetService).getBrandsBySiteSectionSlug(siteSectionSlug)
    }

    if (!brandItems) {
      brandItems = ServiceRegistry.instance.getService(PublicEkosetService).getBrandsForHomePage()
    }

    // Новости (для услуги или для раздела или для главной)
    let articleItems: any = null
    if (serviceIdForRelations > 0) {
      articleItems = ServiceRegistry.instance.getService(ArticleService).getArticleListByBusinessServiceSlug(siteSectionSlug, 'slug-' + serviceIdForRelations)
    }

    if (!articleItems && !!siteSectionSlug) {
      articleItems = ServiceRegistry.instance.getService(ArticleService).getArticleListBySiteSectionSlug(siteSectionSlug)
    }

    if (!articleItems) {
      articleItems = ServiceRegistry.instance.getService(ArticleService).getRootArticleList()
    }


    // Услуги для услуги (сама услуга или вторго уровня)
    let serviceList: any = null
    let priceList: any = null
    let serviceHasParent = false
    let relatedServiceList: any = null
    if (serviceSlug) {
      const businessService = await ServiceRegistry.instance.getService(BusinessServiceService).getBySlug(serviceSlug)
      const childServiceList = await ServiceRegistry.instance.getService(BusinessServiceService).getChildServicesByParentId(businessService.businessServiceId)
      serviceList = !!childServiceList && childServiceList.length && childServiceList.length > 0 ? [...childServiceList] : [businessService]
      serviceHasParent = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0

      priceList = serviceHasParent ? ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForChildService(businessService.businessServiceId) : ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForService(businessService.businessServiceId)

      relatedServiceList = ServiceRegistry.instance.getService(BusinessServiceService).adminGetRelated(businessService.businessServiceId)
    }


    // Услуги для инд.предложения
    if (!!indOfferUrl && !!siteSectionSlug) {
      if (offerForClentType) {
        serviceList = offerForClentType === 'business'
          ? ServiceRegistry.instance.getService(BusinessServiceService).getForBusinessBySiteSectionSlug(siteSectionSlug)
          : ServiceRegistry.instance.getService(BusinessServiceService).getForPrivatePersonBySiteSectionSlug(siteSectionSlug)

        priceList = offerForClentType === 'business'
          ? ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForBusinessBySiteSectionId(siteSectionSlug)
          : ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForPersonBySiteSectionId(siteSectionSlug)
      } else {
        serviceList = ServiceRegistry.instance.getService(BusinessServiceService).getByActivityAndBySiteSectionSlug(siteSectionSlug, clActivityId)
        priceList = ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForActivity(siteSectionSlug, clActivityId)
      }
    }

    // Услуги для раздела
    if (!serviceList && !!siteSectionSlug) {
      serviceList = ServiceRegistry.instance.getService(BusinessServiceService).getBySiteSectionSlug(siteSectionSlug, true)
      priceList = ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForSiteSection(siteSectionSlug)
    }

    // Для рутовых страниц
    if (!serviceList) {
      priceList = ServiceRegistry.instance.getService(BusinessServiceService).priceList()
    }

    // Индивидуальные предложения
    let busineesTypeOfferList: any = null
    if (!!siteSectionSlug && !adminMode) {
      busineesTypeOfferList = ServiceRegistry.instance.getService(IndividualOfferService).getForActivityBySiteSectionIdSlug(siteSectionSlug)
    }

    if (!!indOfferUrl && !offerForClentType && adminMode) {
      busineesTypeOfferList = null
    }

    const promises = [brandItems, articleItems, busineesTypeOfferList, serviceList, relatedServiceList, priceList]
    const data = await Promise.all(promises)

    // Прописываем данные в компопонте (в его пропы) - для динамических. Формы и конструкторы уже с данными придут из баазы
    const componentsInfo: DynamicComponentInfo[] = await httpResultPr

    componentsInfo.sort((a, b) => {
      return a.visibleIndex - b.visibleIndex;
    })

    const newsCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.NEWS
    })
    if (newsCompoenentInfo) {
      newsCompoenentInfo.props.articleList = data[1]
      newsCompoenentInfo.props.articleList = newsCompoenentInfo.props.articleList && newsCompoenentInfo.props.articleList.slice ? newsCompoenentInfo.props.articleList.slice(0, 3) : newsCompoenentInfo.props.articleList
      newsCompoenentInfo.props.mode = 'columns'

      if (!adminMode && newsCompoenentInfo.visible === 1) {
        newsCompoenentInfo.visible = 0
        newsCompoenentInfo.visible = !!newsCompoenentInfo.props.articleList && newsCompoenentInfo.props.articleList.length > 0 ? 1 : 0
      }
    }


    const lettersCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.LETTERS
    })
    if (lettersCompoenentInfo) {
      lettersCompoenentInfo.props.brandsList = data[0]

      if (lettersCompoenentInfo.props.brandsList) {
        const notEmptyLetters = lettersCompoenentInfo.props.brandsList.filter((iterBrand: ClBrand) => {
          return !!iterBrand.clBrandImgBig && iterBrand.clBrandImgBig !== '/img/empty-image.png'
        })
        lettersCompoenentInfo.props.brandsList = notEmptyLetters || []
      }

      if (!adminMode && lettersCompoenentInfo.visible === 1) {
        lettersCompoenentInfo.visible = 0
        lettersCompoenentInfo.visible = !!lettersCompoenentInfo.props.brandsList && lettersCompoenentInfo.props.brandsList.length > 0 ? 1 : 0
      }
    }

    const recommendCompoenentInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.BRANDS
    })
    if (!!recommendCompoenentInfo && recommendCompoenentInfo.visible === 1) {
      recommendCompoenentInfo.props.brandList = data[0]
      // recommendCompoenentInfo.props.brandList = !!recommendCompoenentInfo.props.brandList ? recommendCompoenentInfo.props.brandList.slice(0, 12) : recommendCompoenentInfo.props.brandList
      // recommendCompoenentInfo.props.brandList = recommendCompoenentInfo.props.brandList

      if (!adminMode) {
        recommendCompoenentInfo.visible = 0
        recommendCompoenentInfo.visible = !!recommendCompoenentInfo.props.brandList && recommendCompoenentInfo.props.brandList.length > 0 ? 1 : 0
      }
    }


    const busineesTypeOfferListInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.BUSINESSTYPE_OFFER
    })
    if (!!busineesTypeOfferListInfo && busineesTypeOfferListInfo.visible === 1) {
      busineesTypeOfferListInfo.props.offerList = data[2]

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


    const getServiceListHeader = (serviceInfo) => {
      if (!!indOfferUrl || !!offerForClentType || !serviceList) {
        return 'Список услуг'
      }
      let serviceListHead
      if (serviceSlug) {
        serviceListHead = getModule(AppStore, this.context.store).сurrentServiceName
      } else {
        const siteSectionName = getModule(AppStore, this.context.store).currentSiteSectionName
        serviceListHead = siteSectionName || serviceInfo.head
      }
      return serviceListHead
    }

    const serviceInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.SERVICE_LIST
    })
    if (!!serviceInfo && serviceInfo.visible === 1) {
      serviceInfo.props.serviceList = data[3]

      if (!adminMode) {
        serviceInfo.visible = 0
        if (serviceSlug) {
          serviceInfo.visible = !serviceHasParent && !!serviceInfo.props.serviceList && serviceInfo.props.serviceList.length > 1 ? 1 : 0
          // const serviceName = getModule(AppStore, this.store).сurrentServiceName
          // serviceInfo.head = serviceName ? serviceName : serviceInfo.head
        } else {
          serviceInfo.visible = !!serviceInfo.props.serviceList && serviceInfo.props.serviceList.length > 0 ? 1 : 0
          // const siteSectionName = getModule(AppStore, this.store).currentSiteSectionName
          // serviceInfo.head = siteSectionName ? siteSectionName : serviceInfo.head
        }

        serviceInfo.head = getServiceListHeader(serviceInfo)
      }
    }


    const servicePriceInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.SERVICE_PRICE
    })
    if (!!servicePriceInfo && servicePriceInfo.visible === 1) {
      servicePriceInfo.name = 'ServicePrice'
      servicePriceInfo.props.servicePriceList = data[5]

      if (!!serviceSlug && !serviceHasParent) {
        servicePriceInfo.props.isForRootService = true
      }

      if (!!serviceSlug && serviceHasParent) {
        servicePriceInfo.props.isForChildService = true
      }

      if (!adminMode) {
        servicePriceInfo.visible = 0
        servicePriceInfo.visible = !!servicePriceInfo.props.servicePriceList && servicePriceInfo.props.servicePriceList.length > 0 ? 1 : 0
      }
    }


    const clientsInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.CLIENTS
    })
    if (!!clientsInfo && clientsInfo.visible === 1) {
      clientsInfo.props.clientList = await ServiceRegistry.instance.getService(PublicEkosetService).getClients()
      if (!adminMode) {
        clientsInfo.visible = 0
        clientsInfo.visible = !!clientsInfo.props.clientList && clientsInfo.props.clientList.length > 0 ? 1 : 0
      }
    }

    const relatedServiceInfo = componentsInfo.find((iter) => {
      return iter.code === BlockType.RELATED_SERVICE
    })
    if (!!relatedServiceInfo && relatedServiceInfo.visible === 1) {
      relatedServiceInfo.props.serviceList = data[4]
      if (!adminMode) {
        relatedServiceInfo.visible = 0
        relatedServiceInfo.visible = !!relatedServiceInfo.props.serviceList && relatedServiceInfo.props.serviceList.length > 0 ? 1 : 0
      }
    }

    return componentsInfo

  }
}

