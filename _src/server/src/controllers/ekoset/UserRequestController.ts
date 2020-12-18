import { classToPlain, plainToClass } from 'class-transformer';
import { Get, Res, Param, UseBefore, Body, Req, Post, QueryParam, JsonController } from 'routing-controllers';
import { Request, Response } from 'express';
import multer from 'multer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import { BaseController, ClientNotifyMessage, SecurityHelper, ServiceRegistry, Unauthorized } from 'rsn-express-core';
import { UserRequestService } from '@/services/ekoset/UserRequestService';
import UserService from '@/services/ekoset/UserService';

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



  @UseBefore(upload.array('files'))
  @Post('/user/manager/message')
  public async sendMessageToManager (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response
  ) {
    try {
      const files = request.files as Express.Multer.File[];
      const formData = JSON.parse(body.formMessageData);
      const requestData = plainToClass(UserRequest, formData);

      const sessionUser = SecurityHelper.getSessionUserFromToken(request);

      if (!!sessionUser && sessionUser.appUserId > 0) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(sessionUser.appUserId)
        requestData.userRequestMail = client.personEmail;

        const reqNmb = await ServiceRegistry.instance.getService(UserRequestService).saveRequest(files, requestData, 100, client);
        const message = 'Ваше сообщение отправлено. В ближайшее время с Вами свяжутся наши специалисты';

        return reqNmb > 0 ?
          this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message)) :
          this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))

      } else {
        return this.createFailureResponse(new Unauthorized(), response)
      }

    } catch {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
    }
  }


  @Post('/deals/contract/message')
  public async continionContract (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response) {

    try {

      const sessionUser = SecurityHelper.getSessionUserFromToken(request);

      if (!!sessionUser && sessionUser.appUserId > 0) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(sessionUser.appUserId)
        await ServiceRegistry.instance.getService(UserRequestService).continionContract(client, body);

        const message = 'Спасибо за обращение. Мы уже начали обработку Вашего сообщения. В ближайшее время с Вами свяжется наш специалист'
        return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message))
      } else {
        return this.createFailureResponse(new Unauthorized(), response)
      }

    } catch {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
    }

  }


  @Post('/deals/sandoc/message')
  public async continionSanDoc (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response) {

    try {

      const sessionUser = SecurityHelper.getSessionUserFromToken(request);

      if (!!sessionUser && sessionUser.appUserId > 0) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(sessionUser.appUserId)
        await ServiceRegistry.instance.getService(UserRequestService).continionSanDoc(client, body);

        const message = 'Спасибо за обращение. Мы уже начали обработку Вашего сообщения. В ближайшее время с Вами свяжется наш специалист'
        return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message))
      } else {
        return this.createFailureResponse(new Unauthorized(), response)
      }

    } catch {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
    }
  }

  @Post('/deals/work/message')
  public async continionWork (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response) {
    try {

      const sessionUser = SecurityHelper.getSessionUserFromToken(request);

      if (!!sessionUser && sessionUser.appUserId > 0) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(sessionUser.appUserId)
        await ServiceRegistry.instance.getService(UserRequestService).continionWork(client, body);

        const message = 'Спасибо за обращение. Мы уже начали обработку Вашего сообщения. В ближайшее время с Вами свяжется наш специалист'
        return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', message))
      } else {
        return this.createFailureResponse(new Unauthorized(), response)
      }

    } catch {
      return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
    }
  }
}
