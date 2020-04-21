import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

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


}
