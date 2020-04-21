import { BaseController } from './BaseController';
import { Response } from 'express';
import ClientAppConfig from '@/ClientAppConfig';
import AppConfig from '@/utils/Config';
import { JsonController, Get, Res, getMetadataArgsStorage, UseBefore, Post, Put, Body } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { authorized } from '@/middlewares/AuthorizeMiddleware';
// import RgisService from '@/services/RgisService';
import ServiceContainer from '@/services/ServiceContainer';
import { SmsSender } from '@/utils/sms/SmsSender';
import { SmsTransport } from '@/utils/sms/SmsTransport';
import { SmsRuTransport } from '@/utils/sms/SmsRuTransport';
import { SmsMessage } from '@/utils/sms/SmsMessage';
import { SmsResponse } from '@/utils/sms/SmsResponse';

@JsonController('/app')
export default class AppController extends BaseController {

  @Get('/client/config')
  public async getClientAppConfig (@Res() response: Response) {
    return BaseController.createSuccessResponse(ClientAppConfig, response);
  }

  @UseBefore(authorized())
  @Get('/spec')
  public async getApiSpec (@Res() response: Response) {
    const storage = getMetadataArgsStorage();
    const options = {
      defaultErrorHandler: true,
      routePrefix: AppConfig.serverConfig.restApiEndPoint
    }
    const spec = routingControllersToSpec(storage, options);
    return BaseController.createSuccessResponse(spec, response);
  }

  @Get('/client/sms')
  public async testSms (@Res() response: Response) {

    const smsSendCallback = (smsResponse: SmsResponse) => {
      // tslint:disable-next-line:no-console
      console.log(smsResponse.status);
    }

    const smsTransport = new SmsRuTransport('0D6F560A-EB10-7B37-EFCD-5E8E357E8C43');
    const smsSender = new SmsSender(smsTransport);
    const msgText = 'Проверка отправки SMS.';
    smsSender.send({ toPhone: 79218941537, message: msgText + '1' }, smsSendCallback);
    smsSender.send({ toPhone: 79215896429, message: msgText + '2' }, smsSendCallback);
    return BaseController.createSuccessResponse(ClientAppConfig, response);
  }


  // @Get('/rgis')
  // public async Rgis (@Res() response: Response) {
  //   new RgisService().start();
  //   return BaseController.createSuccessResponse('', response);
  // }
}

