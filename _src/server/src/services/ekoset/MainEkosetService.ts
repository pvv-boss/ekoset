import BaseService from '../BaseService';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import TypeOrmManager from '@/utils/TypeOrmManager';
import * as slugify from '@sindresorhus/slugify';
import { ClBrand } from '@/entities/ekoset/ClBrand';
import ServiceContainer from '../ServiceContainer';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import IndividualOfferService from './IndividualOfferService';
import { ClActivityType } from '@/entities/ekoset/ClActivityType';
import { ReccomendationLetter } from '@/entities/ekoset/ReccomendationLetter';

export default class MainEkosetService extends BaseService {
  private apiViewName = 'v_api_site_section';
  private apiBrandsViewName = 'v_api_brand';
  private apiBrandsForSitreSectionViewName = 'v_api_brand_site_section';
  private apiClActivityViewName = 'cl_activity';
  private apiBrandsByBusinessService = 'v_api_business_service_brand';
  private apiRecommendationLettersViewName = 'v_api_recommendation_letter';

  public async getSiteSections () {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_status=1');
  }

  public async adminGetSiteSections () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getSiteSectionNameById (siteSectionId: number) {
    return this.getOneOrNone('SELECT site_section_name FROM site_section WHERE site_section_id = $1', [siteSectionId]);
  }

  public async getSiteSectionById (siteSectionId: number) {
    return this.getOneById(this.apiViewName, 'site_section_id = $1', siteSectionId);
  }

  // Админка
  public async getAdminAllBands () {
    return this.getDbViewResult(this.apiBrandsViewName);
  }

  public async adminGetBrandById (brandId: number) {
    return this.getOneById(this.apiBrandsViewName, 'cl_brand_id=$1', brandId)
  }

  public async getAdminForSiteSectionBrands (siteSectionId: number) {
    return this.execFunction('f_admin_brands_sitesection', [siteSectionId]);
  }

  public async getAdminForBusinessServiceBrands (serviceId: number) {
    return this.execFunction('f_admin_brands_service', [serviceId]);
  }

  public async adminGetClActivityList () {
    return this.getDbViewResult(this.apiClActivityViewName + ' ORDER BY cl_activity_name');
  }
  //

  public async getBrandsForHomePage () {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'cl_brand_main_page_visible = 1 and cl_brand_status=1');
  }

  public async getBrandsBySiteSection (siteSectionId: number) {
    return this.getDbViewResult(this.apiBrandsForSitreSectionViewName, null, 'site_section_id = $1 and cl_brand_status=1', [siteSectionId]);
  }

  public async getBrandsByBusinessService (businessServiceId: number) {
    return this.getDbViewResult(this.apiBrandsByBusinessService, null, 'business_service_id = $1 and cl_brand_status=1', [businessServiceId]);
  }

  public async saveSiteSection (siteSection: SiteSection) {
    siteSection.siteSectionSlug = !!siteSection.siteSectionSlug ? siteSection.siteSectionSlug : slugify(siteSection.siteSectionName.toLowerCase());
    siteSection = await TypeOrmManager.EntityManager.save(siteSection);

    // Создаем два индивидуальных предложения (для бизнеса и частных лиц)
    const offerForBusiness = await ServiceContainer.IndividualOfferService.getForBusinessBySiteSectionIdWithoutCheckStatus(siteSection.siteSectionId);
    if (offerForBusiness.length === 0) {
      const businessIndividualOffer: IndividualOffer = new IndividualOffer();
      businessIndividualOffer.clClientId = IndividualOfferService.businessClientTypeId;
      businessIndividualOffer.siteSectionId = siteSection.siteSectionId;
      businessIndividualOffer.indOfferName = 'Для Бизнеса';
      await ServiceContainer.IndividualOfferService.save(businessIndividualOffer);
    }

    const offerForPriviteClient = await ServiceContainer.IndividualOfferService.getForPrivatePersonBySiteSectionIdWithoutCheckStatus(siteSection.siteSectionId);
    if (offerForPriviteClient.length === 0) {
      const privatePersonIndividualOffer: IndividualOffer = new IndividualOffer();
      privatePersonIndividualOffer.clClientId = IndividualOfferService.PrivatePersonClientTypeId;
      privatePersonIndividualOffer.siteSectionId = siteSection.siteSectionId;
      privatePersonIndividualOffer.indOfferName = 'Для частных лиц';
      await ServiceContainer.IndividualOfferService.save(privatePersonIndividualOffer);
    }

    return siteSection;
  }

  public async deleteBrand (id: number) {
    return this.deleteById('cl_brand', 'cl_brand_id = $1', id);
  }

  public async saveBrand (clBrand: ClBrand) {
    return TypeOrmManager.EntityManager.save(clBrand);
  }

  public async adminSaveClActivity (clActivity: ClActivityType) {
    return TypeOrmManager.EntityManager.save(clActivity);
  }

  public async deleteClActivity (id: number) {
    return this.deleteById(this.apiClActivityViewName, 'cl_activity_id = $1', id);
  }

  public async addBrand2SiteSection (brandId: number, siteSectionId: number) {
    return this.execFunction('f_admin_add_brand2sitesection', [brandId, siteSectionId]);
  }

  public async addBrand2Service (brandId: number, serviceId: number) {
    return this.execFunction('f_admin_add_brand2service', [brandId, serviceId]);
  }

  public async removeBrandFromSiteSection (brandId: number, serviceId: number) {
    return this.execFunction('f_admin_remove_brand_from_sitesection', [brandId, serviceId]);
  }

  public async removeBrandFromService (brandId: number, serviceId: number) {
    return this.execFunction('f_admin_remove_brand_from_service', [brandId, serviceId]);
  }


  public async deleteSiteSection (id: number) {
    return this.deleteById('site_section', 'site_section_id = $1', id);
  }

  // Рекомендации
  public async getRecommendationLettersByBrand (brandId: number) {
    return this.getDbViewResult(this.apiRecommendationLettersViewName, null, 'cl_brand_id = $1', [brandId]);
  }

  public async getRecommendationLettersForHomePage () {
    return this.getDbViewResult(this.apiRecommendationLettersViewName, null, 'cl_brand_main_page_visible = 1');
  }

  public async getRecommendationLettersBySiteSection (siteSectionId: number) {
    return this.getDbViewResult('v_api_recommendation_letter_site_section', null, 'site_section_id = $1', [siteSectionId]);

  }

  public async getRecommendationLettersByBusinessService (businessServiceId: number) {
    return this.getDbViewResult('v_api_recommendation_letter_business_service', null, 'business_service_id = $1', [businessServiceId]);
  }

  public async getClientsInfo () {
    return this.getDbViewResult('v_api_clients');
  }

  public async getClientsInfoByActivity (id: number) {
    return this.getDbViewResult('v_api_all_clients', null, 'cl_activity_id=$1', [id]);
  }

  public async deleteRecommendationLetter (id: number) {
    return this.execNone(`UPDATE cl_brand SET cl_brand_img_big = NULL WHERE cl_brand_id = ${id}`);
    // return this.deleteById('recommendation', 'recomm_id = $1', id);
    // return this.deleteById('recommendation', 'recomm_id = $1', id);
  }

  public async saveRecommendation (reccomendationLetter: ReccomendationLetter) {
    return TypeOrmManager.EntityManager.save(reccomendationLetter);
  }


}
