import SitePage, { SitePageType } from '@/models/SitePage';
import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

export default class TopMenuService extends BaseService {

  public async adminGetSitePages () {
    return HttpUtil.httpGet(this.buildHttRequest('admin/panel/cms/pages'))
  }

  public async getSitePageById (sitePageId: number) {
    return HttpUtil.httpGet(this.buildHttRequest(`admin/panel/cms/pages/${sitePageId}`))
  }

  public async adminSaveSitePage (sitePage: SitePage) {
    return HttpUtil.httpPut(this.buildHttRequest('admin/panel/cms/pages'), sitePage)
  }

  public async adminDeleteSitePage (sitePageId: number) {
    return HttpUtil.httpDelete(this.buildHttRequest(`admin/panel/cms/pages/${sitePageId}`))
  }
}
