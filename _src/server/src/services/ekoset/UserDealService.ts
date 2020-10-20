import { BaseService, postgresWrapper } from 'rsn-express-core';

export default class UserDealService extends BaseService {
    public async getContracts () {
        return postgresWrapper.anyWhere('contract_api_view');
    }
}

