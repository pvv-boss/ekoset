import BaseService from './BaseService';
import HttpUtil from '../utils/HttpUtil'
import Contract from '@/models/deal/Contract';

export default class UserDealService extends BaseService {

    public async getContracts () {
        return HttpUtil.httpGet(this.buildHttRequest('user/deal/contracts'))
    }

    public async getClientsByContracts (contracts: Contract[]) {
        const clients: any[] = [{ clientId: 0, clientName: 'Все контрагенты' }]
        if (!!contracts) {
            contracts.forEach((iterContract: Contract) => {
                const client = {
                    clientId: iterContract.clientId,
                    clientName: iterContract.clientName
                }
                if (clients.findIndex((iter) => { return iter.clientId === iterContract.clientId }) === -1) {
                    clients.push(client)
                }
            })
        }

        clients.sort((a, b) => {
            if (b.clientId === 0) {
                return 1
            }
            let c = Intl.Collator('ru', { 'sensitivity': 'variant' });
            return a.clientId === 0 ? -1 : c.compare(a.clientName, b.clientName)
            // return a.clientId === 0 ? -1 : a.clientName.toUpperCase().localeCompare(b.clientName.toUpperCase(), "ru")
        })
        return clients
    }

    public async getContractsByClientId (contracts: Contract[], clientId: number) {
        const filteredContracts: Contract[] = []

        contracts.forEach((iterContract) => {
            if (iterContract.clientId === clientId) {
                filteredContracts.push(iterContract)
            }
        })

        return filteredContracts
    }

    public async filterContracts (contracts: Contract[], isValid: boolean, isEnded: boolean, clientId = 0, sortMode = 0, sortOrder = true) {
        const filtered = contracts.filter((iterContract: Contract) => {
            let isOk = false

            if (isValid && isEnded && clientId === 0) {
                return true
            }

            if (!isValid && !isEnded) {
                return false
            }

            if (clientId > 0 && isValid && isEnded && iterContract.clientId === clientId) {
                return true
            }

            if (clientId > 0 && iterContract.clientId !== clientId) {
                return false
            }

            if (isValid && !isEnded) {
                isOk = iterContract.contractStatus === 1 || iterContract.contractStatus === 0
            }

            if (!isValid && isEnded) {
                isOk = iterContract.contractStatus === 2
            }

            return isOk
        })
        if (sortMode === 0) {
            return filtered.sort((a, b) => {
                return sortOrder ? (a.contractDateEnd > b.contractDateEnd ? 1 : -1) : (a.contractDateEnd < b.contractDateEnd ? 1 : -1)
            })
        } else {
            let c = Intl.Collator('ru', { 'sensitivity': 'variant' });
            return filtered.sort((a, b) => {
                return sortOrder ? c.compare(a.clientName, b.clientName) : c.compare(a.clientName, b.clientName) * -1
            })
        }

    }
}
