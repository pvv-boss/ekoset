import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

export default class SeoMetaService extends BaseService {

  public async getForHomePage () {
    const query = `seometa`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getBySiteSection (siteSectionId: number) {
    const query = `/seometa/sitesections/${siteSectionId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getByIndividualOffer (offerId: number) {
    const query = `/seometa/offers/${offerId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getByArticle (articleId: number) {
    const query = `/seometa/articles/${articleId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }

  public async getByBusinessService (serviceId: number) {
    const query = `/seometa/services/${serviceId}`
    return HttpUtil.httpGet(this.buildHttRequest(query))
  }
}
