import BaseService from '../BaseService';
import ServiceContainer from '../ServiceContainer';
import { UserRequest } from '@/entities/ekoset/UserRequest';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { logger } from '@/utils/Logger';
import MailSender from '@/utils/MailSender';
import * as Intl from 'intl';
import { UserRequestFile } from '@/entities/ekoset/UserRequestFile';

const ruDateFormat = new Intl.DateTimeFormat('ru', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC', hour12: false,
  minute: 'numeric'
});

export class UserRequestService extends BaseService {

  private apiRequestView = 'v_api_user_request';

  public async getAllRequests () {
    return this.getDbViewResult(this.apiRequestView);
  }

  public async saveRequest (files: Express.Multer.File[], request: UserRequest, isAskForExpert: boolean) {
    try {
      request.userRequestDate = new Date().toUTCString();
      await TypeOrmManager.EntityManager.save(request);

      const attachments = [];
      if (!!files && files.length > 0) {
        for (const iterFile of files) {
          const pathAndFileName = await ServiceContainer.MediaService.saveFileFromRequestBody(iterFile, 'app', 'requests', `req${request.userRequestId}`);
          if (!!pathAndFileName && pathAndFileName.length > 1) {
            const file = new UserRequestFile();
            file.userRequestId = request.userRequestId;
            file.userRequestFileName = pathAndFileName[1];
            TypeOrmManager.EntityManager.save(file);

            attachments.push(
              {
                filename: iterFile.originalname,
                path: pathAndFileName[0]
              }
            )
          };
        }
      }

      this.sendEmailsByRequest(request, isAskForExpert, attachments);

      return request.userRequestId;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }


  private sendEmailsByRequest (request: UserRequest, isAskForExpert: boolean, attachments: any[]) {
    const format = (template: string) => {
      const gmtDate = new Date(request.userRequestDate);
      const mskDate = gmtDate.setHours(gmtDate.getHours() + 3);

      const dateFormated = ruDateFormat.format(mskDate);

      return template.
        replace('{{userRequestUser}}', request.userRequestUser).
        replace('{{userRequestDate}}', dateFormated).
        replace('{{userRequestPhone}}', request.userRequestPhone).
        replace('{{userRequestService}}', request.userRequestService).
        replace('{{userRequestText}}', request.userRequestText).
        replace('{{userRequestMail}}', request.userRequestMail).
        replace('{{startMessage}}', isAskForExpert ? 'Мы получили Ваш вопрос и приступили к его обработке:' : 'Мы получили Ваш заказ и приступили к его обработке:')
    }

    const header = isAskForExpert ? 'Вы задали вопрос эксперту' : 'Вы оформили заказ';

    const backTemplateName = isAskForExpert ? 'back_user_request_simple' : 'back_user_request';
    const templateName = isAskForExpert ? 'user_request_simple' : 'user_request';

    MailSender.sendWithAttachment(`Компания ЭКОСЕТЬ <inbox@ekoset.ru>`, request.userRequestMail, header, backTemplateName, null, format);

    this.getToEmails().forEach((iterEmal) => {
      MailSender.sendWithAttachment(`Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`, iterEmal, 'ЗАКАЗ', templateName, attachments, format);
    })

  }
  private getToEmails () {
    return ['inbox@ekoset.ru', 'SergeyRyzhkov76@gmail.com'];
  }
}
