import BaseService from '../BaseService';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';

export default class IndividualOfferService extends BaseService {
  private apiViewName = 'v_api_individual_offer';

  public async getAll () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getAllBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getByActivityAndBySiteSectionId (siteSectionId: number, activityId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_activity_id = $2', [siteSectionId, activityId]);
  }

  public async getByClientTypeAndBySiteSectionId (siteSectionId: number, clientTypeId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and cl_client_id = $2', [siteSectionId, clientTypeId]);
  }

  public async getById (id: number) {
    return this.getOneById(this.apiViewName, 'ind_offer_id = $1', id);
  }

  public async save (individualOffer: IndividualOffer) {
    return TypeOrmManager.EntityManager.save(individualOffer);
  }

  public async delete (id: number) {
    return this.deleteById(this.apiViewName, 'ind_offer_id = $1', id);
  }
}
