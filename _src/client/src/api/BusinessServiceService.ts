import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import BusinessService from '@/models/ekoset/BusinessService';

export default class BusinessServiceService extends BaseService {

  public async getBySlug (slug: string) {
    return this.getById(this.getIdBySlug(slug))
  }

  // Для главной страницы
  public async  getMainList (pagination?: Pagination) {
    const query = 'services'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для раздела
  public async  getBySiteSectionSlug (siteSectionSlug: string, pagination?: Pagination) {
    return this.getBySiteSection(this.getIdBySlug(siteSectionSlug), pagination)
  }

  // Для вида деятельности и раздела
  public async  getByActivityAndBySiteSectionSlug (siteSectionSlug: string, activityTypeSlug: string, pagination?: Pagination) {
    return this.getByActivityAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), this.getIdBySlug(activityTypeSlug), pagination)
  }

  // Услуги для бизнеса по разделу
  public async  getForBusinessBySiteSectionSlug (siteSectionSlug: string) {
    return this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  // Услуги для частных лиц по разделу
  public async  getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string) {
    return this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  // Для футера Услуги для Бизнеса на Главной странице
  public async  getForBusinessByMainPage () {
    return []
  }

  // Для футера Услуги для Частных лиц на Главной странице
  public async  getForPrivatePersonByMainPage () {
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

  // Для типа клиента и раздела
  private async  getByClientTypeAndBySiteSectionSlug (siteSectionSlug: string, clientType: string, pagination?: Pagination) {
    return this.getByClientTypeAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), this.getIdBySlug(clientType), pagination)
  }

  private async getById (id: number) {
    const query = `services/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }


  private async  getBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/services`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getByActivityAndBySiteSectionId (siteSectionId: number, activityTypeId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/activity/${activityTypeId}/services`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getByClientTypeAndBySiteSectionId (siteSectionId: number, clientType: number, pagination?: Pagination) {
    const query = `${siteSectionId}/clients/${clientType}/services`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для футера Услуги для Бизнеса
  private async  getForBusinessBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/services/business`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  // Для футера Услуги для Частных лиц
  private async  getForPrivatePersonBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/services/person`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }
}
