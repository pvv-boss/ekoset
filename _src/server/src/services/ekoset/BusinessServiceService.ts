import BaseService from '../BaseService';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { BusinessService } from '@/entities/ekoset/BusinessService';
import * as slugify from '@sindresorhus/slugify';

export default class BusinessServiceService extends BaseService {
  private businessClientTypeId = 1;
  private PrivatePersonClientTypeId = 3;

  private apiViewName = 'v_api_business_service';
  private apiClientServiceViewName = 'v_api_client_business_service';
  private apiActivityServiceViewName = 'v_api_activity_business_service';
  private apiChildServiceViewName = 'v_api_second_level_business_service';


  public async getAll () {
    return this.getDbViewResult(this.apiViewName);
  }

  public async getAllBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'site_section_id = $1 and business_service_parent_id IS NULL' : 'site_section_id = $1'
    return this.getDbViewResult(this.apiViewName, null, selectStmt, [siteSectionId]);
  }

  // По виду объекта
  public async getByActivityAndBySiteSectionId (siteSectionId: number, activityId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'site_section_id = $1 and cl_activity_id = $2 and business_service_parent_id IS NULL' : 'site_section_id = $1 and cl_activity_id = $2'
    return this.getDbViewResult(this.apiActivityServiceViewName, null, selectStmt, [siteSectionId, activityId]);
  }

  // Услуги для Бизнеса
  public async getForBusinessBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'site_section_id = $1 and cl_client_id = $2 and business_service_parent_id IS NULL' : 'site_section_id = $1 and cl_client_id = $2'
    return this.getDbViewResult(this.apiClientServiceViewName, null, selectStmt, [siteSectionId, this.businessClientTypeId]);
  }

  // Услуги для частных лиц
  public async getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'site_section_id = $1 and cl_client_id = $2 and business_service_parent_id IS NULL' : 'site_section_id = $1 and cl_client_id = $2'
    return this.getDbViewResult(this.apiClientServiceViewName, null, selectStmt, [siteSectionId, this.PrivatePersonClientTypeId]);
  }

  // Получить услуги второго уровня
  public async getChildServicesByParentId (parentId: number) {
    return this.getDbViewResult(this.apiChildServiceViewName, null, 'business_service_parent_id = $1', [parentId]);
  }

  public async getById (id: number) {
    return this.getOneById(this.apiViewName, 'business_service_id = $1', id);
  }

  public async save (businessService: BusinessService) {
    businessService.businessServiceSlug = slugify(businessService.businessServiceName)
    return TypeOrmManager.EntityManager.save(businessService);
  }

  public async delete (id: number) {
    return this.deleteById(this.apiViewName, 'business_service_id = $1', id);
  }


  // Тип клиента для услуги
  public async setPrivatePerson2Service (businessServiceId: number) {
    return this.execFunction('f_admin_add_clienttype2service', [3, businessServiceId]);
  }

  public async setBusinessType2Service (businessServiceId: number) {
    return this.execFunction('f_admin_add_clienttype2service', [1, businessServiceId]);
  }

  public async setActivityType2Service (businessServiceId: number, activityTypeId: number) {
    return this.execFunction('f_admin_add_activitytype2service', [businessServiceId, activityTypeId]);
  }

  public async removePrivatePersonFromService (businessServiceId: number) {
    return this.execFunction('f_admin_remove_clienttype_from_service', [3, businessServiceId]);
  }

  public async removeBusinessTypeFromService (businessServiceId: number) {
    return this.execFunction('f_admin_remove_clienttype_from_service', [1, businessServiceId]);
  }

  public async removeActivityTypeFromService (businessServiceId: number, activityTypeId: number) {
    return this.execFunction('f_admin_remove_activitytypefromservice', [businessServiceId, activityTypeId]);
  }
}
