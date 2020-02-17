import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { JsonController, Get, Res, QueryParam, Param } from 'routing-controllers';
import { Response } from 'express';

@JsonController()
export default class PriceController extends BaseController {

  @Get('/services/start/price')
  public async getPriceList (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.BusinessServiceService.getPriceList();
    return BaseController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/services/price')
  public async getPriceListForSiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    const result = await ServiceContainer.BusinessServiceService.getPriceListBySiteSection(siteSectionId);
    return BaseController.createSuccessResponse(result, response);
  }

  @Get('/services/:serviceId/price')
  public async getPriceListForService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceContainer.BusinessServiceService.getPriceListForService(serviceId);
    return BaseController.createSuccessResponse(result, response);
  }

  @Get('/services/child/:serviceId/price')
  public async getPriceListForChildService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceContainer.BusinessServiceService.getPriceListForChildService(serviceId);
    return BaseController.createSuccessResponse(result, response);
  }

}
