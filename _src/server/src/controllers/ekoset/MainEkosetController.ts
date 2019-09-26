import { JsonController, Get, Res, Param, Req, Body, Put, Delete, UseBefore, Post } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import BusinessServiceController from './BusinessServiceController';
import { ClBrand } from '@/entities/ekoset/ClBrand';
import { ClActivity } from '@/entities/ekoset/ClActivity';

@JsonController()
export default class MainEkosetController extends BaseController {

  @Get('/activities')
  public async getSiteSections (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.getSiteSections();
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/activities/:sitesection')
  public async getSiteSectionById (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.MainEkosetService.getSiteSectionById(siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/clients')
  public async getPartners (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.getPartners();
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/brands/serivce/:serviceId')
  public async getAdminForBusinessServiceBrands (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceContainer.MainEkosetService.getAdminForBusinessServiceBrands(serviceId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/brands')
  public async adminGetAllBands (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.MainEkosetService.getAdminAllBands();
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/clActivities')
  public async adminGetClActivityList (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.adminGetClActivityList();
    return MainEkosetController.createSuccessResponse(result, response);
  }


  @Put('/admin/panel/clActivities')
  public async adminSaveClActivity (
    @Body() clActivity: ClActivity,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.adminSaveClActivity(clActivity);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/brands/activities/:sitesection')
  public async getAdminForSiteSectionBrands (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.MainEkosetService.getAdminForSiteSectionBrands(siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/brands')
  public async getBrandsForHomePage (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.getBrandsForHomePage();
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/brands')
  public async getBrandsBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.MainEkosetService.getBrandsBySiteSection(siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/services/:service(\\d+)/brands')
  public async getByBusinessService (
    @Res() response: Response,
    @Param('service') serviceId: number) {

    const result = await ServiceContainer.MainEkosetService.getBrandsByBusinessService(serviceId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Put('/brands/:brandId/sitesection/:siteSectionId')
  public async addBrand2SiteSection (
    @Param('brandId') brandId: number,
    @Param('siteSectionId') siteSectionId: number,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.addBrand2SiteSection(brandId, siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Put('/brands/:brandId/service/:serviceId')
  public async addBrand2Service (
    @Param('brandId') brandId: number,
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.addBrand2Service(brandId, serviceId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Delete('/brands/:brandId/sitesection/:siteSectionId')
  public async removeBrandFromSiteSection (
    @Param('brandId') brandId: number,
    @Param('siteSectionId') siteSectionId: number,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.removeBrandFromSiteSection(brandId, siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Delete('/brands/:brandId/service/:serviceId')
  public async removeBrandFromService (
    @Param('brandId') brandId: number,
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.removeBrandFromService(brandId, serviceId);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Put('/brands')
  public async saveBrand (
    @Body() clBrand: ClBrand,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.saveBrand(clBrand);
    return MainEkosetController.createSuccessResponse(result, response);
  }


  @Delete('/brands/:id(\\d+)')
  public async deleteBrand (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.deleteBrand(id);
    // return MainEkosetController.createSuccessResponse(result, response);
  }

  @Put('/activities')
  public async saveSiteSection (
    @Body() siteSection: SiteSection,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.saveSiteSection(siteSection);
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Delete('/activities/:id(\\d+)')
  public async deleteSiteSection (
    @Param('id') id: number,
    @Res() response: Response) {
    // const result = await ServiceContainer.MainEkosetService.deleteSiteSection(id);
    // return BusinessServiceController.createSuccessResponse(result, response);
  }
}
