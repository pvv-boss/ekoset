import { classToPlain, plainToClass } from 'class-transformer';
import { Get, Res, Param, UseBefore, Body, Req, Post, QueryParam, JsonController } from 'routing-controllers';
import { Request, Response } from 'express';
import multer from 'multer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import { BaseController, ClientNotifyMessage, ServiceRegistry } from 'rsn-express-core';
import { UserRequestService } from '@/services/ekoset/UserRequestService';

const upload = multer();

@JsonController()
export default class UserRequestController extends BaseController {

  @UseBefore(upload.array('files'))
  @Post('/user/message')
  public async saveUserMessage (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response,
    @QueryParam('ask') mode: number
  ) {

    const files = request.files as Express.Multer.File[];
    const formData = JSON.parse(body.formMessageData);
    const requestData = plainToClass(UserRequest, formData);

    const reqNmb = await ServiceRegistry.instance.getService(UserRequestService).saveRequest(files, requestData, mode);

    const message = mode === 0 ? 'Ваш заказ отправлен. В ближайшее время с Вами свяжутся наши специалисты' : (mode === 1 ? 'Ваш вопрос отправлен. В ближайшее время с Вами свяжутся наши специалисты' : 'Ваше приглашение на тендер отправлено. В ближайшее время с Вами свяжутся наши специалисты');

    return reqNmb > 0 ?
      this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message)) :
      this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
  }

  @Post('/deals/contract/message')
  public async continionContract (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response) {

    try {
      await ServiceRegistry.instance.getService(UserRequestService).continionContract(body);

      const message = 'Спасибо за обращение. Мы уже начали обработку Вашего сообщения. В ближайшее время с Вами свяжется наш специалист'
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message))
    } catch {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
    }

  }
}
