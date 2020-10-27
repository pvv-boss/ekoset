import SiteDocument from '@/models/ekoset/SiteDocument'
import { BaseService } from './BaseService'


export default class MediaService extends BaseService {

  public async saveSiteSectionImage (siteSectionId: number, formData: FormData, isBigImage: boolean) {
    return this.apiRequest.postForm(`admin/panel/sitesection/${siteSectionId}/image/${isBigImage ? 'big' : 'small'}`, {}, formData)
  }

  public async saveSiteSectionLogo (siteSectionId: number, formData: FormData) {
    return this.apiRequest.postForm(`admin/panel/sitesection/${siteSectionId}/image/logo`, {}, formData)
  }

  public async saveServiceImage (serviceId: number, formData: FormData, isBigImage: boolean) {
    return this.apiRequest.postForm(`admin/panel/service/${serviceId}/image/${isBigImage ? 'big' : 'small'}`, {}, formData)
  }

  public async saveOfferImage (offerId: number, formData: FormData, isBigImage: boolean) {
    return this.apiRequest.postForm(`admin/panel/offer/${offerId}/image/${isBigImage ? 'big' : 'small'}`, {}, formData)
  }

  public async saveBrandImage (brandId: number, formData: FormData, isBigImage: boolean) {
    return this.apiRequest.postForm(`admin/panel/brands/${brandId}/image/${isBigImage ? 'big' : 'small'}`, {}, formData)
  }

  public async saveNewsImage (articleId: number, formData: FormData, isBigImage: boolean) {
    return this.apiRequest.postForm(`admin/panel/news/${articleId}/image/${isBigImage ? 'big' : 'small'}`, {}, formData)
  }

  public async saveRecommendationLetterImage (brandId: number, formData: FormData) {
    return this.apiRequest.postForm(`admin/panel/recommendation/${brandId}/image`, {}, formData)
  }

  public async saveSitePageImage (sitePageId: number, formData: FormData) {
    return this.apiRequest.postForm(`admin/panel/sitepage/${sitePageId}/image`, {}, formData)
  }

  public async saveSitePageLogo (sitePageId: number, formData: FormData) {
    return this.apiRequest.postForm(`admin/panel/sitepage/${sitePageId}/logo`, {}, formData)
  }

  public async saveClActivityMainClientLogo (id: number, formData: FormData) {
    return this.apiRequest.postForm(`admin/panel/clActivities/${id}/mainclientlogo`, {}, formData)
  }

  public async getSiteDocuments () {
    const query = 'admin/documents'
    const res = this.apiRequest.getJSON(query)
    return (await res).data?.data
  }

  public async saveSiteDocument (siteDocument: SiteDocument) {
    return this.apiRequest.post('/admin/document', {}, siteDocument)
  }

  public async addSiteDocument (formData: FormData, id: number) {
    return this.apiRequest.post(`/admin/document/${id}`, {}, formData)
  }

  public async deleteSiteDocument (id: number) {
    return this.apiRequest.delete(`/admin/document/${id}`)
  }

  public async getBannersForMainPage () {
    const res = this.apiRequest.getJSON('banners/main')
    return (await res).data?.data
  }


  public async getBannersForSiteSection (siteSectionId: number) {
    const res = this.apiRequest.getJSON(`banners/sitesection/${siteSectionId}`)
    return (await res).data?.data
  }

}
