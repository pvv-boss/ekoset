import { BusinessService } from '@/entities/ekoset/BusinessService';
import slugify from '@sindresorhus/slugify';
import { BaseService, postgresWrapper, TypeOrmManager } from 'rsn-express-core';

export default class BusinessServiceService extends BaseService {
  private businessClientTypeId = 1;
  private PrivatePersonClientTypeId = 3;

  private apiViewName = 'v_api_business_service';
  private apiAdminViewName = 'v_api_admin_business_service'
  private apiClientServiceViewName = 'v_api_client_business_service';
  private apiActivityServiceViewName = 'v_api_activity_business_service';
  private apiChildServiceViewName = 'v_api_second_level_business_service';


  public async getAll () {
    return postgresWrapper.anyWhere(this.apiAdminViewName);
  }

  public async getMainList () {
    // return postgresWrapper.anyWhere(this.apiViewName, null, 'business_service_parent_id IS NULL and business_service_status=1');
    return postgresWrapper.anyWhere('v_api_root_service_list');
  }

  public async getAllBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'business_service_status=1 and site_section_id = $1 and business_service_parent_id IS NULL' : 'business_service_status=1 and site_section_id = $1'
    return postgresWrapper.anyWhere(this.apiViewName, null, selectStmt, [siteSectionId]);
  }

  // По виду объекта
  public async getByActivityAndBySiteSectionId (siteSectionId: number, activityId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'business_service_status=1 and site_section_id = $1 and cl_activity_id = $2 and business_service_parent_id IS NULL' : 'business_service_status=1 and site_section_id = $1 and cl_activity_id = $2'
    return postgresWrapper.anyWhere(this.apiActivityServiceViewName, null, selectStmt, [siteSectionId, activityId]);
  }

  // Услуги для Бизнеса
  public async getForBusinessBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'business_service_status=1 and site_section_id = $1 and cl_client_id = $2 and business_service_parent_id IS NULL' : 'business_service_status=1 and site_section_id = $1 and cl_client_id = $2'
    return postgresWrapper.anyWhere(this.apiClientServiceViewName, null, selectStmt, [siteSectionId, this.businessClientTypeId]);
  }

  // Услуги для частных лиц
  public async getForPrivatePersonBySiteSectionId (siteSectionId: number, excludeChild: boolean) {
    const selectStmt = excludeChild ? 'business_service_status=1 and site_section_id = $1 and cl_client_id = $2 and business_service_parent_id IS NULL' : 'business_service_status=1 and site_section_id = $1 and cl_client_id = $2'
    return postgresWrapper.anyWhere(this.apiClientServiceViewName, null, selectStmt, [siteSectionId, this.PrivatePersonClientTypeId]);
  }

  // Получить услуги второго уровня
  public async getChildServicesByParentId (parentId: number) {
    return postgresWrapper.anyWhere(this.apiChildServiceViewName, null, 'business_service_status=1 and business_service_parent_id = $1', [parentId]);
  }

  // Получить услуги второго уровня
  public async adminGetChildServicesByParentId (parentId: number) {
    return postgresWrapper.anyWhere(this.apiChildServiceViewName, null, 'business_service_parent_id = $1', [parentId]);
  }

  public async getById (id: number) {
    return postgresWrapper.oneOrNoneWhere(this.apiViewName, 'business_service_id = $1', [id]);
  }

  public async save (businessService: BusinessService) {
    businessService.businessServiceSlug = !!businessService.businessServiceSlug ? businessService.businessServiceSlug : slugify(businessService.businessServiceName.toLowerCase())
    if (!businessService.businessServiceId && businessService.businessServiceParentId > 0) {
      const newChildService = await TypeOrmManager.EntityManager.save(businessService);
      return postgresWrapper.execFunction('f_clone_activity_type', [newChildService.businessServiceId, businessService.businessServiceParentId])
    } else {
      return TypeOrmManager.EntityManager.save(businessService);
    }
  }

  public async delete (id: number) {
    return postgresWrapper.delete('business_service', 'business_service_id = $1', [id]);
  }

  // Получить Вы также можете заказать (без учета статуса)
  public async adminGetRelated (id: number) {
    return postgresWrapper.anyWhere('v_related_service', null, 'business_service_id_for_rel = $1', [id]);
  }

  // Добавить, удалить услугу в Вы также можете заказать
  public async adminAddRemoveRelated (serviceId: number, relatedServiceId: number, priority: number, isAdd: boolean) {
    return isAdd ? postgresWrapper.execFunction('f_admin_add_related_service', [serviceId, relatedServiceId, priority]) : postgresWrapper.execFunction('f_admin_remove_related_service', [serviceId, relatedServiceId]);
  }

  // Вы также можете закзаать для связки
  public async adminGetServiceRelation (businessServiceId: number) {
    // return this.execFunction('f_admin_related_service', [businessServiceId]);
    return postgresWrapper.execFunction('f_admin_related_service_new', [businessServiceId]);
  }

  // Не учитывая статус
  public async adminGetAllBySiteSectionId (siteSectionId: number) {
    const selectStmt = 'site_section_id = $1 and business_service_parent_id IS NULL';
    return postgresWrapper.anyWhere(this.apiViewName, null, selectStmt, [siteSectionId]);
  }

  public async getPriceList () {
    const selectStmt = 'site_section_id = $1 and business_service_parent_id IS NULL';
    return postgresWrapper.anyWhere('v_api_price_list');
  }

  public async getPriceListBySiteSection (siteSectionId: number) {
    const selectStmt = 'site_section_id = $1';
    return postgresWrapper.anyWhere('v_api_price_list_by_root', null, selectStmt, [siteSectionId]);
  }

  public async getPriceListForService (serviceId: number) {
    const selectStmt = 'id = $1';
    return postgresWrapper.anyWhere('v_api_price_list_by_root', null, selectStmt, [serviceId]);
  }

  public async getPriceListForChildService (serviceId: number) {
    const selectStmt = 'id = $1';
    return postgresWrapper.anyWhere('v_api_price_for_child_service', null, selectStmt, [serviceId]);
  }

  public async getPriceListForActivity (siteSectionId: number, activityId: number) {
    const selectStmt = 'site_section_id = $1 and cl_activity_id = $2'
    return postgresWrapper.anyWhere('v_api_price_list_for_activity', null, selectStmt, [siteSectionId, activityId]);
  }

  public async getPriceListForBusinessBySiteSectionId (siteSectionId: number) {
    const selectStmt = 'site_section_id = $1 and cl_client_id = $2'
    return postgresWrapper.anyWhere('v_api_price_for_client', null, selectStmt, [siteSectionId, this.businessClientTypeId]);
  }

  public async getPriceListForPersonBySiteSectionId (siteSectionId: number) {
    const selectStmt = 'site_section_id = $1 and cl_client_id = $2'
    return postgresWrapper.anyWhere('v_api_price_for_client', null, selectStmt, [siteSectionId, this.PrivatePersonClientTypeId]);
  }

  // Тип клиента и тип направления деятельности для услуги
  public async getAdminСlActivitiesForService (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_cl_activities_service', [businessServiceId]);
  }

  public async getAdminclClientsForService (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_cl_client_service', [businessServiceId]);
  }

  public async setPrivatePerson2Service (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_add_clienttype2service', [3, businessServiceId]);
  }

  public async setBusinessType2Service (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_add_clienttype2service', [1, businessServiceId]);
  }

  public async setActivityType2Service (businessServiceId: number, activityTypeId: number) {
    return postgresWrapper.execFunction('f_admin_add_activitytype2service', [businessServiceId, activityTypeId]);
  }

  public async removePrivatePersonFromService (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_remove_clienttype_from_service', [3, businessServiceId]);
  }

  public async removeBusinessTypeFromService (businessServiceId: number) {
    return postgresWrapper.execFunction('f_admin_remove_clienttype_from_service', [1, businessServiceId]);
  }

  public async removeActivityTypeFromService (businessServiceId: number, activityTypeId: number) {
    return postgresWrapper.execFunction('f_admin_remove_activitytypefromservice', [businessServiceId, activityTypeId]);
  }


  public async adminGetFooterServicesRelation (isBusinessClientType: boolean) {
    return postgresWrapper.anyWhere(isBusinessClientType ? 'v_api_footer_service_business' : 'v_api_footer_service_private');
  }


  // public async adminGetFooterServicesForPrivateClient () {
  //   return postgresWrapper.anyWhere('v_api_footer_service_private');
  // }

  // public async adminGetFooterServicesForBusinessClient () {
  //   return postgresWrapper.anyWhere('v_api_footer_service_private');
  // }

  public async getFooterServicesForPrivateClient () {
    const selectStmt = 'cl_client_id = $1 and footer_include_ind=1 and business_service_status=1 order by business_service_name';
    return postgresWrapper.anyWhere(this.apiClientServiceViewName, null, selectStmt, [this.PrivatePersonClientTypeId]);
  }

  public async getFooterServicesForBusinessClient () {
    const selectStmt = 'cl_client_id = $1 and footer_include_ind=1 and business_service_status=1 order by business_service_name';
    return postgresWrapper.anyWhere(this.apiClientServiceViewName, null, selectStmt, [this.businessClientTypeId]);
  }


  public async adminAddFooterServicesForPrivateClient (businessServiceId: number) {
    const updateStmt = `UPDATE business_service_cl_client SET footer_include_ind = 1 where business_service_id = $1 and cl_client_id = $2`;
    return postgresWrapper.execNone(updateStmt, [businessServiceId, this.PrivatePersonClientTypeId]);
  }

  public async adminAddFooterServicesForBusinessClient (businessServiceId: number) {
    const updateStmt = `UPDATE business_service_cl_client SET footer_include_ind = 1 where business_service_id = $1 and cl_client_id = $2`;
    return postgresWrapper.execNone(updateStmt, [businessServiceId, this.businessClientTypeId]);
  }

  public async adminRemoveFooterForPrivateClient (businessServiceId: number) {
    const updateStmt = `UPDATE business_service_cl_client SET footer_include_ind = 0 where business_service_id = $1 and cl_client_id = $2`;
    return postgresWrapper.execNone(updateStmt, [businessServiceId, this.PrivatePersonClientTypeId]);
  }

  public async adminRemoveFooterForBusinessClient (businessServiceId: number) {
    const updateStmt = `UPDATE business_service_cl_client SET footer_include_ind = 0 where business_service_id = $1 and cl_client_id = $2`;
    return postgresWrapper.execNone(updateStmt, [businessServiceId, this.businessClientTypeId]);
  }


}
