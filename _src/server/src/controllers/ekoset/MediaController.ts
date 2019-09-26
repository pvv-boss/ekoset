import { JsonController, Body, UseBefore, Post, Req, Res } from 'routing-controllers';
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
}
