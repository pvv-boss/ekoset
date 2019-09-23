import BaseService from '../BaseService';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import * as slugify from '@sindresorhus/slugify';

export default class IndividualOfferService extends BaseService {
  private apiViewName = 'v_api_individual_offer';
  private businessClientTypeId = 1;
  private PrivatePersonClientTypeId = 3;

  public async getAll () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getAllBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getForActivityBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_activity_id IS NOT NULL', [siteSectionId]);
  }

  public async getForBusinessBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, this.businessClientTypeId]);
  }

  public async getForPrivatePersonBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, this.PrivatePersonClientTypeId]);
  }


  public async getForClientBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_client_id IS NOT NULL', [siteSectionId]);
  }

  public async getById (id: number) {
    return this.getOneById(this.apiViewName, 'ind_offer_id = $1', id);
  }

  public async adminGetAll () {
    return this.getDbViewResult('v_api_admin_individual_offer');
  }

  public async save (individualOffer: IndividualOffer) {
    individualOffer.indOfferSlug = slugify(individualOffer.indOfferName);
    return TypeOrmManager.EntityManager.save(individualOffer);
  }

  public async delete (id: number) {
    return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }
}
