import { Pagination } from '@/models/core/Pagination'
import BusinessService from '@/models/ekoset/BusinessService';
import { ServiceRegistry } from '@/ServiceRegistry';
import { BaseService } from './BaseService'
import MediaService from './MediaService';

export default class BusinessServiceService extends BaseService {

  public async getBySlug (slug: string) {
    return this.getById(this.getIdBySlug(slug))
  }
  // Для главной страницы
  public async getMainList (pagination?: Pagination) {
    const query = 'services/start/main'
    const result = await this.apiRequest.getJSON(query, {}, pagination)
    return result.data?.data
  }

  // Для раздела
  public async getBySiteSectionSlug (siteSectionSlug: string, excludeChild = true, pagination?: Pagination) {
    return this.getBySiteSection(this.getIdBySlug(siteSectionSlug), excludeChild, pagination)
  }

  // Для админки без учета статуса
  public async adminGetBySiteSectionId (siteSectionId: number) {
    const query = `admin/panel/${siteSectionId}/services`
    const result = this.apiRequest.getJSON(query)
    return (await result).data?.data
  }

  // Для вида деятельности и раздела
  public async getByActivityAndBySiteSectionSlug (siteSectionSlug: string, activityTypeId: number | null, excludeChild = false, pagination?: Pagination) {
    // public async  getByActivityAndBySiteSectionSlug (siteSectionSlug: string, activityTypeId: number | null, excludeChild = true, pagination?: Pagination) {
    activityTypeId = activityTypeId || 0
    return this.getByActivityAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), activityTypeId, excludeChild, pagination)
  }

  // Услуги для бизнеса по разделу
  public async getForBusinessBySiteSectionSlug (siteSectionSlug: string, excludeChild = false) {
    //    public async  getForBusinessBySiteSectionSlug (siteSectionSlug: string, excludeChild = true) {
    return this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug), excludeChild)
  }

  // Услуги для частных лиц по разделу
  // public async  getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string, excludeChild = true) {
  public async getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string, excludeChild = false) {
    return this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug), excludeChild)
  }

  // Услуги второго уровня
  public async getChildServicesByParentId (serviceId: number, pagination?: Pagination) {
    const query = `services/${serviceId}/children`
    const result = this.apiRequest.getJSON(query, {}, pagination)
    return (await result).data?.data
  }

  // Вы также можете заказать - список для связки
  public async adminGetServiceRelation (serviceId: number) {
    const query = `admin/panel/services/${serviceId}/relation`
    const result = this.apiRequest.getJSON(query)
    return (await result).data?.data
  }

  // Вы также можете заказать
  public async adminGetRelated (serviceId: number) {
    const query = `admin/panel/services/${serviceId}/related`
    const result = this.apiRequest.getJSON(query)
    return (await result).data?.data
  }

  public async adminAddRemoveRelated (serviceId: number, relatedServiceId: number, priority: number, isAdd: boolean) {
    const query = `admin/panel/services/${serviceId}/related/${relatedServiceId}/${priority}`
    const result = isAdd ? this.apiRequest.put(query) : this.apiRequest.delete(query)
    return result
  }


  // Услуги второго уровня (админка)
  public async adminGetChildServicesByParentId (serviceId: number, pagination?: Pagination) {
    const query = `admin/panel/services/${serviceId}/children`
    const result = this.apiRequest.getJSON(query, {}, pagination)
    return (await result).data?.data
  }

  public async priceList () {
    const query = 'services/start/price'
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getPriceListForSiteSection (siteSectionSlug: string) {
    const id = this.getIdBySlug(siteSectionSlug)
    const query = `${id}/services/price`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getPriceListForService (serviceId: number) {
    const query = `services/service/${serviceId}/price`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getPriceListForChildService (serviceId: number) {
    const query = `services/child/${serviceId}/price`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getPriceListForActivity (siteSectionSlug: string, clActivityId: number | null) {
    const query = `services/price/activity/${this.getIdBySlug(siteSectionSlug)}/${clActivityId}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }


  public async getPriceListForBusinessBySiteSectionId (siteSectionSlug: string) {
    const query = `service/price/business/${this.getIdBySlug(siteSectionSlug)}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getPriceListForPersonBySiteSectionId (siteSectionSlug: string) {
    const query = `service/price/person/${this.getIdBySlug(siteSectionSlug)}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async saveAll (businessServiceList: BusinessService[]) {
    businessServiceList.forEach((iterService) => {
      this.save(iterService)
    });
  }

  public async save (businessService: BusinessService) {
    const query = 'services'
    const resultPr = this.apiRequest.put(query, {}, businessService)

    if (businessService.smallImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveServiceImage(businessService.businessServiceId, businessService.smallImageFormData, false)
    }
    if (businessService.bigImageFormData) {
      this.context.$serviceRegistry.getService(MediaService).saveServiceImage(businessService.businessServiceId, businessService.bigImageFormData, true)
    }

    return resultPr
  }

  public async delete (id: number) {
    const query = `services/${id}`
    return this.apiRequest.delete(query)
  }

  // Привязка к типу клиента или направлению деятельности
  public async getAdminСlActivitiesForService (serviceUrl: string) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/service/${id}/clActivities`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async getAdminclClientsForService (serviceUrl: string) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/service/${id}/clclient`
    return (await this.apiRequest.getJSON(query)).data?.data
  }

  public async addRemovePrivatePerson2Service (serviceUrl: string, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/clienttype/person`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  public async addRemoveBusinessType2Service (serviceUrl: string, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/clienttype/business`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      this.apiRequest.delete(query)
    }
  }

  public async addRemoveActivityType2Service (serviceUrl: string, activityTypeId: number, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/activitytype/${activityTypeId}`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }
  // ---

  // Для футера
  public async getServicesForFooter (clientType: string) {
    return (await this.apiRequest.getJSON(`services/footer/${clientType}`)).data?.data
  }

  // Для футера админка
  public async adminGetServicesForFooter (clientType: string) {
    return (await this.apiRequest.getJSON(`admin/panel/footer/${clientType}`)).data?.data
  }

  public async addRemoveService2Footer (businessServiceId: number, clientType: string, isAdd: boolean) {
    const query = `admin/panel/footer/${clientType}/${businessServiceId}`
    if (isAdd) {
      return this.apiRequest.put(query)
    } else {
      return this.apiRequest.delete(query)
    }
  }

  public async adminGetFooterServicesRelation (isBusinessType: boolean) {
    return (await this.apiRequest.getJSON(`admin/panel/footer/relation/${isBusinessType ? 'business' : 'private'}`)).data?.data
  }
  // ---

  private async getById (id: number) {
    const query = `services/${id}`
    return (await this.apiRequest.getJSON(query)).data?.data
  }


  private async getBySiteSection (siteSectionId: number, excludeChild = true, pagination?: Pagination) {
    const query = `${siteSectionId}/services?root=${excludeChild}`
    const result = (await this.apiRequest.getJSON(query, {}, pagination)).data?.data
    return result
  }

  private async getByActivityAndBySiteSectionId (siteSectionId: number, activityTypeId: number, excludeChild = true, pagination?: Pagination) {
    const query = `${siteSectionId}/activity/${activityTypeId}/services?root=${excludeChild}`
    const result = this.apiRequest.getJSON(query, {}, pagination)
    return (await result).data?.data
  }

  private async getForBusinessBySiteSectionId (siteSectionId: number, excludeChild = false) {
    //   private async  getForBusinessBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/business?root=${excludeChild}`
    const result = this.apiRequest.getJSON(query)
    return (await result).data?.data
  }

  private async getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild = false) {
    // private async  getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/person?root=${excludeChild}`
    const result = this.apiRequest.getJSON(query)
    return (await result).data?.data
  }
}
