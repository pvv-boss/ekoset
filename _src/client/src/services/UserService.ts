import Contract from '@/models/deal/Contract';
import EkosetClient from '@/models/EkosetClient';
import { BaseService } from './BaseService';

export default class UserService extends BaseService {

    public async saveClient (client: EkosetClient) {
        const result = await this.apiRequest.post('personal/user', {}, client)
    }

    public async continionContract (contract: Contract) {
        const result = await this.apiRequest.post('deals/contract/message', {}, contract)
    }
}