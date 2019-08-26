import BaseService from '../BaseService';

export default class MainEkosetService extends BaseService {
  private apiViewName = 'v_api_site_section';
  private apiPartnersViewName = 'v_api_partner';
  private apiBrandsViewName = 'v_api_brand';

  public async getSiteSections () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getSiteSectionById (siteSectionId: number) {
    return this.getOneById(this.apiViewName, 'site_section_id = $1', siteSectionId);
  }

  public async getPartners () {
    return this.getDbViewResult(this.apiPartnersViewName);
  }

  public async getBrands () {
    return this.getDbViewResult(this.apiBrandsViewName);
  }

  public async getForHomePage () {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'cl_brand_main_page_visible = 1');
  }

  public async getBrandsBySiteSection (siteSectionId: number) {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'site_section_id = $1', [siteSectionId]);
  }
}
