import * as path from 'path';
import * as fs from 'fs';
import * as cuid from 'cuid';
import BaseService from '../BaseService';

export default class MediaService extends BaseService {

  public getImageFullPathAndFileName (subDir: string, fileprefix: string, fileExt: string) {
    const pathName = path.resolve('static', 'img', subDir);
    const fileName = `${fileprefix}_${cuid()}.${fileExt}`;
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName);
    }

    return [path.resolve(pathName, fileName), fileName];
  }

  public saveImageFromRequestBody (file: Express.Multer.File) {

  }
}
