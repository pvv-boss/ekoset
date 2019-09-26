import BaseService from '../BaseService';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import TypeOrmManager from '@/utils/TypeOrmManager';
import * as slugify from '@sindresorhus/slugify';
import { ClBrand } from '@/entities/ekoset/ClBrand';
import ServiceContainer from '../ServiceContainer';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import IndividualOfferService from './IndividualOfferService';
import { ClActivity } from '@/entities/ekoset/ClActivity';
import { ClClient } from '@/entities/ekoset/ClClient';
import { Partner } from '@/entities/ekoset/Partner';
import { PartnerGroup } from '@/entities/ekoset/PartnerGroup';

export default class MainEkosetService extends BaseService {
  private apiViewName = 'v_api_site_section';
  private apiPartnersViewName = 'v_api_partner';
  private apiBrandsViewName = 'v_api_brand';
  private apiBrandsForSitreSectionViewName = 'v_api_brand_site_section';
  private apiClActivityViewName = 'cl_activity';
  private apiBrandsByBusinessService = 'v_api_business_service_brand';

  public async getSiteSections () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getSiteSectionById (siteSectionId: number) {
    return this.getOneById(this.apiViewName, 'site_section_id = $1', siteSectionId);
  }

  public async getPartners () {
    return this.getDbViewResult(this.apiPartnersViewName);
  }

  public async savePartner (partner: Partner) {
    partner.partnerGroup = Promise.resolve(partner.partnerGroupId);
    return TypeOrmManager.EntityManager.save(partner);
  }

  public async getPartnerGroups () {
    return this.getDbViewResult('partner_group');
  }

  public async savePartnerGroup (partnerGroup: PartnerGroup) {
    return TypeOrmManager.EntityManager.save(partnerGroup);
  }

  // Админка
  public async getAdminAllBands () {
    return this.getDbViewResult(this.apiBrandsViewName);
  }
  public async getAdminForSiteSectionBrands (siteSectionId: number) {
    return this.execFunction('f_admin_brands_sitesection', [siteSectionId]);
  }

  public async getAdminForBusinessServiceBrands (serviceId: number) {
    return this.execFunction('f_admin_brands_service', [serviceId]);
  }

  public async adminGetClActivityList () {
    return this.getDbViewResult(this.apiClActivityViewName);
  }
  //

  public async getBrandsForHomePage () {
    return this.getDbViewResult(this.apiBrandsViewName, null, 'cl_brand_main_page_visible = 1');
  }

  public async getBrandsBySiteSection (siteSectionId: number) {
    return this.getDbViewResult(this.apiBrandsForSitreSectionViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getBrandsByBusinessService (businessServiceId: number) {
    return this.getDbViewResult(this.apiBrandsByBusinessService, null, 'business_service_id = $1', [businessServiceId]);
  }

  public async saveSiteSection (siteSection: SiteSection) {
    siteSection.siteSectionSlug = slugify(siteSection.siteSectionName);
    siteSection = await TypeOrmManager.EntityManager.save(siteSection);

    // Создаем два индивидуальных предложения (для бизнеса и частных лиц)
    const offerForBusiness = await ServiceContainer.IndividualOfferService.getForBusinessBySiteSectionId(siteSection.siteSectionId);
    if (offerForBusiness.length === 0) {
      const businessIndividualOffer: IndividualOffer = new IndividualOffer();
      businessIndividualOffer.clClientId = IndividualOfferService.businessClientTypeId;
      businessIndividualOffer.siteSectionId = siteSection.siteSectionId;
      businessIndividualOffer.indOfferName = 'Для Бизнеса';
      await ServiceContainer.IndividualOfferService.save(businessIndividualOffer);
    }

    const offerForPriviteClient = await ServiceContainer.IndividualOfferService.getForPrivatePersonBySiteSectionId(siteSection.siteSectionId);
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
    // return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }

  public async saveBrand (clBrand: ClBrand) {
    return TypeOrmManager.EntityManager.save(clBrand);
  }

  public async adminSaveClActivity (clActivity: ClActivity) {
    return TypeOrmManager.EntityManager.save(clActivity);
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
    // return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }

}
