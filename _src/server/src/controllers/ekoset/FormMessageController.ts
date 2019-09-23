import { JsonController, Post, Res, Body, UseBefore } from 'routing-controllers';
import { Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import * as bodyParser from 'body-parser';

@JsonController()
export default class FormMessageController extends BaseController {

  @UseBefore(bodyParser.urlencoded())
  @Post('/user/message')
  public async saveArticle (
    @Body() formData: any,
    @Res() response: Response) {

    const result = await ServiceContainer.FormMessageService.testForm(formData);
    return FormMessageController.createSuccessResponse({}, response);
  }
}
