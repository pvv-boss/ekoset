import { UserRequest } from '@/entities/ekoset/UserRequest';
import Intl from 'intl';
import { UserRequestFile } from '@/entities/ekoset/UserRequestFile';
import { BaseService, logger, MailMessage, MailSender, postgresWrapper, ServiceRegistry, TypeOrmManager } from 'rsn-express-core';
import MediaService from './MediaService';
import Contract from '@/entities/deal/Contract';
import SanDoc from '@/entities/deal/SanDoc';
import Work from '@/entities/deal/Work';
import EkosetClient from '@/entities/ekoset/EkosetClient';

const ruDateFormat = new Intl.DateTimeFormat('ru', {
  day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC', hour12: false,
  minute: 'numeric'
});

export class UserRequestService extends BaseService {

  private apiRequestView = 'v_api_user_request';

  public async getAllRequests () {
    return postgresWrapper.anyWhere(this.apiRequestView);
  }

  public async saveRequest (files: Express.Multer.File[], request: UserRequest, mode: number, clinet?: EkosetClient) {
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

      this.sendEmailsByRequest(request, mode, attachments, clinet);

      return request.userRequestId;
    } catch (err) {
      logger.error(err);
      return -1;
    }
  }

  public async continionContract (clinet: EkosetClient, contract: Contract) {
    const format = (template: string) => {
      return this.formatAllPossible(template, clinet, contract, null, null);
    }

    const sender = new MailSender();

    this.getDealManagerToEmails(clinet).forEach(async (iterEmal) => {
      const innerMessage: MailMessage = {
        from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
        to: iterEmal,
        subject: `Заявка на продление договора с ${contract.clientName}`,
        text: '',
        html: ''
      }
      try {
        await sender.sendFromTemplate(innerMessage, 'contract_contin', format);
      } catch (err) {
        logger.error(err)
      }
    })
  }

  public async continionSanDoc (clinet: EkosetClient, sanDoc: SanDoc) {
    const format = (template: string) => {
      return this.formatAllPossible(template, clinet, null, null, sanDoc);
    }

    const sender = new MailSender();

    this.getDealManagerToEmails(clinet).forEach(async (iterEmal) => {
      const innerMessage: MailMessage = {
        from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
        to: iterEmal,
        subject: `Заявка на продление документа с  ${sanDoc.clientName}`,
        text: '',
        html: ''
      }
      try {
        await sender.sendFromTemplate(innerMessage, 'sandoc_contin', format);
      } catch (err) {
        logger.error(err)
      }
    })
  }


  public async continionWork (clinet: EkosetClient, work: Work) {
    const format = (template: string) => {
      return this.formatAllPossible(template, clinet, null, work, null);
    }

    const sender = new MailSender();

    const title = work.sheldServicePlanInd === 1 ? `Заявка на изменение даты работ с  ${work.clientName}` : `Заявка на повтор работы с  ${work.clientName}`

    this.getDealManagerToEmails(clinet).forEach(async (iterEmal) => {
      const innerMessage: MailMessage = {
        from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
        to: iterEmal,
        subject: title,
        text: '',
        html: ''
      }
      try {
        await sender.sendFromTemplate(innerMessage, 'work_contin', format);
      } catch (err) {
        logger.error(err)
      }
    })
  }

  public sendActivateUserMail (clinet: EkosetClient, password: string) {
    const format = (template: string) => {
      const text = this.formatAllPossible(template, clinet, null, null, null);
      return text.replace('{{user_login}}', clinet.personEmail).replace('{{user_password}}', password);
    }

    const getEmails = (clinet: EkosetClient) => {
      return ['SergeyRyzhkov76@gmail.com', 'pvv@ekoset.ru']
    }

    const sender = new MailSender();

    getEmails(clinet).forEach(async (iterEmal) => {
      const innerMessage: MailMessage = {
        from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
        to: iterEmal,
        subject: `Активация доступа в ЛК сайт ЭКОСЕТЬ`,
        text: '',
        html: ''
      }
      try {
        await sender.sendFromTemplate(innerMessage, 'activate_user', format);
      } catch (err) {
        logger.error(err)
      }
    })
  }

  private formatAllPossible (template: string, clinet: EkosetClient, contract: Contract, work: Work, sanDoc: SanDoc) {
    let result = template

    if (!!contract) {
      result = result.replace('{{contractForm}}', contract.contractForm + ' от ' + ruDateFormat.format(new Date(contract.contractDateStart))?.split(',')[0]).
        replace('{{contractDateEnd}}', ruDateFormat.format(new Date(contract.contractDateEnd))?.split(',')[0]);
    }

    if (!contract && !!work) {
      result = result.replace('{{contractForm}}', work.contractForm + ' от ' + ruDateFormat.format(new Date(work.contractDateStart))?.split(',')[0]).
        replace('{{contractDateEnd}}', ruDateFormat.format(new Date(work.contractDateEnd))?.split(',')[0]);
    }

    if (!contract && !!sanDoc) {
      result = result.replace('{{contractForm}}', sanDoc.contractForm + ' от ' + ruDateFormat.format(new Date(sanDoc.contractDateStart))?.split(',')[0]).
        replace('{{contractDateEnd}}', ruDateFormat.format(new Date(sanDoc.contractDateEnd))?.split(',')[0]);
    }

    result = result.replace('{{personPhone}}', formatPhoneNumber(clinet.personPhone))

    result = !!sanDoc && !!sanDoc.documentDateStart ? result.replace('{{documentDateStart}}', ruDateFormat.format(new Date(sanDoc.documentDateStart))?.split(',')[0]) : result
    result = !!sanDoc && !!sanDoc.documentDateEnd ? result.replace('{{documentDateEnd}}', ruDateFormat.format(new Date(sanDoc.documentDateEnd))?.split(',')[0]) : result
    result = !!work && !!work.sheldServiceDate ? result.replace('{{sheldServiceDate}}', ruDateFormat.format(new Date(work.sheldServiceDate))?.split(',')[0]) : result
    result = !!work && !!work.sheldServiceNewDate ? result.replace('{{sheldServiceNewDate}}', ruDateFormat.format(new Date(work.sheldServiceNewDate))?.split(',')[0]) : result

    for (const key in clinet) {
      result = result.replace(`{{${key}}}`, clinet[key])
    }
    for (const key in contract) {
      result = result.replace(`{{${key}}}`, contract[key])
    }
    for (const key in work) {
      result = result.replace(`{{${key}}}`, work[key])
    }
    for (const key in sanDoc) {
      result = result.replace(`{{${key}}}`, sanDoc[key])
    }

    return result;
  }


  private async sendEmailsByRequest (request: UserRequest, mode: number, attachments: any[], clinet?: EkosetClient) {
    const format = (template: string) => {
      const gmtDate = new Date(request.userRequestDate);
      const mskDate = gmtDate.setHours(gmtDate.getHours() + 3);

      const dateFormated = ruDateFormat.format(mskDate);

      let startMessage = mode === 0 ? 'Мы получили Ваш заказ и приступили к его обработке:' : (mode === 1 ? 'Мы получили Ваш вопрос и приступили к его обработке:' : 'Мы получили Ваше приглашение на тендер и приступили к его обработке:')

      if (mode === 100) {
        startMessage = 'Мы получили Ваш вопрос и приступили к его обработке';
      }

      return template.
        replace('{{userRequestUser}}', request.userRequestUser).
        replace('{{userRequestDate}}', dateFormated).
        replace('{{userRequestPhone}}', request.userRequestPhone).
        replace('{{userRequestService}}', request.userRequestService).
        replace('{{userRequestText}}', request.userRequestText).
        replace('{{userRequestMail}}', request.userRequestMail).
        replace('{{startMessage}}', startMessage)
    }

    let header = mode === 0 ? 'Вы оформили заказ' : (mode === 1 ? 'Вы задали вопрос эксперту' : 'Вы пригласили нас на тендер');
    if (mode === 100) {
      header = 'Вы отправили сообщение менеджеру';
    }

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
      if (mode !== 100) {
        const ss = await sender.sendFromTemplate(backMessage, backTemplateName, format);
      }
    } catch (err) {
      logger.error(err)
    }

    if (mode === 100) {
      //clinet
      request.userRequestUser = clinet.personName;
      request.userRequestPhone = formatPhoneNumber(clinet.personPhone);
      request.userRequestMail = clinet.personEmail

      this.getDealManagerToEmails(clinet).forEach(async (iterEmal) => {
        const innerMessage: MailMessage = {
          from: `Сайт ЭКОСЕТЬ <inbox@ekoset.ru>`,
          to: iterEmal,
          subject: `Вопрос от клиента: ${clinet.personName}`,
          text: '',
          html: '',
          attachments
        }
        try {
          await sender.sendFromTemplate(innerMessage, 'user_request_manager', format);
        } catch (err) {
          logger.error(err)
        }
      })
    } else {
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
  }

  private getToEmails () {
    // return ['SergeyRyzhkov76@gmail.com'];
    return ['inbox@ekoset.ru', 'SergeyRyzhkov76@gmail.com'];
  }

  private getDealManagerToEmails (clinet: EkosetClient) {
    //  return ['SergeyRyzhkov76@gmail.com'];
    // return ['SergeyRyzhkov76@gmail.com', 'inbox@ekoset.ru'];
    return ['inbox@ekoset.ru', clinet.managerEmail, 'SergeyRyzhkov76@gmail.com'];
  }
}

const formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');

  cleaned = cleaned.substring(1)

  //Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '+7 ' + '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};
