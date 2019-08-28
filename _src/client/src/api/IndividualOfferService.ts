import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'
import Pagination from '@/models/Pagination'
import IndividualOffer from '@/models/ekoset/IndividualOffer';

export default class IndividualOfferService extends BaseService {

  public async getBySlug (slug: string) {
    return this.getById(this.getIdBySlug(slug))
  }

  // Для видов деятельности и раздела
  public async  getForActivityBySiteSectionIdSlug (siteSectionSlug: string) {
    return this.getForActivityBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  // Для Частных лиц и раздела
  public async  getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string) {
    return this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  // Для Бизнеса и раздела
  public async  getForBusinessBySiteSectionSlug (siteSectionSlug: string) {
    return this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug))
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

  // Для раздела
  private async  getBySiteSectionSlug (siteSectionSlug: string, pagination?: Pagination) {
    return this.getBySiteSection(this.getIdBySlug(siteSectionSlug), pagination)
  }

  // Для типов клиента и раздела
  private async  getForClientBySiteSectionSlug (siteSectionSlug: string) {
    return this.getForClientBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  private async  getForPrivatePersonBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/offers/person`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  private async  getForBusinessBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/offers/business`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  private async  getBySiteSection (siteSectionId: number, pagination?: Pagination) {
    const query = `${siteSectionId}/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query, pagination))
    return result
  }

  private async  getForActivityBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/activity/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

  private async  getForClientBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/clients/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }

}
