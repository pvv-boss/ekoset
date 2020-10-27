import SitePage from '@/models/SitePage';
import { BaseService } from './BaseService';

export default class TopMenuService extends BaseService {

  public async adminGetSitePages () {
    const res = this.apiRequest.getJSON('admin/panel/cms/pages');
    return (await res).data?.data
  }

  public async getSitePageById (sitePageId: number) {
    const res = this.apiRequest.getJSON(`admin/panel/cms/pages/${sitePageId}`);
    return (await res).data?.data
  }

  public async adminSaveSitePage (sitePage: SitePage) {
    this.apiRequest.put('admin/panel/cms/pages', {}, sitePage);
  }

  public async adminDeleteSitePage (sitePageId: number) {
    this.apiRequest.delete(`admin/panel/cms/pages/${sitePageId}`);
  }
}
