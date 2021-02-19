import Work from "@/entities/deal/Work";
import DesWork from "@/entities/ekoset/DesWork";
import EkosetClient from "@/entities/ekoset/EkosetClient";
import EkosetManager from "@/entities/ekoset/EkosetManager";
import {
    AppUser,
    BaseService,
    ConfigManager,
    DatabaseConfig,
    Guid,
    postgresWrapper,
    RegistrationResult,
    RegistrationService,
    RegistrationStatus,
    ServiceRegistry,
    SessionUser,
    TypeOrmManager,
} from "rsn-express-core";
import { Connection, createConnection, getManager } from "typeorm";
import { UserRequestService } from "./UserRequestService";

export default class UserService extends BaseService {
    private connection: Connection;

    public async getClientByAppUserId(id: number): Promise<EkosetClient> {
        return postgresWrapper.oneOrNoneWhere("client_api_view", "app_user_id=$1", [id]);
    }

    public async updateAppUserRoles(sessionUser: SessionUser) {
        const appUser = new AppUser();
        appUser.appUserId = sessionUser.appUserId;
        appUser.appUserPermissions = sessionUser.appUserPermissions;
        return TypeOrmManager.EntityManager.save(appUser);
    }

    public async save(client: EkosetClient) {
        await this.initUserConnection();

        client.personDateCh = new Date().toUTCString();

        const newDate = new Date(client.personBirthday);
        if (newDate instanceof Date && !isNaN(newDate.getTime())) {
            client.personBirthday = newDate.toUTCString();
        } else {
            client.personBirthday = null;
        }

        return this.connection.manager.save(client);
    }

    public async activateEkosetClient(clientId: number) {
        let result = new RegistrationResult();
        try {
            await this.initUserConnection();
            const client = await this.connection.manager.findOne(EkosetClient, clientId);

            if (!!client) {
                const password = Guid.newGuid().substring(0, 13);
                result = await ServiceRegistry.instance
                    .getService(RegistrationService)
                    .registerUser(client.personEmail, password, null);

                if (result.registrationStatus === RegistrationStatus.OK) {
                    client.appUserId = result.sessionUser.appUserId;
                    await this.connection.manager.save(client);
                    ServiceRegistry.instance.getService(UserRequestService).sendActivateUserMail(client, password);
                }
            }
        } catch (err) {
            result.makeInvalid(err);
        }
        return result;
    }

    public async activateEkosetAdmin(managerId: number) {
        let result = new RegistrationResult();
        try {
            await this.initUserConnection();
            const manager = await this.connection.manager.findOne(EkosetManager, managerId);

            if (!!manager) {
                const password = Guid.newGuid().substring(0, 13);
                result = await ServiceRegistry.instance
                    .getService(RegistrationService)
                    .registerUser(manager.managerEmail, password, null);

                if (result.registrationStatus === RegistrationStatus.OK) {
                    manager.appUserId = result.sessionUser.appUserId;
                    await this.connection.manager.save(manager);

                    postgresWrapper.execNone("UPDATE APP_USER SET app_user_admin_ind = TRUE WHERE app_user_ID = $1", [
                        manager.appUserId,
                    ]);

                    ServiceRegistry.instance.getService(UserRequestService).sendActivateUserMail(manager, password);
                }
            }
        } catch (err) {
            result.makeInvalid(err);
        }
        return result;
    }

    public async saveDeswork(work: DesWork) {
        await this.initUserConnection();
        return await this.connection.manager.save(work);
    }

    public async deactivateEkosetClient(appUserId: number) {
        return await postgresWrapper.delete("app_user", "app_user_id=$1", [appUserId]);
    }

    public async deactivateEkosetAdmin(appUserId: number) {
        return await postgresWrapper.delete("app_user", "app_user_id=$1", [appUserId]);
    }

    public async addNewAdminManager(manager: EkosetManager) {
        await this.initUserConnection();
        await this.connection.manager.save(manager);
    }

    public async initUserConnection() {
        if (!this.connection) {
            const dbConfig = { ...ConfigManager.instance.getOptionsAsPlain("DatabaseConfig") };
            dbConfig.schema = "brc_ekoset_private";
            dbConfig.entities = [EkosetClient, EkosetManager, DesWork];
            this.connection = await createConnection(dbConfig);
        }
    }
}
