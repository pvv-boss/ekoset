import { BaseController } from '../BaseController';
import { JsonController, Get, Res, Put, Param, Delete } from 'routing-controllers';
import ServiceContainer from '@/services/ServiceContainer';
import { Request, Response } from 'express';

@JsonController()
export default class CmsController extends BaseController {

  @Get('/admin/panel/footer/private')
  public async adminGetFooterServicesForPrivateClient (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.BusinessServiceService.adminGetFooterServicesForPrivateClient();
    return CmsController.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/footer/private/:serviceId')
  public async adminAddFooterServicesForPrivateClient (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceContainer.BusinessServiceService.adminAddFooterServicesForPrivateClient(serviceId);
    return CmsController.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/footer/private/:serviceId')
  public async adminRemoveFooterForPrivateClient (
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {

    const result = ServiceContainer.BusinessServiceService.adminRemoveFooterForPrivateClient(serviceId);
    return CmsController.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/footer/business')
  public async adminGetFooterServicesForBusinessClient (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.BusinessServiceService.adminGetFooterServicesForBusinessClient();
    return CmsController.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/footer/business/:serviceId')
  public async adminAddFooterServicesForBusinessClient (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceContainer.BusinessServiceService.adminAddFooterServicesForBusinessClient(serviceId);
    return CmsController.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/footer/business/:serviceId')
  public async adminRemoveFooterForBusinessClient (
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {

    const result = ServiceContainer.BusinessServiceService.adminRemoveFooterForBusinessClient(serviceId);
    return CmsController.createSuccessResponse(result, response);
  }
}
