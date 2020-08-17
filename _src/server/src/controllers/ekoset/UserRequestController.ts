import { JsonController } from 'routing-controllers/decorator/JsonController';
import { BaseController } from '../BaseController';
import { Get, Res, Param, UseBefore, Body, Req, Post, QueryParam } from 'routing-controllers';
import { Request, Response } from 'express';
import ServiceContainer from '@/services/ServiceContainer';
import ClassTransform from '@/utils/ClassTransform';
import multer from 'multer';
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
    @QueryParam('ask') mode: any
  ) {

    const files = request.files as Express.Multer.File[];
    const formData = JSON.parse(body.formMessageData);
    const requestData = ClassTransform.plainToClassInstanceOne<UserRequest>(formData, UserRequest);

    const reqNmb = await ServiceContainer.UserRequestService.saveRequest(files, requestData, mode);
    // const reqNmb = await ServiceContainer.UserRequestService.saveRequest(files, requestData, 0);

    const message = mode === 0 ? 'Ваш заказ отправлен. В ближайшее время с Вами свяжутся наши специалисты' : 'Ваш вопрос отправлен. В ближайшее время с Вами свяжутся наши специалисты';

    return reqNmb > 0 ?
      UserRequestController.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createNotify(message, 'ЭКОСЕТЬ')) :
      UserRequestController.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
  }
}

