import { JsonController, Get, Res, Put, Param, Delete, Post, Body } from 'routing-controllers';
import { Request, Response } from 'express';
import DynamicComponentInfo from '@/entities/DynamicComponentInfo';
import SitePage from '@/entities/ekoset/SitePage';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import BusinessServiceService from '@/services/ekoset/BusinessServiceService';
import CMSService from '@/services/CMSService';

@JsonController()
export default class CmsController extends BaseController {


  @Put('/admin/panel/footer/private/:serviceId')
  public async adminAddFooterServicesForPrivateClient (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminAddFooterServicesForPrivateClient(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/footer/private/:serviceId')
  public async adminRemoveFooterForPrivateClient (
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {

    const result = ServiceRegistry.instance.getService(BusinessServiceService).adminRemoveFooterForPrivateClient(serviceId);
    return this.createSuccessResponse(result, response);
  }


  @Put('/admin/panel/footer/business/:serviceId')
  public async adminAddFooterServicesForBusinessClient (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminAddFooterServicesForBusinessClient(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/footer/business/:serviceId')
  public async adminRemoveFooterForBusinessClient (
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {

    const result = ServiceRegistry.instance.getService(BusinessServiceService).adminRemoveFooterForBusinessClient(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/footer/relation/:clientType(private|business)')
  public async adminGetFooterServicesRelation (
    @Param('clientType') clientType: string,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetFooterServicesRelation(clientType === 'business');
    return this.createSuccessResponse(result, response);
  }


  @Delete('/admin/panel/cms/blocks/:id')
  public async adminDeleteDynamicComponent (
    @Param('id') serviceId: number,
    @Res() response: Response) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminDeleteDynamicComponent(serviceId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/cms/blocks/info/sitesection/:sitesectionId')
  public async adminGetDynamicComponentsInfoSiteSection (
    @Param('sitesectionId') sitesectionId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetDynamicComponentsInfoSiteSection(sitesectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/service/:serviceId')
  public async adminGetDynamicComponentsInfoService (
    @Param('serviceId') serviceId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetDynamicComponentsInfoService(serviceId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/cms/blocks/info/offer/:offerId')
  public async adminGetDynamicComponentsInfoOffer (
    @Param('offerId') offerId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetDynamicComponentsInfoOffer(offerId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/default/0')
  public async adminGetDynamicComponentsInfoDefault (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetDynamicComponentsInfoDefault();
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/blocks/info/pages/:sitePageId')
  public async adminGetDynamicComponentsInfoSitePage (
    @Param('sitePageId') sitePageId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetDynamicComponentsInfoSitePage(sitePageId);
    return this.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/pages/:sitePageId')
  public async adminSaveDynamicComponentsSitePage (
    @Res() response: Response,
    @Param('sitePageId') sitePageId: number,
    @Body() infos: DynamicComponentInfo[],) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminSaveDynamicComponentsSitePage(sitePageId, infos);
    return this.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/sitesection/:sitesectionId')
  public async adminSaveDynamicComponentsSiteSection (
    @Res() response: Response,
    @Param('sitesectionId') sitesectionId: number,
    @Body() infos: DynamicComponentInfo[],) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminSaveDynamicComponentsSiteSection(sitesectionId, infos);
    return this.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/service/:serviceId')
  public async adminSaveDynamicComponentsService (
    @Res() response: Response,
    @Param('serviceId') serviceId: number,
    @Body() infos: DynamicComponentInfo[],) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminSaveDynamicComponentsService(serviceId, infos);
    return this.createSuccessResponse(result, response);
  }

  @Post('/admin/panel/cms/blocks/info/offer/:offerId')
  public async adminSaveDynamicComponentsOffer (
    @Res() response: Response,
    @Param('offerId') offerId: number,
    @Body() infos: DynamicComponentInfo[],) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminSaveDynamicComponentsOffer(offerId, infos);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/pages')
  public async adminGetSitePages (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetSitePages();
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/cms/pages/:id')
  public async adminGetSitePageById (
    @Res() response: Response,
    @Param('id') id: number,
  ) {
    const result = await ServiceRegistry.instance.getService(CMSService).adminGetSitePageById(id);
    return this.createSuccessResponse(result, response);
  }

  @Put('/admin/panel/cms/pages')
  public async saveSitePage (
    @Body() sitePage: SitePage,
    @Res() response: Response) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminSaveSitePage(sitePage);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/cms/pages/:sitePageId')
  public async adminDeleteSitePage (
    @Param('sitePageId') sitePageId: number,
    @Res() response: Response) {

    const result = await ServiceRegistry.instance.getService(CMSService).adminDeleteSitePage(sitePageId);
    return this.createSuccessResponse(result, response);
  }
}
