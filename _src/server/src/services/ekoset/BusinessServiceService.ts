import BaseService from '../BaseService';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { BusinessService } from '@/entities/ekoset/BusinessService';

export default class BusinessServiceService extends BaseService {
  private apiViewName = 'v_api_business_service';
  private apiClientServiceViewName = 'v_api_client_business_service';
  private apiActivityServiceViewName = 'v_api_activity_business_service';
  private apiChildServiceViewName = 'v_api_second_level_business_service';

  public async getAll () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getAllBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 and business_service_parent_id IS NULL;', [siteSectionId]);
  }

  // По виду объекта
  public async getByActivityAndBySiteSectionId (siteSectionId: number, activityId: number) {
    return this.getDbViewResult(this.apiActivityServiceViewName, null, 'site_section_id = $1 and cl_activity_id = $2', [siteSectionId, activityId]);
  }

  public async getForBusinessBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiActivityServiceViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  public async getByClientTypeAndBySiteSectionId (siteSectionId: number, clientTypeId: number) {
    return this.getDbViewResult(this.apiClientServiceViewName, null, 'site_section_id = $1 and cl_client_id = $2', [siteSectionId, clientTypeId]);
  }

  public async getForClientBySiteSectionId (siteSectionId: number) {
    return this.getDbViewResult(this.apiClientServiceViewName, null, 'site_section_id = $1', [siteSectionId]);
  }

  // Получить услуги второго уровня
  public async getChildServicesByParentId (parentId: number) {
    return this.getDbViewResult(this.apiChildServiceViewName, null, 'business_service_parent_id = $1', [parentId]);
  }

  public async getById (id: number) {
    return this.getOneById(this.apiViewName, 'business_service_id = $1', id);
  }

  public async save (businessService: BusinessService) {
    return TypeOrmManager.EntityManager.save(businessService);
  }

  public async delete (id: number) {
    return this.deleteById(this.apiViewName, 'business_service_id = $1', id);
  }
}
