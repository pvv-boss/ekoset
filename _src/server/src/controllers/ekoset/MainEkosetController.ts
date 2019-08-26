import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { Article } from '@/entities/ekoset/Article';

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
    const result = await ServiceContainer.MainEkosetService.getForHomePage();
    return MainEkosetController.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/brands')
  public async getBrandsBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.MainEkosetService.getBrandsBySiteSection(siteSectionId);
    return MainEkosetController.createSuccessResponse(result, response);
  }
}
