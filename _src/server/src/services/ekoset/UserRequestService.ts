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

      let pathAndFileName = [];
      if (!!file && file.size > 0) {
        pathAndFileName = await ServiceContainer.MediaService.saveFileFromRequestBody(file, 'app', 'requests', `req${request.userRequestId}`);
        if (!!pathAndFileName && pathAndFileName.length > 1) {
          request.userRequestFileName = pathAndFileName[1];
          TypeOrmManager.EntityManager.save(request);
        }
      }

      this.sendEmailsByRequest(request, isAskForExpert, !!file && file.size > 0 ? pathAndFileName[0] : null, !!file && file.size > 0 ? file.originalname : null);

      return request.userRequestId;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }


  private sendEmailsByRequest (request: UserRequest, isAskForExpert: boolean, attachmentFilePath: string, attachmentFileName: string) {
    const format = (template: string) => {
      const gmtDate = new Date(request.userRequestDate);
      const mskDate = gmtDate.setHours(gmtDate.getHours() + 3);

      const dateFormated = ruDateFormat.format(mskDate);

      return template.
        replace('{{userRequestUser}}', request.userRequestUser).
        replace('{{userRequestDate}}', dateFormated).
        replace('{{userRequestPhone}}', request.userRequestPhone).
        replace('{{userRequestText}}', request.userRequestText).
        replace('{{userRequestMail}}', request.userRequestMail).
        replace('{{startMessage}}', isAskForExpert ? 'Мы получили Ваш вопрос и приступили к его обработке:' : 'Мы получили Ваш заказ и приступили к его обработке:')
    }

    const header = isAskForExpert ? 'Вы задали вопрос эксперту' : 'Вы оформили заказ';


    MailSender.sendWithAttachment(`Компания ЭКОСЕТЬ <inbox@ekoset.ru>`, request.userRequestMail, header, 'back_user_request', null, null, format);

    this.getToEmails().forEach((iterEmal) => {
      MailSender.sendWithAttachment(`Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`, iterEmal, 'ЗАКАЗ', 'user_request', attachmentFilePath, attachmentFileName, format);
    })

  }
  private getToEmails () {
    return ['inbox@ekoset.ru', 'SergeyRyzhkov76@gmail.com'];
  }
}
