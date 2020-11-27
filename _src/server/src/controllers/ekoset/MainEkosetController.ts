import { JsonController, Get, Res, Param, Body, Put, Delete, QueryParam } from 'routing-controllers';
import { Response } from 'express';
import { SiteSection } from '@/entities/ekoset/SiteSection';
import { ClBrand } from '@/entities/ekoset/ClBrand';
import { ClActivityType } from '@/entities/ekoset/ClActivityType';
import { ReccomendationLetter } from '@/entities/ekoset/ReccomendationLetter';
import { BaseController, ClientNotifyMessage, ServiceRegistry } from 'rsn-express-core';
import MainEkosetService from '@/services/ekoset/MainEkosetService';

@JsonController()
export default class MainEkosetController extends BaseController {

  @Get('/activities')
  public async getSiteSections (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getSiteSections();
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/activities')
  public async adminGetSiteSections (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).adminGetSiteSections();
    return this.createSuccessResponse(result, response);
  }

  @Get('/activities/:sitesection')
  public async getSiteSectionById (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    if (Number.isNaN(siteSectionId)) {
      return this.createSuccessResponse({}, response);
    }
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getSiteSectionById(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/activities/query/name/:sitesection')
  public async getSiteSectionNameById (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    if (!!siteSectionId) {
      const result = await ServiceRegistry.instance.getService(MainEkosetService).getSiteSectionNameById(siteSectionId);
      const rr = !!result && result.length && result.length > 0 ? result[0] : null
      return this.createSuccessResponse(rr, response);
    } else {
      this.createSuccessResponse({}, response)
    }
  }


  @Get('/admin/panel/brands/serivce/:serviceId')
  public async getAdminForBusinessServiceBrands (
    @Res() response: Response,
    @Param('serviceId') serviceId: number) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getAdminForBusinessServiceBrands(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/brands')
  public async adminGetAllBands (
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getAdminAllBands();
    return this.createSuccessResponse(result, response);
  }


  @Get('/admin/panel/brands/:brandId')
  public async adminGetBrandById (
    @Param('brandId') brandId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).adminGetBrandById(brandId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/clActivities')
  public async adminGetClActivityList (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).adminGetClActivityList();
    return this.createSuccessResponse(result, response);
  }


  @Put('/admin/panel/clActivities')
  public async adminSaveClActivity (
    @Body() clActivity: ClActivityType,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).adminSaveClActivity(clActivity);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/admin/panel/clActivities/:id')
  public async deleteClActivity (
    @Param('id') clActivityID: number,
    @Res() response: Response) {
    try {
      const result = await ServiceRegistry.instance.getService(MainEkosetService).deleteClActivity(clActivityID);
      return this.createSuccessResponse(result, response);
    } catch (err) {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert(' Внимание ', 'Данная запись используется и её удалить нельзя !'));
    }
  }

  @Get('/admin/panel/brands/activities/:sitesection')
  public async getAdminForSiteSectionBrands (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getAdminForSiteSectionBrands(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/brands')
  public async getBrandsForHomePage (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getBrandsForHomePage();
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/brands')
  public async getBrandsBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    if (Number.isNaN(siteSectionId)) {
      return this.createSuccessResponse({}, response);
    }
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getBrandsBySiteSection(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/services/:service(\\d+)/brands')
  public async getByBusinessService (
    @Res() response: Response,
    @Param('service') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(MainEkosetService).getBrandsByBusinessService(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/brands/:brandId/sitesection/:siteSectionId')
  public async addBrand2SiteSection (
    @Param('brandId') brandId: number,
    @Param('siteSectionId') siteSectionId: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).addBrand2SiteSection(brandId, siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/brands/:brandId/service/:serviceId')
  public async addBrand2Service (
    @Param('brandId') brandId: number,
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).addBrand2Service(brandId, serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/brands/:brandId/sitesection/:siteSectionId')
  public async removeBrandFromSiteSection (
    @Param('brandId') brandId: number,
    @Param('siteSectionId') siteSectionId: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).removeBrandFromSiteSection(brandId, siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/brands/:brandId/service/:serviceId')
  public async removeBrandFromService (
    @Param('brandId') brandId: number,
    @Param('serviceId') serviceId: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).removeBrandFromService(brandId, serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Put('/brands')
  public async saveBrand (
    @Body() clBrand: ClBrand,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).saveBrand(clBrand);
    return this.createSuccessResponse(result, response);
  }


  @Delete('/brands/:id(\\d+)')
  public async deleteBrand (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).deleteBrand(id);
    return this.createSuccessResponse(result, response);
  }

  @Put('/activities')
  public async saveSiteSection (
    @Body() siteSection: SiteSection,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).saveSiteSection(siteSection);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/activities/:id(\\d+)')
  public async deleteSiteSection (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).deleteSiteSection(id);
    return this.createSuccessResponse(result, response);
  }

  // Рекомендации
  // Для бренда
  @Get('/brands/:brandId/letters')
  public async getRecommendationLettersByBrand (
    @Res() response: Response,
    @Param('brandId') brandId: number) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getRecommendationLettersByBrand(brandId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/letters')
  public async getRecommendationLettersForHomePage (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getRecommendationLettersForHomePage();
    return this.createSuccessResponse(result, response);
  }

  @Get('/letters/sitesection/:sitesection')
  public async getRecommendationLettersBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getRecommendationLettersBySiteSection(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/letters/services/:service(\\d+)')
  public async getRecommendationLettersByBusinessService (
    @Res() response: Response,
    @Param('service') serviceId: number) {

    const result = await ServiceRegistry.instance.getService(MainEkosetService).getRecommendationLettersByBusinessService(serviceId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/clients')
  public async getClientsInfo (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).getClientsInfo();
    return this.createSuccessResponse(result, response);
  }

  @Get('/clients/activity/:id')
  public async getClientsInfoByActivity (
    @Res() response: Response,
    @Param('id') activityId: number) {

    const result = await ServiceRegistry.instance.getService(MainEkosetService).getClientsInfoByActivity(activityId);
    return this.createSuccessResponse(result, response);
  }

  // Сохранить
  @Put('/brands/letters')
  public async saveRecommendation (
    @Body() reccomendationLetter: ReccomendationLetter,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).saveRecommendation(reccomendationLetter);
    return this.createSuccessResponse(result, response);
  }

  // Удалить
  @Delete('/brands/letters/:id(\\d+)')
  public async deleteRecommendationLetter (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(MainEkosetService).deleteRecommendationLetter(id);
    return this.createSuccessResponse(result, response);
  }
}
