import BaseService from '../BaseService';
import { AppUserSession } from '@/entities/users/AppUserSession';
import TypeOrmManager from '@/utils/TypeOrmManager';
import PgUtls from '@/utils/PgUtils';
import Guid from '@/utils/Guid';
import AppConfig from '@/utils/Config';

export default class UserSessionService extends BaseService {

  public async getByToken (token: string) {
    const dbResult = await PgUtls.getOneFromDatabse('v_api_app_user_session', 'user_session_token=$1', [token]);
    return this.getOneEntityInstanceFromJson(dbResult, AppUserSession);
  }

  public async getByUser (appUserId: number) {
    return PgUtls.getAnyFromDatabase('v_api_app_user_session', null, 'app_user_id=$1', [appUserId]);
  }

  public async createSession (appUserId: number) {
    const result = new AppUserSession();
    result.appUserId = appUserId;
    result.userSessionToken = Guid.newGuid();
    result.userSessionCreatedAt = new Date(Date.now()).toUTCString();
    result.userSessionExpiredAt = new Date(Date.now() + AppConfig.authConfig.JWT.refresh.options.expiresIn * 1000).toUTCString();
    return this.save(result);
  }


  public async refreshSession (existsSession: AppUserSession) {
    existsSession.userSessionUpdatedAt = new Date(Date.now()).toUTCString();
    existsSession.userSessionExpiredAt = new Date(Date.now() + AppConfig.authConfig.JWT.refresh.options.expiresIn * 1000).toUTCString();
    return this.save(existsSession);
  }

  public async save (appUserSession: AppUserSession) {
    return TypeOrmManager.EntityManager.save(appUserSession);
  }

  public async delete (token: string) {
    const delWhere = 'user_session_token=$1';
    return PgUtls.delete('app_user_session', delWhere, [token]);
  }

  public async deleteAllByUser (appUserId: number) {
    const delWhere = 'user_session_token=$1';
    return PgUtls.delete('app_user_id', delWhere, [appUserId]);
  }

  public async lockSession (token: string) {
    const update = 'UPDATE app_user_session SET user_session_block_ind = 1 WHERE user_session_token=$1';
    return PgUtls.execNone(update, token);
  }

  public async lockAllUserSession (appUserId: number) {
    const update = 'UPDATE app_user_session SET user_session_block_ind = 1 WHERE app_user_id=$1';
    return PgUtls.execNone(update, appUserId);
  }

  public isExpired (session: AppUserSession) {
    return Date.now() - Date.parse(session.userSessionExpiredAt) > AppConfig.authConfig.JWT.refresh.options.expiresIn * 1000;
  }
}
