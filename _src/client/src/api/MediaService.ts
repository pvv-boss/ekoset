import HttpUtil from '../utils/HttpUtil'
import BaseService from './BaseService'

export default class MediaService extends BaseService {

  public async saveSiteSectionImage (siteSectionId: number, formData: FormData, isBigImage: boolean) {
    return HttpUtil.httpPostForm(`admin/panel/sitesection/${siteSectionId}/image/${isBigImage ? 'big' : 'small'}`, formData)
  }
}
