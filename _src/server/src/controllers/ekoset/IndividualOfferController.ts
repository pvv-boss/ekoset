
import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { NotFound } from '@/exceptions/clientErrors/NotFound';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';

@JsonController()
export default class IndividualOfferController extends BaseController {

  @Get('/offers')
  public async getAll (
    @Res() response: Response) {
    const result = await ServiceContainer.IndividualOfferService.getAll();
    return IndividualOfferController.createSuccessResponse(result, response);
  }


  @Get('/:sitesection/offers')
  public async getAllBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {
    const result = await ServiceContainer.IndividualOfferService.getAllBySiteSectionId(siteSectionId);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/:activityType/offers')
  public async getByActivityAndBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @Param('activityType') activityTypeId: number) {
    const result = await ServiceContainer.IndividualOfferService.getByActivityAndBySiteSectionId(siteSectionId, activityTypeId);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/clients/:clientType/offers')
  public async getByClientTypeAndBySiteSectionId (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @Param('clientType') clientTypeId: number) {
    const result = await ServiceContainer.IndividualOfferService.getByClientTypeAndBySiteSectionId(siteSectionId, clientTypeId);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

  @Get('/offers/:offer')
  public async getById (
    @Res() response: Response,
    @Param('offer') offerId: number,
  ) {
    const result = await ServiceContainer.IndividualOfferService.getById(offerId);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

  @Put('/offers')
  public async save (
    @Body() individualOffer: IndividualOffer,
    @Res() response: Response) {
    const result = await ServiceContainer.IndividualOfferService.save(individualOffer);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

  @Delete('/offers/:id(\\d+)')
  public async delete (
    @Param('id') id: number,
    @Res() response: Response) {
    const result = await ServiceContainer.IndividualOfferService.delete(id);
    return IndividualOfferController.createSuccessResponse(result, response);
  }

}
