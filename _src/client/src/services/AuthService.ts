import { BaseService } from './BaseService'
import SessionUser from '@/models/user/SessionUser'
import { LogonResult, LogonStatus } from '@/models/user/LogonResult'
import LoginData from '@/models/user/LoginData'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'nuxt-property-decorator'
import { ResetPasswordResult } from '@/models/user/ResetPasswordResult'
import { RegistrationResult } from '@/models/user/RegistrationResult'

export class AuthService extends BaseService {

    public get authStore () {
        return getModule(AuthStore, this.context.store)
    }


    public getSessionUser (): SessionUser {
        return this.authStore.sessionUser
    }

    public async setSessionUserFromServer (): Promise<SessionUser> {
        let serverUser = SessionUser.anonymousUser
        const reqUrl = 'auth/user'

        if (!!this.context.req) {
            const cookie = this.context.req?.headers?.cookie
            if (!!cookie) {
                const options = { headers: { 'Cookie': cookie } }
                try {
                    const response = await this.apiRequest.getJSON(reqUrl, options);
                    serverUser = response?.data?.data
                    this.authStore.updateSessionUser(serverUser)
                } catch {
                    serverUser = SessionUser.anonymousUser
                }
            }
        } else {
            serverUser = (await this.apiRequest.getJSON(reqUrl))?.data?.data
        }
        this.authStore.updateSessionUser(serverUser)
        return serverUser
    }

    public isUserAuthorized () {
        const currentUser = this.getSessionUser()
        return !!currentUser && currentUser.appUserId > 0
    }

    // Логин. (логин\пароль)
    public async loginByPassword (loginData: LoginData) {
        loginData.unlinkedSocialUser = this.authStore.tempSocialUser
        const response = await this.apiRequest.post('auth/login', {}, loginData)
        const result = response?.data?.data
        return this.processAuth(result)
    }


    //  Регистрация
    public async register (registrationData: LoginData): Promise<RegistrationResult> {
        registrationData.unlinkedSocialUser = this.authStore.tempSocialUser
        const response = await this.apiRequest.post('user/signup', {}, registrationData)
        const result: RegistrationResult = response?.data?.data
        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.authStore.updateSessionUser(result.sessionUser)
        return result
    }


    // Смена пароля
    public async changePassword (newPassword: string) {
        return this.apiRequest.post('auth/password/change', {}, { password: newPassword })
    }

    // Восстановление пароля
    public async resetPassword (login: string) {
        const response = await this.apiRequest.post('user/password/reset', {}, { login })
        const result: ResetPasswordResult = response?.data?.data
        return result
    }

    public async confirmResetPasswordByCode (code: number) {
        const response = await this.apiRequest.getJSON(`user/password/reset/confirm/${code}`)
        const result: ResetPasswordResult = response?.data?.data
        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.authStore.updateSessionUser(result.sessionUser)
        return result
    }

    // Выйти
    public async logoff () {
        await this.apiRequest.getJSON('auth/logout')
        this.authStore.clearTempSocialUserUser()
        this.authStore.updateSessionUser(SessionUser.anonymousUser)
    }

    // Отправка письма для потдтверждения email
    public async sendConfirmRegEmail () {
        const currentUser = this.getSessionUser()
        if (currentUser && currentUser.appUserId > 0) {
            await this.apiRequest.post('user/register/sendconfirm', {}, { useremail: currentUser.appUserEmail });
        }
    }

    private async processAuth (logonResult: LogonResult) {
        // Если была аутентификация через соц.сеть, но юзверя в базе нет, временно сохраняем его
        this.authStore.clearTempSocialUserUser()
        if (!!logonResult && logonResult.logonStatus === LogonStatus.UserNotFoundButSocialNetworkAuthOK) {
            this.authStore.setTempSocialUser(this.getSessionUser())
        }

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.authStore.updateSessionUser(!!logonResult.sessionUser ? logonResult.sessionUser : SessionUser.anonymousUser)
        return logonResult
    }

}
