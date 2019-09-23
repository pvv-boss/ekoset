import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

export default class FormMessageService extends BaseService {

  public async sendFormMessage (formData: FormData) {
    const result = HttpUtil.httpPostForm('user/message', formData)
    return result
  }
}
