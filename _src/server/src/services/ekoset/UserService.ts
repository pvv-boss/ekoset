import EkosetClient from '@/entities/ekoset/EkosetClient';
import { BaseService, ConfigManager, DatabaseConfig, postgresWrapper, TypeOrmManager } from 'rsn-express-core';
import { Connection, createConnection, getManager } from 'typeorm';

export default class UserService extends BaseService {

    private connection: Connection

    public async getClientByAppUserId (id: number): Promise<EkosetClient> {
        return postgresWrapper.oneOrNoneWhere('client_api_view', 'app_user_id=$1', [id]);
    }

    public async save (client: EkosetClient) {
        await this.initUserConnection();

        client.personDateCh = new Date().toUTCString();

        const newDate = new Date(client.personBirthday)
        if (newDate instanceof Date && !isNaN(newDate.getTime())) {
            client.personBirthday = newDate.toUTCString()
        }

        return this.connection.manager.save(client)
    }

    public async initUserConnection () {

        if (!this.connection) {
            const dbConfig = { ...ConfigManager.instance.getOptionsAsPlain("DatabaseConfig") };
            dbConfig.schema = "brc_ekoset_private"
            dbConfig.entities = [EkosetClient]
            this.connection = await createConnection(dbConfig);
        }

    }

}