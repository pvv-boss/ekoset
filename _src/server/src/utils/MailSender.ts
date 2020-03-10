import * as nodemailer from 'nodemailer';
import AppConfig from './Config';
import { SentMessageInfo } from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from './Logger';

export default class MailSender {

  public static smtpOptions = {
    host: AppConfig.mail.host,
    port: AppConfig.mail.port,
    pool: true,
    maxConnections: 1,
    maxMessages: 100
  };

  public static smtpTransport = nodemailer.createTransport(MailSender.smtpOptions);

  public static send (from: string, to: string, subject: string, text: string, html: string, attachmentFilePath: string, attachFileName: string) {
    const message = {
      to,
      subject,
      text,
      html,
      from,
      attachments: []
    };

    if (!!attachmentFilePath) {
      message.attachments = [
        {
          filename: attachFileName ? attachFileName : path.basename(attachmentFilePath),
          path: attachmentFilePath
        }]
    }

    const sendCallback = (err: Error | null, info: SentMessageInfo) => {
      const rr = err;
      const infoinfo = info;

      if (!!err) {
        logger.error(err);
      }
    }


    this.smtpTransport.sendMail(message, sendCallback);
  }

  public static sendWithAttachment (from: string, to: string, subject: string, templateName: string, attachmentFilePath: string, attachFileName: string, format: (template: string) => string) {
    MailSender.internalSend(from, to, subject, templateName, attachmentFilePath, attachFileName, format);

  }

  public static sendFromTemplate (to: string, subject: string, templateName: string, format: (template: string) => string) {
    MailSender.internalSend(AppConfig.mail.from, to, subject, templateName, null, null, format)
  }

  private static internalSend (from: string, to: string, subject: string, templateName: string, attachmentFilePath: string, attachFileName: string, format: (template: string) => string) {
    const filePath = path.resolve('mail', templateName + '.html');
    if (fs.existsSync(filePath)) {
      const templateContent = fs.readFileSync(filePath, 'utf8');
      const text = !!format ? format(templateContent) : templateContent;
      this.send(from, to, subject, text, text, attachmentFilePath, attachFileName);
    }
  }
}
