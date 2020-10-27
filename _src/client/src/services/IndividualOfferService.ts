import IndividualOffer from '@/models/ekoset/IndividualOffer';
import { ServiceRegistry } from '@/ServiceRegistry';
import { BaseService } from './BaseService';
import MediaService from './MediaService';

export default class IndividualOfferService extends BaseService {

  public async getBySlug (slug: string) {
    return this.getById(this.getIdBySlug(slug))
  }

  // Для видов деятельности и раздела
  public async getForActivityBySiteSectionIdSlug (siteSectionSlug: string) {
    return this.getForActivityBySiteSectionId(this.getIdBySlug(siteSectionSlug))
  }

  public async adminGetAllBySiteSectionId (siteSectionId: number) {
    const res = this.apiRequest.getJSON(`admin/panel/${siteSectionId}/offers`)
    return (await res).data?.data
  }

  // Для Частных лиц и раздела
  public async getForPrivatePersonBySiteSectionSlug (siteSectionSlug: string) {
    const offers = await this.getForPrivatePersonBySiteSectionId(this.getIdBySlug(siteSectionSlug))
    return !!offers && offers.length > 0 ? offers[0] : new IndividualOffer()
  }

  // Для Бизнеса и раздела
  public async getForBusinessBySiteSectionSlug (siteSectionSlug: string) {
    const offers = await this.getForBusinessBySiteSectionId(this.getIdBySlug(siteSectionSlug))
    return !!offers && offers.length > 0 ? offers[0] : new IndividualOffer()
  }

  public async adminGetAll () {
    return this.apiRequest.getJSON('admin/panel/offers')
  }

  public async saveAll (list: IndividualOffer[]) {
    list.forEach((iter) => {
      this.save(iter)
    })
  }

  public async save (individualOffer: IndividualOffer) {
    const query = 'offers'
    const resultPr = this.apiRequest.put(query, {}, individualOffer)

    if (individualOffer.smallImageFormData) {
      ServiceRegistry.instance.getService(MediaService).saveOfferImage(individualOffer.indOfferId, individualOffer.smallImageFormData, false)
    }
    if (individualOffer.bigImageFormData) {
      ServiceRegistry.instance.getService(MediaService).saveOfferImage(individualOffer.indOfferId, individualOffer.bigImageFormData, true)
    }

    return resultPr
  }

  public async delete (id: number) {
    const query = `offers/${id}`
    return this.apiRequest.delete(query)
  }

  private async getById (id: number) {
    const query = `offers/${id}`
    const res = this.apiRequest.getJSON(query)
    return (await res).data?.data
  }

  private async getForPrivatePersonBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/offers/person`
    const result = await this.apiRequest.getJSON(query)
    return result.data?.data
  }

  private async getForBusinessBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/offers/business`
    const result = await this.apiRequest.getJSON(query)
    return result.data?.data
  }

  private async getForActivityBySiteSectionId (siteSectionId: number) {
    const query = `${siteSectionId}/activity/offers`
    const result = await this.apiRequest.getJSON(query)
    return result.data?.data
  }
}
