import * as nodemailer from 'nodemailer';
import AppConfig from './Config';
import { SentMessageInfo } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from './Logger';

export default class MailSender {

  // public static smtpOptions = {
  //   host: AppConfig.mail.host,
  //   port: AppConfig.mail.port,
  //   secure: false,
  //   pool: true,
  //   maxConnections: 1,
  //   maxMessages: 100,
  //   auth: {
  //     user: AppConfig.mail.auth.user, // generated ethereal user
  //     pass: AppConfig.mail.auth.pass // generated ethereal password
  //   }
  // };

  public static smtpOptions = AppConfig.mail;

  public static smtpTransport = nodemailer.createTransport(MailSender.smtpOptions);

  public static send (from: string, to: string, subject: string, text: string, html: string, attachments: string[]) {
    const message = {
      to,
      subject,
      text,
      html,
      from,
      attachments: []
    };

    if (!!attachments) {
      message.attachments = attachments;
    }

    const sendCallback = (err: Error | null, info: SentMessageInfo) => {
      if (!!err) {
        logger.error(err);
      }
    }


    this.smtpTransport.sendMail(message, sendCallback);
  }

  public static sendWithAttachment (from: string, to: string, subject: string, templateName: string, attachments: string[], format: (template: string) => string) {
    MailSender.internalSend(from, to, subject, templateName, attachments, format);

  }

  public static sendFromTemplate (to: string, subject: string, templateName: string, format: (template: string) => string) {
    MailSender.internalSend(AppConfig.mail.from, to, subject, templateName, null, format)
  }

  private static internalSend (from: string, to: string, subject: string, templateName: string, attachments: string[], format: (template: string) => string) {
    const filePath = path.resolve('mail', templateName + '.html');
    if (fs.existsSync(filePath)) {
      const templateContent = fs.readFileSync(filePath, 'utf8');
      const text = !!format ? format(templateContent) : templateContent;
      this.send(from, to, subject, text, text, attachments);
    }
  }



}
