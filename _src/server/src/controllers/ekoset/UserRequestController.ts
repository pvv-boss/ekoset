import { JsonController } from 'routing-controllers/decorator/JsonController';
import { BaseController } from '../BaseController';
import { Get, Res, Param, UseBefore, Body, Req, Post, QueryParam } from 'routing-controllers';
import { Request, Response } from 'express';
import ServiceContainer from '@/services/ServiceContainer';
import ClassTransform from '@/utils/ClassTransform';
import * as multer from 'multer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import ClientNotifyMessage from '../ClientNotifyMessage';
import { Query } from 'typeorm/driver/Query';

const upload = multer();

@JsonController()
export default class UserRequestController extends BaseController {

  @UseBefore(upload.single('file'))
  @Post('/user/message')
  public async saveUserMessage (
    @Body() body: any,
    @Req() request: Request,
    @Res() response: Response,
    @QueryParam('ask') isAskForExpert: boolean
  ) {

    const file = request.file;
    const formData = JSON.parse(body.formMessageData);
    const requestData = ClassTransform.plainToClassInstanceOne<UserRequest>(formData, UserRequest);

    ServiceContainer.UserRequestService.saveRequest(file, requestData, isAskForExpert);

    return UserRequestController.createSuccessResponse({}, response);

    // return reqNmb > 0 ?
    //   UserRequestController.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createNotify(`Сообщение отправлено ! <br> Номер Вашего сообщения: <b>${reqNmb}</b></Сообщение>`)) :
    //   UserRequestController.createFailureResponseWithMessage(null, response, ClientNotifyMessage.createAlert('Ошибка', 'Не удалось доставить сообщение !'))
  }
}

