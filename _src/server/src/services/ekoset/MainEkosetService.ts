import BaseService from '../BaseService';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import TypeOrmManager from '@/utils/TypeOrmManager';
import * as slugify from '@sindresorhus/slugify';
import { ClBrand } from '@/entities/ekoset/ClBrand';

export default class MainEkosetService extends BaseService {
  private apiViewName = 'v_api_site_section';
  private apiPartnersViewName = 'v_api_partner';
  private apiBrandsViewName = 'v_api_brand';
  private apiBrandsByBusinessService = 'v_api_business_service_brand'

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

  public async getBrandsForHomePage () {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'cl_brand_main_page_visible = 1');
  }

  public async getBrandsBySiteSection (siteSectionId: number) {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getBrandsByBusinessService (businessServiceId: number) {
    return this.getDbViewResult(this.apiBrandsByBusinessService, null, 'business_service_id = $1', [businessServiceId]);
  }

  public async saveSiteSection (siteSection: SiteSection) {
    siteSection.siteSectionSlug = slugify(siteSection.siteSectionName);
    return TypeOrmManager.EntityManager.save(siteSection);
  }

  public async deleteBrand (id: number) {
    // return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }

  public async saveBrand (clBrand: ClBrand) {
    return TypeOrmManager.EntityManager.save(clBrand);
  }

  public async deleteSiteSection (id: number) {
    // return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }
}
