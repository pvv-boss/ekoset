import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import slugify from '@sindresorhus/slugify';
import { BaseService, postgresWrapper, TypeOrmManager } from 'rsn-express-core';

export default class IndividualOfferService extends BaseService {
  public static businessClientTypeId = 1;
  public static PrivatePersonClientTypeId = 3;
  private apiViewName = 'v_api_individual_offer';
  private apiAdminViewName = 'v_api_admin_individual_offer'

  public async getAll () {
    return postgresWrapper.anyWhere(this.apiViewName);
  }

  public async getAllBySiteSectionId (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getForActivityBySiteSectionId (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_activity_id IS NOT NULL and ind_offer_status=1', [siteSectionId]);
  }

  public async getForBusinessBySiteSectionId (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, IndividualOfferService.businessClientTypeId]);
    //   return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2 and ind_offer_status=1', [siteSectionId, IndividualOfferService.businessClientTypeId]);
  }

  public async getForBusinessBySiteSectionIdWithoutCheckStatus (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, IndividualOfferService.businessClientTypeId]);
  }

  public async getForPrivatePersonBySiteSectionId (siteSectionId: number) {
    // return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2 and ind_offer_status=1', [siteSectionId, IndividualOfferService.PrivatePersonClientTypeId]);
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, IndividualOfferService.PrivatePersonClientTypeId]);
  }

  public async getForPrivatePersonBySiteSectionIdWithoutCheckStatus (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id =$2', [siteSectionId, IndividualOfferService.PrivatePersonClientTypeId]);
  }


  public async getForClientBySiteSectionId (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id IS NOT NULL', [siteSectionId]);
    //  return postgresWrapper.anyWhere(this.apiViewName, null, 'site_section_id = $1 and cl_client_id IS NOT NULL and ind_offer_status=1', [siteSectionId]);
  }

  public async getById (id: number) {
    return postgresWrapper.oneOrNoneWhere(this.apiViewName, 'ind_offer_id = $1', [id]);
  }

  public async adminGetAll () {
    return postgresWrapper.anyWhere(this.apiAdminViewName);
  }


  public async adminGetAllBySiteSectionId (siteSectionId: number) {
    return postgresWrapper.anyWhere(this.apiAdminViewName, null, 'site_section_id = $1 and cl_activity_id IS NOT NULL ', [siteSectionId]);
  }

  public async save (individualOffer: IndividualOffer) {
    individualOffer.indOfferSlug = !!individualOffer.indOfferSlug ? individualOffer.indOfferSlug : slugify(individualOffer.indOfferName.toLowerCase());
    return TypeOrmManager.EntityManager.save(individualOffer);
  }

  public async delete (id: number) {
    return postgresWrapper.delete('individual_offer', 'ind_offer_id = $1', [id]);
  }
}
