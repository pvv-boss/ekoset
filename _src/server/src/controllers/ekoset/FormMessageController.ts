import { JsonController, Post, Res, Body, UseBefore, Req } from 'routing-controllers';
import { Response, Request } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import * as multer from 'multer';

const upload = multer();

@JsonController()
export default class FormMessageController extends BaseController {

  @UseBefore(upload.single('file'))
  @Post('/user/message')
  public async saveArticle (
    @Body() formData: any,
    @Req() request: Request,
    @Res() response: Response) {

    const file = request.file;
    const files = request.files;
    const result = await ServiceContainer.FormMessageService.testForm(formData);
    return FormMessageController.createSuccessResponse({}, response);
  }
}
