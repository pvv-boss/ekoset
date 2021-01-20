import { BaseService } from './BaseService'
import SessionUser from '@/models/user/SessionUser'
import { LogonResult, LogonStatus } from '@/models/user/LogonResult'
import LoginData from '@/models/user/LoginData'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'nuxt-property-decorator'
import { ResetPasswordResult } from '@/models/user/ResetPasswordResult'
import { AppConfig } from '@/AppConfig'
import EkosetClient from '@/models/EkosetClient'

//FIXME: Все завернуть в try catch
export class AuthService extends BaseService {

    public get authStore () {
        return getModule(AuthStore, this.context.store)
    }

    public updateAccessToken () {
        const token = this.getAccessToken();
        if (!token) {
            this.authStore.updateSessionUser(SessionUser.anonymousUser)
        }
    }

    public getAccessToken (): string | null {
        return this.context.app.$cookies.get(AppConfig.authCookieName, { parseJSON: false })
    }

    public getSessionUser (): SessionUser {
        return this.authStore.sessionUser
    }

    public get isUserAuthorized () {
        const currentUser = this.getSessionUser()
        return !!currentUser && currentUser.appUserId > 0
    }

    public async setSessionUserFromServer (): Promise<SessionUser> {
        let serverUser = SessionUser.anonymousUser
        const reqUrl = 'auth/user'

        const authCookie = this.context.app.$cookies.get(AppConfig.authCookieName, { parseJSON: false })

        if (!!authCookie) {
            const options = { headers: { 'Cookie': `${AppConfig.authCookieName}=${authCookie}` } }
            try {
                const response = await this.apiRequest.getJSON(reqUrl, options);
                serverUser = response?.data?.data
                this.authStore.updateSessionUser(serverUser)
                await this.updateEkosetClient(options)
            } catch (errr) {
                serverUser = SessionUser.anonymousUser
            }
        }

        this.authStore.updateSessionUser(serverUser)

        return serverUser
    }

    public async updateEkosetClient (options?: any) {
        const su = this.getSessionUser();
        if (!!su && su.appUserId > 0) {
            const client = await this.getOneOrEmpty(EkosetClient, `personal/user/${su.appUserId}`, options)
            if (!!client) {
                client.personBirthday = !!client.personBirthday && client.personBirthday.split('T').length > 0 ? client.personBirthday.split('T')[0] : ''
                this.authStore.updateEkosetClient(client)
            }
        }
    }

    // Логин. (логин\пароль)
    public async loginByPassword (loginData: LoginData) {
        loginData.unlinkedSocialUser = this.authStore.tempSocialUser
        const response = await this.apiRequest.post('auth/login', {}, loginData)
        const result = response?.data?.data
        return this.processAuth(result)
    }

    //  Регистрация
    // public async register (registrationData: LoginData): Promise<RegistrationResult> {
    //     // registrationData.unlinkedSocialUser = this.authStore.tempSocialUser
    //     // const response = await this.apiRequest.post('user/signup', {}, registrationData)
    //     // const result: RegistrationResult = response?.data?.data
    //     // // Выставим в сторе сессионого пользователя (какой именно решает бэк)
    //     // this.authStore.updateSessionUser(result.sessionUser)
    //     // return result
    // }

    // Смена пароля
    public async changePassword (newPassword: string) {
        const response = await this.apiRequest.post('auth/password/change', {}, { password: newPassword })
        const result: LogonResult = response?.data?.data
        return result
    }

    // Восстановление пароля
    public async resetPassword (login: string) {
        const response = await this.apiRequest.post('user/password/reset', {}, { login })
        const result: ResetPasswordResult = response?.data?.data
        return result
    }

    public async confirmResetPasswordByCode (code: string) {
        const response = await this.apiRequest.getJSON(`user/password/reset/confirm/${code}`)
        const result: ResetPasswordResult = response?.data?.data
        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.authStore.updateSessionUser(result.sessionUser)
        return result
    }

    // После смены пароля (после восстановления)
    public async onPasswordChangedAfterConfirmByCode (appUser: SessionUser) {
        this.authStore.updateSessionUser(appUser)
        await this.updateEkosetClient()
    }

    // Выйти
    public async logoff () {
        await this.apiRequest.getJSON('auth/logout')
        this.authStore.clearTempSocialUserUser()
        this.authStore.updateSessionUser(SessionUser.anonymousUser)
        this.updateAccessToken()
    }


    private async processAuth (logonResult: LogonResult) {
        // Если была аутентификация через соц.сеть, но юзверя в базе нет, временно сохраняем его
        this.authStore.clearTempSocialUserUser()
        if (!!logonResult && logonResult.logonStatus === LogonStatus.UserNotFoundButSocialNetworkAuthOK) {
            //  this.authStore.setTempSocialUser(this.getSessionUser())
        }

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.authStore.updateSessionUser(!!logonResult.sessionUser ? logonResult.sessionUser : SessionUser.anonymousUser)

        await this.updateEkosetClient()

        return logonResult
    }

}
