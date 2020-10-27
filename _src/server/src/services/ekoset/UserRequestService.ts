import { UserRequest } from '@/entities/ekoset/UserRequest';
import Intl from 'intl';
import { UserRequestFile } from '@/entities/ekoset/UserRequestFile';
import { BaseService, logger, MailMessage, MailSender, postgresWrapper, ServiceRegistry, TypeOrmManager } from 'rsn-express-core';
import MediaService from './MediaService';

const ruDateFormat = new Intl.DateTimeFormat('ru', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC', hour12: false,
  minute: 'numeric'
});

export class UserRequestService extends BaseService {

  private apiRequestView = 'v_api_user_request';

  public async getAllRequests () {
    return postgresWrapper.anyWhere(this.apiRequestView);
  }

  public async saveRequest (files: Express.Multer.File[], request: UserRequest, mode: number) {
    try {
      request.userRequestDate = new Date().toUTCString();
      await TypeOrmManager.EntityManager.save(request);

      const attachments = [];
      if (!!files && files.length > 0) {
        for (const iterFile of files) {
          const pathAndFileName = await ServiceRegistry.instance.getService(MediaService).saveFileFromRequestBody(iterFile, 'app', 'requests', `req${request.userRequestId}`);
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

      this.sendEmailsByRequest(request, mode, attachments);

      return request.userRequestId;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }


  private async sendEmailsByRequest (request: UserRequest, mode: number, attachments: any[]) {
    const format = (template: string) => {
      const gmtDate = new Date(request.userRequestDate);
      const mskDate = gmtDate.setHours(gmtDate.getHours() + 3);

      const dateFormated = ruDateFormat.format(mskDate);

      const startMessage = mode === 0 ? 'Мы получили Ваш заказ и приступили к его обработке:' : (mode === 1 ? 'Мы получили Ваш вопрос и приступили к его обработке:' : 'Мы получили Ваше приглашение на тендер и приступили к его обработке:')

      return template.
        replace('{{userRequestUser}}', request.userRequestUser).
        replace('{{userRequestDate}}', dateFormated).
        replace('{{userRequestPhone}}', request.userRequestPhone).
        replace('{{userRequestService}}', request.userRequestService).
        replace('{{userRequestText}}', request.userRequestText).
        replace('{{userRequestMail}}', request.userRequestMail).
        replace('{{startMessage}}', startMessage)
    }

    const header = mode === 0 ? 'Вы оформили заказ' : (mode === 1 ? 'Вы задали вопрос эксперту' : 'Вы пригласили нас на тендер');

    const backTemplateName = mode === 0 ? 'back_user_request' : 'back_user_request_simple';
    const templateName = mode === 0 ? 'user_request' : 'user_request_simple';

    const sender = new MailSender();

    const backMessage: MailMessage = {
      from: `Компания ЭКОСЕТЬ <inbox@ekoset.ru>`,
      to: request.userRequestMail,
      subject: header,
      text: '',
      html: ''
    }

    try {
      const ss = await sender.sendFromTemplate(backMessage, backTemplateName, format);
    } catch (err) {
      logger.error(err)
    }


    this.getToEmails().forEach(async (iterEmal) => {
      const innerMessage: MailMessage = {
        from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
        to: iterEmal,
        subject: 'ЗАКАЗ',
        text: '',
        html: '',
        attachments
      }
      try {
        await sender.sendFromTemplate(innerMessage, templateName, format);
      } catch (err) {
        logger.error(err)
      }
    })

  }
  private getToEmails () {
   // return ['SergeyRyzhkov76@gmail.com'];
      return ['inbox@ekoset.ru', 'SergeyRyzhkov76@gmail.com'];
  }
}
