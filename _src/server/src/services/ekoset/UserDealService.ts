import BaseService from '../BaseService';
import TypeOrmManager from '@/utils/TypeOrmManager';
import { IndividualOffer } from '@/entities/ekoset/IndividualOffer';
import slugify from '@sindresorhus/slugify';

export default class UserDealService extends BaseService {
    public async getContracts () {
        return this.getDbViewResult('contract_api_view');
    }
}

