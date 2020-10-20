
import { JsonController, Get, Res, Param, Body, Put, Delete } from 'routing-controllers';
import { Response } from 'express';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import IndividualOfferService from '@/services/ekoset/IndividualOfferService';

@JsonController()
export default class IndividualOfferController extends BaseController {

  // Админка
  @Put('/offers')
  public async save (
    @Body() individualOffer: IndividualOffer,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).save(individualOffer);
    return this.createSuccessResponse(result, response);
  }

  @Delete('/offers/:id(\\d+)')
  public async delete (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).delete(id);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/offers')
  public async adminGetAll (
    @Res() response: Response,
  ) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).adminGetAll();
    return this.createSuccessResponse(result, response);
  }
  //

  @Get('/offers')
  public async getAll (
    @Res() response: Response) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getAll();
    return this.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/offers')
  public async getAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getAllBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/admin/panel/:sitesection/offers')
  public async adminGetAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).adminGetAllBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/activity/offers')
  public async getForActivityBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getForActivityBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/clients/offers')
  public async getForClientBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getForClientBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/offers/person')
  public async getForPrivatePersonBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getForPrivatePersonBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/offers/business')
  public async getForBusinessBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getForBusinessBySiteSectionId(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get('/offers/:offer')
  public async getById (
    @Res() response: Response,
    @Param('offer') offerId: number,
  ) {
    const result = await ServiceRegistry.instance.getService(IndividualOfferService).getById(offerId);
    return this.createSuccessResponse(result, response);
  }
}
