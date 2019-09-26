import * as path from 'path';
import * as fs from 'fs';
import * as cuid from 'cuid';
import * as mime from 'mime-types';
import BaseService from '../BaseService';
import FormMessageData from '@/entities/FormMessageData';

export default class MediaService extends BaseService {

  public async saveSiteSectionSmallImage (siteSectionId: number, file: Express.Multer.File) {
    return await this.saveFileFromRequestBody(file, 'user', 'user');
  }


  public async saveUserMessage (formMessageData: FormMessageData, file: Express.Multer.File) {
    return await this.saveFileFromRequestBody(file, 'user', 'user');
    // return сохраняем сами данные формы
  }

  public getImageFullPathAndFileName (subDir: string, fileprefix: string, fileExt: string) {
    const pathName = path.resolve('static', 'img', subDir);
    const fileName = `${fileprefix}_${cuid()}.${fileExt}`;
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName);
    }

    return [path.resolve(pathName, fileName), fileName];
  }

  public async saveFileFromRequestBody (file: Express.Multer.File, subDir: string, fileprefix: string) {
    if (!!file && file.size > 0) {
      let fileExt = mime.extension(file.mimetype);
      fileExt = fileExt ? fileExt : 'txt';

      const pathAndName = this.getImageFullPathAndFileName(subDir, fileprefix, fileExt);

      const promise = new Promise((resolve, reject) => {
        if (pathAndName[0]) {
          fs.writeFile(pathAndName[0], file.buffer, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(pathAndName);
            }
          })
        } else {
          resolve(pathAndName);
        }
      }
      )
      return promise;
    }
    else {
      Promise.resolve(false);
    }
  }
}
