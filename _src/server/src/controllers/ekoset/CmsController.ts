import { BaseController } from '../BaseController';
import { JsonController, Get, Res, Put, Param, Delete, Post, Body } from 'routing-controllers';
import ServiceContainer from '@/services/ServiceContainer';
import { Request, Response } from 'express';
import DynamicComponentInfo from '@/entities/DynamicComponentInfo';

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

  @Get('/admin/panel/footer/relation/:clientType(private|business)')
  public async adminGetFooterServicesRelation (
    @Param('clientType') clientType: string,
    @Res() response: Response
  ) {
    const result = await ServiceContainer.BusinessServiceService.adminGetFooterServicesRelation(clientType === 'business');
    return CmsController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/sitesection/:sitesectionId')
  public async adminGetDynamicComponentsInfoSiteSection (
    @Param('sitesectionId') sitesectionId: number,
    @Res() response: Response
  ) {
    const result = await ServiceContainer.CMSService.adminGetDynamicComponentsInfoSiteSection(sitesectionId);
    return CmsController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/service/:serviceId')
  public async adminGetDynamicComponentsInfoService (
    @Param('serviceId') serviceId: number,
    @Res() response: Response
  ) {
    const result = await ServiceContainer.CMSService.adminGetDynamicComponentsInfoService(serviceId);
    return CmsController.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/cms/blocks/info/offer/:offerId')
  public async adminGetDynamicComponentsInfoOffer (
    @Param('offerId') offerId: number,
    @Res() response: Response
  ) {
    const result = await ServiceContainer.CMSService.adminGetDynamicComponentsInfoOffer(offerId);
    return CmsController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/default/0')
  public async adminGetDynamicComponentsInfoDefault (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.CMSService.adminGetDynamicComponentsInfoDefault();
    return CmsController.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/sitesection/:sitesectionId')
  public async adminSaveDynamicComponentsSiteSection (
    @Res() response: Response,
    @Param('sitesectionId') sitesectionId: number,
    @Body() infos: DynamicComponentInfo[], ) {

    const result = await ServiceContainer.CMSService.adminSaveDynamicComponentsSiteSection(sitesectionId, infos);
    return CmsController.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/service/:serviceId')
  public async adminSaveDynamicComponentsService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number,
    @Body() infos: DynamicComponentInfo[], ) {

    const result = await ServiceContainer.CMSService.adminSaveDynamicComponentsService(serviceId, infos);
    return CmsController.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/offer/:offerId')
  public async adminSaveDynamicComponentsOffer (
    @Res() response: Response,
    @Param('offerId') offerId: number,
    @Body() infos: DynamicComponentInfo[], ) {

    const result = await ServiceContainer.CMSService.adminSaveDynamicComponentsOffer(offerId, infos);
    return CmsController.createSuccessResponse(result, response);
  }

}
