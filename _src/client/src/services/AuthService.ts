import { BaseService } from "./BaseService";
import SessionUser from "@/models/user/SessionUser";
import { LogonResult, LogonStatus } from "@/models/user/LogonResult";
import LoginData from "@/models/user/LoginData";
import AuthStore from "@/store/AuthStore";
import { getModule } from "nuxt-property-decorator";
import { ResetPasswordResult } from "@/models/user/ResetPasswordResult";
import { AppConfig } from "@/AppConfig";
import EkosetClient from "@/models/EkosetClient";
import { AdminMenuSection, AdminMenuSectionPermissionsManager } from "@/models/AdminMenuSectionPermissionsManager";

//FIXME: Все завернуть в try catch
export class AuthService extends BaseService {
    public get authStore() {
        return getModule(AuthStore, this.context.store);
    }

    public getAccessToken(): string | null {
        return this.authStore.accessToken;
    }

    public updateAccessToken(accessToken: string | null) {
        this.authStore.updateAccessToken(accessToken);
        if (!accessToken) {
            this.authStore.updateSessionUser(SessionUser.anonymousUser);
        }
    }

    public clearAccessToken() {
        this.updateAccessToken(null);
        this.authStore.updateSessionUser(SessionUser.anonymousUser);
    }

    public getSessionUser(): SessionUser {
        return this.authStore.sessionUser;
    }

    public updateSessionUser(sessionUser: SessionUser) {
        sessionUser.menuPermissions = AdminMenuSectionPermissionsManager.fromString(sessionUser.appUserPermissions);
        this.authStore.updateSessionUser(sessionUser);
        if (!sessionUser || sessionUser.appUserId === 0) {
            this.clearAccessToken();
        }
    }

    public get isUserAuthorized() {
        const currentUser = this.getSessionUser();
        return !!currentUser && currentUser.appUserId > 0 && !!this.getAccessToken() && currentUser.appUserBlockedInd === 0;
    }

    public get isUserAdmin() {
        const currentUser = this.getSessionUser();
        return this.isUserAuthorized && currentUser.appUserAdminInd;
    }

    public async trySetSessionUserFromServer(): Promise<void> {
        const reqUrl = "auth/me";

        const authCookie = this.context.app.$cookies.get(AppConfig.authCookieName, { parseJSON: false });

        if (!!authCookie) {
            const options = { headers: { Cookie: `${AppConfig.authCookieName}=${authCookie}` } };
            try {
                const response = await this.apiRequest.getJSON(reqUrl, options);
                const logonResult = response?.data?.data;
                this.updateSessionUser(!!logonResult.sessionUser ? logonResult.sessionUser : SessionUser.anonymousUser);
                await this.updateEkosetClientOrManager();
            } catch (errr) {
                console.log("trySetSessionUserFromServer = " + errr);
            }
        }
    }

    public async updateEkosetClientOrManager() {
        const su = this.getSessionUser();
        if (!!su && su.appUserId > 0) {
            if (this.isUserAdmin) {
                this.authStore.updateEkosetClient(null);
            } else {
                const client = await this.getOneOrEmpty(EkosetClient, `personal/user/${su.appUserId}`);
                if (!!client) {
                    client.personBirthday =
                        !!client.personBirthday && client.personBirthday.split("T").length > 0
                            ? client.personBirthday.split("T")[0]
                            : "";
                    this.authStore.updateEkosetClient(client);
                }
            }
        }
    }

    // Логин. (логин\пароль)
    public async loginByPassword(loginData: LoginData) {
        loginData.unlinkedSocialUser = this.authStore.tempSocialUser;
        const response = await this.apiRequest.post("auth/login", {}, loginData);
        const logonResult = response?.data?.data;

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.updateSessionUser(!!logonResult.sessionUser ? logonResult.sessionUser : SessionUser.anonymousUser);
        await this.updateEkosetClientOrManager();

        return logonResult;
    }

    // Смена пароля
    public async changePassword(newPassword: string) {
        const response = await this.apiRequest.post("auth/password/change", {}, { password: newPassword });
        const result: LogonResult = response?.data?.data;
        return result;
    }

    // Восстановление пароля
    public async resetPassword(login: string) {
        const response = await this.apiRequest.post("user/password/reset", {}, { login });
        const result: ResetPasswordResult = response?.data?.data;
        return result;
    }

    public async confirmResetPasswordByCode(code: string) {
        const response = await this.apiRequest.getJSON(`user/password/reset/confirm/${code}`);
        const result: ResetPasswordResult = response?.data?.data;
        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.updateSessionUser(result.sessionUser);
        return result;
    }

    // После смены пароля (после восстановления)
    public async onPasswordChangedAfterConfirmByCode(appUser: SessionUser) {
        this.updateSessionUser(appUser);
        await this.updateEkosetClientOrManager();
    }

    // Выйти
    public async logoff() {
        await this.apiRequest.getJSON("auth/logout");
        this.updateSessionUser(SessionUser.anonymousUser);
        this.clearAccessToken();
    }
}
