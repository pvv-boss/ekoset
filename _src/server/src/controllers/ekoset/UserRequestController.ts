import { JsonController } from 'routing-controllers/decorator/JsonController';
import { BaseController } from '../BaseController';
import { Get, Res, Param, UseBefore, Body, Req, Post, QueryParam } from 'routing-controllers';
import { Request, Response } from 'express';
import ServiceContainer from '@/services/ServiceContainer';
import ClassTransform from '@/utils/ClassTransform';
import * as multer from 'multer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import ClientNotifyMessage from '../ClientNotifyMessage';

const upload = multer();

@JsonController()
export default class UserRequestController extends BaseController {

  @UseBefore(upload.array('files'))
  @Post('/user/message')
  public async saveUserMessage (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response,
    @QueryParam('ask') isAskForExpert: boolean
  ) {

    const files = request.files as Express.Multer.File[];
    const formData = JSON.parse(body.formMessageData);
    const requestData = ClassTransform.plainToClassInstanceOne<UserRequest>(formData, UserRequest);

    const reqNmb = await ServiceContainer.UserRequestService.saveRequest(files, requestData, isAskForExpert);

    // return UserRequestController.createSuccessResponse({}, response);

    return reqNmb > 0 ?
      UserRequestController.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createNotify('<br> Ваш заказ отправлен. <br> В ближайшее время с Вами свяжутся наши специалисты <br> <br>')) :
      UserRequestController.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
  }
}

