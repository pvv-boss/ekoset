import { BaseService, postgresWrapper, ServiceRegistry } from 'rsn-express-core';
import UserService from './UserService';

export default class UserDealService extends BaseService {

    public async getContracts (appUserId: number) {
        const clientId = await this.getPersonId(appUserId)
        return !!clientId ? await postgresWrapper.anyWhere('contract_api_view', null, 'person_id=$1', [clientId]) : null;
    }


    private async getPersonId (appUserId: number) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(appUserId)
        return !!client ? client.personId : null
    }

}

