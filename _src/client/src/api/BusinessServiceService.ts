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
    const query = 'services'
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  // Для раздела
  public async  getBySiteSectionSlug (siteSectionSlug: string, excludeChild = true, pagination?: Pagination) {
    return this.getBySiteSection(this.getIdBySlug(siteSectionSlug), excludeChild, pagination)
  }

  // Для вида деятельности и раздела
  public async  getByActivityAndBySiteSectionSlug (siteSectionSlug: string, activityTypeSlug: string, excludeChild = true, pagination?: Pagination) {
    return this.getByActivityAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), this.getIdBySlug(activityTypeSlug), excludeChild, pagination)
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

  // Для футера Услуги для Бизнеса
  private async  getForBusinessBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/business?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  // Для футера Услуги для Частных лиц
  private async  getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild = true) {
    const query = `${siteSectionId}/services/person?root=${excludeChild}`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }
}
