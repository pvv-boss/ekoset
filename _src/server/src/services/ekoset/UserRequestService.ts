import BaseService from '../BaseService';
import ServiceContainer from '../ServiceContainer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { logger } from '@/utils/Logger';
import MailSender from '@/utils/MailSender';
import Intl from 'intl';

const ruDateFormat = new Intl.DateTimeFormat('ru', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC', hour12: false,
  minute: 'numeric'
});

export class UserRequestService extends BaseService {

  private apiRequestView = 'v_api_user_request';

  public async getAllRequests () {
    return this.getDbViewResult(this.apiRequestView);
  }

  public async saveRequest (file: Express.Multer.File, request: UserRequest, isAskForExpert: boolean) {
    try {
      request.userRequestDate = new Date().toUTCString();
      await TypeOrmManager.EntityManager.save(request);

      if (!!file && file.size > 0) {
        const pathAndFileName = await ServiceContainer.MediaService.saveFileFromRequestBody(file, 'app', 'requests', `req${request.userRequestId}`);
        if (!!pathAndFileName && pathAndFileName.length > 1) {
          request.userRequestFileName = pathAndFileName[1];
          TypeOrmManager.EntityManager.save(request);
        }
      }

      this.sendEmailsByRequest(request, isAskForExpert);

      return request.userRequestId;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }


  private sendEmailsByRequest (request: UserRequest, isAskForExpert: boolean) {
    const format = (template: string) => {
      const dateFormated = ruDateFormat.format(new Date(request.userRequestDate));

      return template.
        replace('{{userRequestUser}}', request.userRequestUser).
        replace('{{userRequestDate}}', dateFormated).
        replace('{{userRequestPhone}}', request.userRequestPhone).
        replace('{{userRequestText}}', request.userRequestText).
        replace('{{userRequestMail}}', request.userRequestMail).
        replace('{{startMessage}}', isAskForExpert ? 'Мы получили Ваш вопрос и приступили к его обработке:' : 'Мы получили Ваш заказ и приступили к его обработке:')
    }

    const header = isAskForExpert ? 'Вы задали вопрос эксперту' : 'Вы оформили заказ';


    MailSender.sendFromTemplateFr(`Компания ЭКОСЕТЬ <inbox@ekoset.ru>`, request.userRequestMail, header, 'back_user_request', format);
    MailSender.sendFromTemplateFr(`Компания ЭКОСЕТЬ <inbox@ekoset.ru>`, 'SergeyRyzhkov76@gmail.com', header, 'back_user_request', format);

    this.getToEmails().forEach((iterEmal) => {
      MailSender.sendFromTemplateFr(`Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`, iterEmal, 'ЗАКАЗ', 'user_request', format);
    })

  }

  private getToEmails () {
    return ['inbox@ekoset.ru', 'servis4@ekoset.ru'];
  }
}
