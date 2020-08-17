import BaseService from './BaseService';
import HttpUtil from '../utils/HttpUtil'

export default class UserDealService extends BaseService {

    public async getContracts () {
        return HttpUtil.httpGet(this.buildHttRequest('user/deal/contracts'))
    }
}
