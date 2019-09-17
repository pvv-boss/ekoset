import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import BusinessServiceController from './BusinessServiceController';

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


  @Get('/brands')
  public async getBrandsForHomePage (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.getBrandsForHomePage();
    return MainEkosetController.createSuccessResponse(result, response);
  }

  @Get('/allbrands')
  public async getAllBrands (
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.getBrands();
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

  @Put('/activities')
  public async saveSiteSection (
    @Body() siteSection: SiteSection,
    @Res() response: Response) {
    const result = await ServiceContainer.MainEkosetService.saveSiteSection(siteSection);
    return BusinessServiceController.createSuccessResponse(result, response);
  }

  @Delete('/activities/:id(\\d+)')
  public async deleteSiteSection (
    @Param('id') id: number,
    @Res() response: Response) {
    // const result = await ServiceContainer.MainEkosetService.deleteSiteSection(id);
    // return BusinessServiceController.createSuccessResponse(result, response);
  }
}
