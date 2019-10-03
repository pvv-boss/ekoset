import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import BusinessService from '@/models/ekoset/BusinessService';

export default class BusinessServiceService extends BaseService {

  public async getBySlug (slug: string) {
    return this.getById(this.getIdBySlug(slug))
  }

  // Все услуги
  public async  getAll (pagination?: Pagination) {
    const query = 'services'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для главной страницы
  public async  getMainList (pagination?: Pagination) {
    const query = 'services/start/main'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для раздела
  public async  getBySiteSectionSlug (siteSectionSlug: string, excludeChild = true, pagination?: Pagination) {
    return this.getBySiteSection(this.getIdBySlug(siteSectionSlug), excludeChild, pagination)
  }

  // Для вида деятельности и раздела
  public async  getByActivityAndBySiteSectionSlug (siteSectionSlug: string, activityTypeId: number | null, excludeChild = true, pagination?: Pagination) {
    activityTypeId = !!activityTypeId ? activityTypeId : 0
    return this.getByActivityAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), activityTypeId, excludeChild, pagination)
  }

  // Услуги для бизнеса по разделу
  public async  getForBusinessBySiteSectionSlug (siteSectionSlug: string, excludeChild = true) {
    return this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug), excludeChild)
  }

  // Услуги для частных лиц по разделу
  public async  getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string, excludeChild = true) {
    return this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug), excludeChild)
  }

  // Для футера Услуги для Бизнеса на Главной странице
  public async  getForBusinessByMainPage (excludeChild = true) {
    return []
  }

  // Для футера Услуги для Частных лиц на Главной странице
  public async  getForPrivatePersonByMainPage (excludeChild = true) {
    return []
  }

  // Услуги второго уровня
  public async getChildServicesByParentId (serviceId: number, pagination?: Pagination) {
    const query = `services/${serviceId}/children`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  public async save (businessService: BusinessService) {
    const query = 'services'
    return HttpUtil.httpPut(this.buildHttRequest(query), businessService)
  }

  public async delete (id: number) {
    const query = `services/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  // Привязка к типу клиента или направлению деятельности
  public async getAdminСlActivitiesForService (serviceUrl: string) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/service/${id}/clActivities`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getAdminclClientsForService (serviceUrl: string) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/service/${id}/clclient`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async addRemovePrivatePerson2Service (serviceUrl: string, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/clienttype/person`
    if (isAdd) {
      return HttpUtil.httpPut(this.buildHttRequest(query))
    } else {
      return HttpUtil.httpDelete(this.buildHttRequest(query))
    }
  }

  public async addRemoveBusinessType2Service (serviceUrl: string, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/clienttype/business`
    if (isAdd) {
      return HttpUtil.httpPut(this.buildHttRequest(query))
    } else {
      HttpUtil.httpDelete(this.buildHttRequest(query))
    }
  }

  public async addRemoveActivityType2Service (serviceUrl: string, activityTypeId: number, isAdd: boolean) {
    const id = this.getIdBySlug(serviceUrl)
    const query = `admin/panel/services/${id}/activitytype/${activityTypeId}`
    if (isAdd) {
      return HttpUtil.httpPut(this.buildHttRequest(query))
    } else {
      return HttpUtil.httpDelete(this.buildHttRequest(query))
    }
  }
  // ---

  // Для футера
  public async getServicesForFooter (clientType: string) {
    return HttpUtil.httpGet(this.buildHttRequest(`admin/panel/footer/${clientType}`))
  }

  public async addRemoveService2Footer (businessServiceId: number, clientType: string, isAdd: boolean) {
    const query = `admin/panel/footer/${clientType}/${businessServiceId}`
    if (isAdd) {
      return HttpUtil.httpPut(this.buildHttRequest(query))
    } else {
      return HttpUtil.httpDelete(this.buildHttRequest(query))
    }
  }
  // ---

  private async getById (id: number) {
    const query = `services/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }


  private async  getBySiteSection (siteSectionId: number, excludeChild = true, pagination?: Pagination) {
    const query = `${siteSectionId}/services?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getByActivityAndBySiteSectionId (siteSectionId: number, activityTypeId: number, excludeChild = true, pagination?: Pagination) {
    const query = `${siteSectionId}/activity/${activityTypeId}/services?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getForBusinessBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/business?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  private async  getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/person?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }
}
