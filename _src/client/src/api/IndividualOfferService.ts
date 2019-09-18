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
    const offers = await this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug))
    return !!offers && offers.length > 0 ? offers[0] : new IndividualOffer()
  }

  // Для Бизнеса и раздела
  public async  getForBusinessBySiteSectionSlug (siteSectionSlug: string) {
    const offers = await this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug))
    return !!offers && offers.length > 0 ? offers[0] : new IndividualOffer()
  }

  public async adminGetAll () {
    return HttpUtil.httpGet(this.buildHttRequest('admin/offers'))
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

  private async  getForActivityBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/activity/offers`
    const result = HttpUtil.httpGet(this.buildHttRequest(query))
    return result
  }
}
