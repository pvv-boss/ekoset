import { JsonController, Body, UseBefore, Post, Req, Res, Param } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ClassTransform from '@/utils/ClassTransform';
import FormMessageData from '@/entities/FormMessageData';
import ServiceContainer from '@/services/ServiceContainer';
import * as multer from 'multer';


const upload = multer();

@JsonController()
export default class MediaController extends BaseController {

  @UseBefore(upload.single('file'))
  @Post('/user/message')
  public async saveUserMessage (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const formData = JSON.parse(body.formMessageData);
    const formDataInstance = ClassTransform.plainToClassInstanceOne<FormMessageData>(formData, FormMessageData);

    const result = await ServiceContainer.MediaService.saveUserMessage(formDataInstance, file);
    return MediaController.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/sitesection/:sitesectionId/image/:bigOrSmall(big|small)')
  public async saveSiteSectionImage (
    @Body() body: any,
    @Param('sitesectionId') siteSectionId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    // const formData = JSON.parse(body.formMessageData);
    // const formDataInstance = ClassTransform.plainToClassInstanceOne<FormMessageData>(formData, FormMessageData);

    const result = await ServiceContainer.MediaService.saveSiteSectionImage(siteSectionId, file, bigOrSmall === 'big');
    return MediaController.createSuccessResponse(result, response);
  }


  @UseBefore(upload.single('file'))
  @Post('/admin/panel/service/:serviceId/image/:bigOrSmall(big|small)')
  public async saveServiceImage (
    @Body() body: any,
    @Param('serviceId') serviceId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceContainer.MediaService.saveServiceImage(serviceId, file, bigOrSmall === 'big');
    return MediaController.createSuccessResponse(result, response);
  }

  @UseBefore(upload.single('file'))
  @Post('/admin/panel/offer/:offerId/image/:bigOrSmall(big|small)')
  public async saveOfferImage (
    @Body() body: any,
    @Param('offerId') offerId: number,
    @Param('bigOrSmall') bigOrSmall: string,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const result = await ServiceContainer.MediaService.saveOfferImage(offerId, file, bigOrSmall === 'big');
    return MediaController.createSuccessResponse(result, response);
  }
}

