import Contract from "@/models/deal/Contract";
import SanDoc from "@/models/deal/SanDoc";
import Work from "@/models/deal/Work";
import { BaseService } from "./BaseService";

export default class UserDealService extends BaseService {
    public async getContracts() {
        const res = await this.apiRequest.getJSON("user/deal/contracts");
        return res.data?.data;
    }

    public async getLabaratoryList() {
        const res = await this.apiRequest.getJSON("user/deal/labaratory");
        return res.data?.data;
    }

    public async getDesworkList() {
        const res = await this.apiRequest.getJSON("user/deal/deswork");
        return res.data?.data;
    }

    public async getDesworkById(id: number) {
        return this.getOneOrEmpty(Work, `user/deal/deswork/${id}`);
    }

    public async saveDeswork(dezWork: Work) {
        return await this.apiRequest.put(`user/deal/deswork`, {}, dezWork);
    }

    public async getSanDocsList() {
        const res = await this.apiRequest.getJSON("user/deal/sandocs");
        return res.data?.data;
    }

    public async getClients() {
        const res = await this.apiRequest.getJSON("admin/staff/clients");
        return res.data?.data;
    }

    public async getManagers() {
        const res = await this.apiRequest.getJSON("admin/staff/managers");
        return res.data?.data;
    }

    public async saveManagerFoto(id: number, formData: FormData) {
        return this.apiRequest.postForm(`admin/staff/manager/foto/${id}`, {}, formData);
    }

    public async getClientsByContracts(contracts: Contract[]) {
        const clients: any[] = [{ clientId: 0, clientName: "Все контрагенты" }];
        if (contracts) {
            contracts.forEach((iterContract: Contract) => {
                const client = {
                    clientId: iterContract.clientId,
                    clientName: iterContract.clientName,
                };
                if (
                    clients.findIndex((iter) => {
                        return iter.clientId === iterContract.clientId;
                    }) === -1
                ) {
                    clients.push(client);
                }
            });
        }

        clients.sort((a, b) => {
            if (b.clientId === 0) {
                return 1;
            }
            const c = Intl.Collator("ru", { sensitivity: "variant" });
            return a.clientId === 0 ? -1 : c.compare(a.clientName, b.clientName);
            // return a.clientId === 0 ? -1 : a.clientName.toUpperCase().localeCompare(b.clientName.toUpperCase(), "ru")
        });
        return clients;
    }

    public async getContractsByClientId(contracts: Contract[], clientId: number) {
        const filteredContracts: Contract[] = [];

        contracts.forEach((iterContract) => {
            if (iterContract.clientId === clientId) {
                filteredContracts.push(iterContract);
            }
        });

        return filteredContracts;
    }

    public async filterContracts(
        contracts: Contract[],
        isValid: boolean,
        isEnded: boolean,
        clientId = 0,
        sortMode = 0,
        sortOrder = true
    ) {
        const filtered = contracts.filter((iterContract: Contract) => {
            let isOk = false;

            if (isValid && isEnded && clientId === 0) {
                return true;
            }

            if (!isValid && !isEnded) {
                return false;
            }

            if (clientId > 0 && isValid && isEnded && iterContract.clientId === clientId) {
                return true;
            }

            if (clientId > 0 && iterContract.clientId !== clientId) {
                return false;
            }

            if (isValid && !isEnded) {
                isOk = iterContract.contractStatus === 1 || iterContract.contractStatus === 0;
            }

            if (!isValid && isEnded) {
                isOk = iterContract.contractStatus === 2;
            }

            return isOk;
        });

        if (sortMode === 0) {
            return filtered.sort((a, b) => {
                return sortOrder
                    ? a.contractDateEnd > b.contractDateEnd
                        ? 1
                        : -1
                    : a.contractDateEnd < b.contractDateEnd
                    ? 1
                    : -1;
            });
        } else {
            const c = Intl.Collator("ru", { sensitivity: "variant" });
            return filtered.sort((a, b) => {
                return sortOrder ? c.compare(a.clientName, b.clientName) : c.compare(a.clientName, b.clientName) * -1;
            });
        }
    }

    public async getContractsForWorks() {
        return this.getContracts();
    }

    public async filterWork(works: Work[], isEndFilter, isPlanFilter, contractId, sortMode = 0, sortOrder = true) {
        if (!!works) {
            const filtered = works.filter((iterContract: Work) => {
                let isOk = false;

                if (isPlanFilter && isEndFilter && contractId === 0) {
                    return true;
                }

                if (!isPlanFilter && !isEndFilter) {
                    return false;
                }

                if (contractId > 0 && isPlanFilter && isEndFilter && iterContract.contractId === contractId) {
                    return true;
                }

                if (contractId > 0 && iterContract.contractId !== contractId) {
                    return false;
                }

                if (isPlanFilter && !isEndFilter) {
                    isOk = iterContract.sheldServicePlanInd === 1;
                }

                if (!isPlanFilter && isEndFilter) {
                    isOk = iterContract.sheldServicePlanInd === 0;
                }

                return isOk;
            });

            if (sortMode === 0) {
                return filtered.sort((a, b) => {
                    return sortOrder
                        ? a.sheldServiceDate > b.sheldServiceDate
                            ? 1
                            : -1
                        : a.sheldServiceDate < b.sheldServiceDate
                        ? 1
                        : -1;
                });
            } else {
                const c = Intl.Collator("ru", { sensitivity: "variant" });
                return filtered.sort((a, b) => {
                    return sortOrder
                        ? c.compare(a.sheldServiceName, b.sheldServiceName)
                        : c.compare(a.sheldServiceName, b.sheldServiceName) * -1;
                });
            }
        } else {
            return works;
        }
    }

    public async filterSanDocs(works: SanDoc[], isEndFilter, isPlanFilter, contractId, sortMode = 0, sortOrder = true) {
        if (!!works) {
            const filtered = works.filter((iterContract: SanDoc) => {
                let isOk = false;

                if (isPlanFilter && isEndFilter && contractId === 0) {
                    return true;
                }

                if (!isPlanFilter && !isEndFilter) {
                    return false;
                }

                if (contractId > 0 && isPlanFilter && isEndFilter && iterContract.contractId === contractId) {
                    return true;
                }

                if (contractId > 0 && iterContract.contractId !== contractId) {
                    return false;
                }

                if (!isPlanFilter && isEndFilter) {
                    isOk = iterContract.docDateStatus === 1 || iterContract.docDateStatus === 0;
                }

                if (isPlanFilter && !isEndFilter) {
                    isOk = iterContract.docDateStatus === 2;
                }

                return isOk;
            });

            if (sortMode === 0) {
                return filtered.sort((a, b) => {
                    return sortOrder
                        ? a.contractDateEnd > b.contractDateEnd
                            ? 1
                            : -1
                        : a.contractDateEnd < b.contractDateEnd
                        ? 1
                        : -1;
                });
            } else {
                const c = Intl.Collator("ru", { sensitivity: "variant" });
                return filtered.sort((a, b) => {
                    return sortOrder ? c.compare(a.documentName, b.documentName) : c.compare(a.documentName, b.documentName) * -1;
                });
            }
        } else {
            return works;
        }
    }

    public async getUsersRequests() {
        const res = await this.apiRequest.getJSON("admin/user/requests");
        return res.data?.data;
    }
}
