import SiteDocument from '@/models/ekoset/SiteDocument'
import { BaseService } from './BaseService'


export default class MediaService extends BaseService {

  public async saveSiteSectionImage (siteSectionId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/sitesection/${siteSectionId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }

  public async saveSiteSectionLogo (siteSectionId: number, formData: FormData) {
    return HttpUtil.httpPostForm(`admin/panel/sitesection/${siteSectionId}/image/logo`, formData)
  }

  public async saveServiceImage (serviceId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/service/${serviceId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }

  public async saveOfferImage (offerId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/offer/${offerId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }

  public async saveBrandImage (brandId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/brands/${brandId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }

  public async saveNewsImage (articleId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/news/${articleId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }

  public async saveRecommendationLetterImage (brandId: number, formData: FormData) {
    return HttpUtil.httpPostForm(`admin/panel/recommendation/${brandId}/image`, formData)
  }

  public async saveSitePageImage (sitePageId: number, formData: FormData) {
    return HttpUtil.httpPostForm(`admin/panel/sitepage/${sitePageId}/image`, formData)
  }

  public async saveSitePageLogo (sitePageId: number, formData: FormData) {
    return HttpUtil.httpPostForm(`admin/panel/sitepage/${sitePageId}/logo`, formData)
  }

  public async saveClActivityMainClientLogo (id: number, formData: FormData) {
    return HttpUtil.httpPostForm(`admin/panel/clActivities/${id}/mainclientlogo`, formData)
  }

  public async getSiteDocuments () {
    const query = 'admin/documents'
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async saveSiteDocument (siteDocument: SiteDocument) {
    return HttpUtil.httpPost('/admin/document', siteDocument)
  }

  public async addSiteDocument (formData: FormData, id: number) {
    return HttpUtil.httpPost(`/admin/document/${id}`, formData)
  }

  public async deleteSiteDocument (id: number) {
    return HttpUtil.httpDelete(`/admin/document/${id}`)
  }

  public async getBannersForMainPage () {
    return HttpUtil.httpGet(this.buildHttRequest('banners/main'))
  }


  public async getBannersForSiteSection (siteSectionId: number) {
    return HttpUtil.httpGet(this.buildHttRequest(`banners/sitesection/${siteSectionId}`))
  }

}
