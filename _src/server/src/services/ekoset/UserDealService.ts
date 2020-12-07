import { BaseService, postgresWrapper, ServiceRegistry } from 'rsn-express-core';
import UserService from './UserService';

export default class UserDealService extends BaseService {

    public async getContracts (appUserId: number) {
        const personId = await this.getPersonId(appUserId)
        return !!personId ? await postgresWrapper.anyWhere('contract_api_view', null, 'person_id=$1', [personId]) : null;
    }

    public async getLabaratoryList (appUserId: number) {
        const personId = await this.getPersonId(appUserId)
        return !!personId ? await postgresWrapper.anyWhere('labaratory_api_view', null, 'person_id=$1', [personId]) : null;
    }

    public async getDesworkList (appUserId: number) {
        const personId = await this.getPersonId(appUserId)
        return !!personId ? await postgresWrapper.anyWhere('dezwork_api_view', null, 'person_id=$1', [personId]) : null;
    }

    private async getPersonId (appUserId: number) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(appUserId)
        return !!client ? client.personId : null
    }

    // labaratory_api_view

}

