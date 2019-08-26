import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import IndividualOffer from '@/models/ekoset/IndividualOffer';

export default class IndividualOfferService extends BaseService {

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

  // Для типа клиента и раздела
  public async  getByClientTypeAndBySiteSectionSlug (siteSectionSlug: string, clientType: string, pagination?: Pagination) {
    return this.getByClientTypeAndBySiteSectionId(this.getIdBySlug(siteSectionSlug), this.getIdBySlug(clientType), pagination)
  }


  public async save (individualOffer: IndividualOffer) {
    const query = 'offers'
    return HttpUtil.httpPut(this.buildHttRequest(query), individualOffer)
  }

  public async delete (id: number) {
    const query = `offers/${id}`
    return HttpUtil.httpDelete(this.buildHttRequest(query))
  }

  private async getById (id: number) {
    const query = `offers/${id}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  private async  getBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getByActivityAndBySiteSectionId (siteSectionId: number, activityTypeId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/${activityTypeId}/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getByClientTypeAndBySiteSectionId (siteSectionId: number, clientType: number, pagination?: Pagination) {
    const query = `${siteSectionId}/clients/${clientType}/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

}
