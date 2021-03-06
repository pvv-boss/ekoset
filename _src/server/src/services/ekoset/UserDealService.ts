import { BaseService, postgresWrapper, ServiceRegistry } from "rsn-express-core";
import UserService from "./UserService";

export default class UserDealService extends BaseService {
    public async getContracts(appUserId: number, isPersonId = false) {
        const personId = isPersonId ? appUserId : await this.getPersonId(appUserId);
        return !!personId ? await postgresWrapper.anyWhere("contract_api_view", null, "person_id=$1", [personId]) : null;
    }

    public async getLabaratoryList(appUserId: number, isPersonId = false) {
        const personId = isPersonId ? appUserId : await this.getPersonId(appUserId);
        return !!personId ? await postgresWrapper.anyWhere("labaratory_api_view", null, "person_id=$1", [personId]) : null;
    }

    public async getDesworkList(appUserId: number, isPersonId = false) {
        const personId = isPersonId ? appUserId : await this.getPersonId(appUserId);
        return !!personId ? await postgresWrapper.anyWhere("dezwork_api_view", null, "person_id=$1", [personId]) : null;
    }

    public async getDesworkById(id: number) {
        return await postgresWrapper.anyWhere("dezwork_api_view", null, "sheld_service_id=$1", [id]);
    }

    public async getSanDocsList(appUserId: number, isPersonId = false) {
        const personId = isPersonId ? appUserId : await this.getPersonId(appUserId);
        return !!personId ? await postgresWrapper.anyWhere("sandoc_api_view", null, "person_id=$1", [personId]) : null;
    }

    public async getManagers() {
        return postgresWrapper.anyWhere("manager_api_view");
    }

    public async getClients() {
        return postgresWrapper.anyWhere("admin_client_api_view");
    }

    private async getPersonId(appUserId: number) {
        const client = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(appUserId);
        return !!client ? client.personId : null;
    }

    // labaratory_api_view
}
