import Contract from '@/models/deal/Contract';
import SanDoc from '@/models/deal/SanDoc';
import Work from '@/models/deal/Work';
import EkosetClient from '@/models/EkosetClient';
import { BaseService } from './BaseService';

export default class UserService extends BaseService {

    public async saveClient (client: EkosetClient) {
        const result = await this.apiRequest.post('personal/user', {}, client)
    }

    public async continionContract (contract: Contract) {
        const result = await this.apiRequest.post('deals/contract/message', {}, contract)
    }

    public async continionSanDoc (sanDoc: SanDoc) {
        const result = await this.apiRequest.post('deals/sandoc/message', {}, sanDoc)
    }

    public async continionWork (work: Work) {
        const result = await this.apiRequest.post('deals/work/message', {}, work)
    }

}
