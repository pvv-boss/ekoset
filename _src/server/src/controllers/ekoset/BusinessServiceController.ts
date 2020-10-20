
import { JsonController, Get, Res, Param, Body, Put, Delete, QueryParam } from 'routing-controllers';
import { Response } from 'express';
import { BusinessService } from '@/entities/ekoset/BusinessService';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import BusinessServiceService from '@/services/ekoset/BusinessServiceService';

@JsonController()
export default class BusinessServiceController extends BaseController {

  @Get('/services')
  public async getAll (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getAll();
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/start/main')
  public async getMainList (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getMainList();
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/services')
  public async getAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @QueryParam('root') excludeChild: boolean) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getAllBySiteSectionId(siteSectionId, excludeChild);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/:sitesection/services')
  public async adminGetAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetAllBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/activity/:activityType/services')
  public async getByActivityAndBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @Param('activityType') activityTypeId: number,
    @QueryParam('root') excludeChild: boolean) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getByActivityAndBySiteSectionId(siteSectionId, activityTypeId, excludeChild);
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/services/person')
  public async getForPrivatePersonBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @QueryParam('root') excludeChild: boolean) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getForPrivatePersonBySiteSectionId(siteSectionId, excludeChild);
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/services/business')
  public async getForBusinessBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @QueryParam('root') excludeChild: boolean) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getForBusinessBySiteSectionId(siteSectionId, excludeChild);
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/footer/private')
  public async getFooterServicesForPrivateClient (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getFooterServicesForPrivateClient();
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/footer/business')
  public async getFooterServicesForBusinessClient (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getFooterServicesForBusinessClient();
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/:service/children')
  public async getChildServicesByParentId (
    @Res() response: Response,
    @Param('service') parentServiceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getChildServicesByParentId(parentServiceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/services/:service/children')
  public async adminGetChildServicesByParentId (
    @Res() response: Response,
    @Param('service') parentServiceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetChildServicesByParentId(parentServiceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/:service')
  public async getById (
    @Res() response: Response,
    @Param('service') serviceId: number,
  ) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getById(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/services')
  public async save (
    @Body() businessService: BusinessService,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).save(businessService);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/services/:id(\\d+)')
  public async delete (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).delete(id);
    return this.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/service/:serviceId/clActivities')
  public async getAdminСlActivitiesForService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminСlActivitiesForService(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/service/:serviceId/clclient')
  public async getAdminclClientsForService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminclClientsForService(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/services/:id/clienttype/person')
  public async setPrivatePerson2Service (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).setPrivatePerson2Service(id);
    return this.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/services/:id/clienttype/business')
  public async setBusinessType2Service (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).setBusinessType2Service(id);
    return this.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/services/:id/activitytype/:typeid')
  public async setActivityType2Service (
    @Param('id') id: number,
    @Param('typeid') typeid: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).setActivityType2Service(id, typeid);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/services/:id/clienttype/person')
  public async removePrivatePersonFromService (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).removePrivatePersonFromService(id);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/services/:id/clienttype/business')
  public async removeBusinessTypeFromService (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).removeBusinessTypeFromService(id);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/services/:id/activitytype/:typeid')
  public async removeActivityTypeFromService (
    @Param('id') id: number,
    @Param('typeid') typeid: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).removeActivityTypeFromService(id, typeid);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/services/:serviceId/relation')
  public async adminGetServiceRelation (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetServiceRelation(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/services/:serviceId/related')
  public async adminGetRelated (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetRelated(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/services/:serviceId/related/:relatedServiceId/:priority')
  public async adminAddRelated (
    @Param('serviceId') serviceId: number,
    @Param('relatedServiceId') relatedServiceId: number,
    @Param('priority') priority: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminAddRemoveRelated(serviceId, relatedServiceId, priority, true);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/services/:serviceId/related/:relatedServiceId/:priority')
  public async adminRemoveRelated (
    @Param('serviceId') serviceId: number,
    @Param('relatedServiceId') relatedServiceId: number,
    @Res() response: Response,
    @Param('priority') priority: number) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminAddRemoveRelated(serviceId, relatedServiceId, priority, false);
    return this.createSuccessResponse(result, response);
  }

}
