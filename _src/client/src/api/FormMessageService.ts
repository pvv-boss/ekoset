import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

export default class FormMessageService extends BaseService {

  public async sendFormMessage (formData: FormData) {
    // tslint:disable-next-line:no-console
    console.log(formData)
    const result = HttpUtil.httpPostForm('user/message', formData)
    return result
  }

  public async testFile (file: string) {
    // tslint:disable-next-line:no-console
    console.log(file)
  }
}
