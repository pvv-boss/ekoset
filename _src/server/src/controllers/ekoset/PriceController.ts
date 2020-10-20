import { JsonController, Get, Res, QueryParam, Param } from 'routing-controllers';
import { Response } from 'express';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import BusinessServiceService from '@/services/ekoset/BusinessServiceService';

@JsonController()
export default class PriceController extends BaseController {

  @Get('/services/start/price')
  public async getPriceList (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceList();
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/services/price')
  public async getPriceListForSiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListBySiteSection(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/service/:serviceId/price')
  public async getPriceListForService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForService(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/child/:serviceId/price')
  public async getPriceListForChildService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForChildService(serviceId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/services/price/activity/:siteSectionId/:activityId')
  public async getPriceListForActivity (
    @Res() response: Response,
    @Param('siteSectionId') siteSectionId: number,
    @Param('activityId') activityId: number,
  ) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForActivity(siteSectionId, activityId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/service/price/business/:siteSectionId')
  public async getPriceListForBusinessBySiteSectionId (
    @Res() response: Response,
    @Param('siteSectionId') siteSectionId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForBusinessBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/service/price/person/:siteSectionId')
  public async getPriceListForPersonBySiteSectionId (
    @Res() response: Response,
    @Param('siteSectionId') siteSectionId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).getPriceListForPersonBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }


}
