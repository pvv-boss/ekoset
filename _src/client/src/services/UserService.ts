import Contract from "@/models/deal/Contract";
import SanDoc from "@/models/deal/SanDoc";
import Work from "@/models/deal/Work";
import EkosetClient from "@/models/EkosetClient";
import EkosetManager from "@/models/EkosetManager";
import { BaseService } from "./BaseService";

export default class UserService extends BaseService {
    public async getEkosetClient(id: number) {
        return await this.getOneOrEmpty(EkosetClient, `admin/user/person/${id}`);
    }

    public async saveClient(client: EkosetClient) {
        const result = await this.apiRequest.post("personal/user", {}, client);
    }

    public async addNewManager(manager: EkosetManager) {
        const result = await this.apiRequest.post("admin/user/admin/manager", {}, manager);
    }

    public async continionContract(contract: Contract) {
        const result = await this.apiRequest.post("deals/contract/message", {}, contract);
    }

    public async continionSanDoc(sanDoc: SanDoc) {
        const result = await this.apiRequest.post("deals/sandoc/message", {}, sanDoc);
    }

    public async continionWork(work: Work) {
        const result = await this.apiRequest.post("deals/work/message", {}, work);
    }

    public async activateEkosetClient(clientId: number) {
        const result = await this.apiRequest.post(`admin/user/client/activate`, {}, { id: clientId });
    }

    public async deactivateEkosetClient(appUserId: number) {
        const result = await this.apiRequest.delete(`admin/user/client/${appUserId}/deactivate`);
    }

    public async activateEkosetManager(managerId: number) {
        const result = await this.apiRequest.post(`admin/user/admin/activate`, {}, { id: managerId });
    }

    public async deactivateEkosetManager(appUserId: number) {
        const result = await this.apiRequest.delete(`admin/user/admin/${appUserId}/deactivate`);
    }

    public async getContracts(appUserId: number) {
        const res = await this.apiRequest.getJSON(`admin/deal/${appUserId}/contracts`);
        return res.data?.data;
    }

    public async getLabaratoryList(appUserId: number) {
        const res = await this.apiRequest.getJSON(`admin/deal/${appUserId}/labaratory`);
        return res.data?.data;
    }

    public async getDesworkList(appUserId: number) {
        const res = await this.apiRequest.getJSON(`admin/deal/${appUserId}/deswork`);
        return res.data?.data;
    }

    public async getSanDocsList(appUserId: number) {
        const res = await this.apiRequest.getJSON(`admin/deal/${appUserId}/sandocs`);
        return res.data?.data;
    }

    public async getСontragentList(appUserId: number) {
        const res = await this.apiRequest.getJSON(`admin/deal/${appUserId}/contragents`);
        return res.data?.data;
    }
}
