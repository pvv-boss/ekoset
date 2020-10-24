import { BaseService } from './BaseService'
import SessionUser from '@/models/user/SessionUser'
import { LogonResult, LogonStatus } from '@/models/user/LogonResult'
import LoginData from '@/models/user/LoginData'
import AuthStore from '@/store/AuthStore'
import { RegistrationResult, RegistrationStatus } from '@/models/user/RegistrationResult'
import { UserRoles } from '@/models/user/UserRoles'
import { ResetPasswordResult } from '@/models/user/ResetPasswordResult'
import { getModule } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

export class AuthService extends BaseService {

    public get userStore () {
        return getModule(AuthStore, this.context.store)
    }


    public getSessionUser (): SessionUser {
        return this.userStore.sessionUser
    }

    public async setSessionUserFromServer (nuxtContext: Context): Promise<SessionUser> {
        let serverUser = SessionUser.anonymousUser
        const reqUrl = 'auth/user'

        if (!!nuxtContext.req) {

            const cookie = nuxtContext.req?.headers?.cookie
            if (!!cookie) {
                const options = { headers: { 'Cookie': cookie } }
                try {
                    const response = await this.apiRequest.getJSON(reqUrl); //await HttpUtil.axiosInstance.get(reqUrl, options)
                    serverUser = response?.data?.data
                    await this.setSessionUserRoleFromServer(serverUser, options)
                    getModule(AuthStore, nuxtContext.store).updateSessionUser(serverUser)
                } catch {
                    serverUser = SessionUser.anonymousUser
                }
            }
        } else {
            serverUser = (await this.apiRequest.getJSON(reqUrl))?.data?.data
        }

        getModule(AuthStore, nuxtContext.store).updateSessionUser(serverUser)
        return serverUser
    }

    public async setSessionUserRoleFromServer (sessionUser: SessionUser, axiosOptions: any) {
        const response = await this.apiRequest.getJSON('user/get-role') //await HttpUtil.axiosInstance.get(this.buildHttRequest('user/get-role'), axiosOptions)
        sessionUser.roleIdList = response.data?.data
    }

    public isUserAuthorized () {
        const currentUser = this.getSessionUser()
        return !!currentUser && currentUser.appUserId > 0
    }

    // FIXME: Временно одну , затем надо массив
    public getUserRoles (): number {
        const roles = this.getSessionUser().roleIdList
        return !!roles ? roles : UserRoles.Guest
    }

    public userHasRole (roleId: number): boolean {
        return this.getUserRoles() === roleId;
    }

    // Логин. (логин\пароль)
    public async loginByPassword (loginData: LoginData) {
        loginData.unlinkedSocialUser = this.userStore.tempSocialUser
        const response = await this.apiRequest.post('auth/login', loginData)
        const result = response?.data?.data //await HttpUtil.httpPost(this.buildHttRequest('auth/login'), loginData)
        return this.processAuth(result)
    }

    // Логин. (через внешние источники аутентификации (соц.сети))
    public async loginByAuth () {
        // window.location.href = this.buildAuthHttRequest(authType)
    }

    // Обработка логина от AuthCallback.vue если было перенаправление с соц.сети. Токен берем из куки, которую выставил сервер
    public async loginFromCallback () {
        // const tryCookies = ''
        // try {
        //   const respObj = JSON.parse(tryCookies)
        //   this.processAuth(respObj)
        // } catch (err) {
        //   this.processAuth(LogonResult.makeFailedResult())
        // } finally {
        // }
    }

    // Логин. Подтверждение кода (например SMS)
    public async confirmLoginByCode (code: number) {
        //FIXME:вернуть вызов сервера и отправку кода!!!!!
        const response = await this.apiRequest.getJSON(`auth/confirm/code/${code}`)
        const result: LogonResult = response?.data?.data //await HttpUtil.httpGet(this.buildHttRequest(`auth/confirm/code/${code}`))
        //const result: any = { "success": true, "data": { "sessionUser": { "appUserId": 77, "appUserName": null, "appUserBlockedInd": 0, "userSnProfileId": 0, "userSnProfileType": "", "userSnProfileNick": "", "userSnProfileAvatar": "", "userSnProfileLink": "", "userSnProfileEmail": "", "reset": false, "appUserRegVerifiedInd": 1, "appUserRegDate": "2020-08-12T09:20:18.000Z", "roleIdList": 1 }, "logonStatus": 0, "exception": null, "message": "Вход выполнен успешно" }, "message": "OK", "status": 200 }

        const roleId = (await this.apiRequest.getJSON('user/get-role'))?.data?.data //await HttpUtil.httpGet(this.buildHttRequest('user/get-role'))
        result.sessionUser.roleIdList = roleId

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.userStore.updateSessionUser(result.sessionUser)
        return result
    }

    // Регистрация
    public async register (registrationData: LoginData) {
        registrationData.unlinkedSocialUser = this.userStore.tempSocialUser
        const response = await this.apiRequest.post('user/signup', registrationData)
        const result: RegistrationResult = response?.data?.data //await HttpUtil.httpPost(this.buildHttRequest('user/signup'), registrationData)

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.userStore.updateSessionUser(result.sessionUser)
        return result
    }

    // Регистрация. Подтверждение кода (например SMS)
    public async confirmRegistrationByCode (code: number, roleId: number) {
        const response = await this.apiRequest.getJSON(`user/registration/confirm/code/${code}`)

        const result: RegistrationResult = response?.data?.data //await HttpUtil.httpGet(this.buildHttRequest(`user/registration/confirm/code/${code}`))

        if (result.registrationStatus === RegistrationStatus.OK) {
            await this.apiRequest.post('user/set-role', { appUserId: result.sessionUser.appUserId, roleId })
            //await HttpUtil.httpPost(this.buildHttRequest('user/set-role'), { appUserId: result.sessionUser.appUserId, roleId })
            result.sessionUser.roleIdList = roleId
        }

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.userStore.updateSessionUser(result.sessionUser)
        return result
    }

    // Смена пароля
    public async changePassword (newPassword: string) {
        return this.apiRequest.post(this.buildChangePasswordRequest(), { password: newPassword })
        // return HttpUtil.httpPost(this.buildChangePasswordRequest(), { password: newPassword })
    }

    // Восстановление пароля
    public async resetPassword (login: string) {
        const response = await this.apiRequest.post(this.buildResetPasswordRequest(), { login })
        //HttpUtil.httpPost(this.buildResetPasswordRequest(), { login })
        const result: ResetPasswordResult = response?.data?.data
        return result
    }

    public async confirmResetPasswordByCode (code: number) {
        const response = await this.apiRequest.getJSON(`user/password/reset/confirm/${code}`)
        //HttpUtil.httpPost(this.buildResetPasswordRequest(), { login })
        const result: ResetPasswordResult = response?.data?.data
        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.userStore.updateSessionUser(result.sessionUser)
        return result
    }

    // Выйти
    public async logoff () {
        await this.apiRequest.getJSON('auth/logout')
        //await HttpUtil.httpGet(this.buildHttRequest('auth/logout'))
        this.userStore.clearTempSocialUserUser()
        this.userStore.updateSessionUser(SessionUser.anonymousUser)
    }

    // Отправка письма для потдтверждения email
    public async sendConfirmRegEmail () {
        const currentUser = this.getSessionUser()
        if (currentUser && currentUser.appUserId > 0) {
            await this.apiRequest.post(this.buildSendConfirmRegRequest(), { useremail: currentUser.appUserEmail });

            //await HttpUtil.httpPost(this.buildSendConfirmRegRequest(), { useremail: currentUser.appUserEmail })
        }
    }

    // Если не была подтверждена регистрация и срок подтверждения не истек и пора напомнить
    public get isUserNotVerified () {
        const currentUser = this.getSessionUser()
        if (currentUser && currentUser.appUserId !== 0) {
            return currentUser.appUserRegVerifiedInd !== 1
        }
        return false
    }

    private async processAuth (logonResult: LogonResult) {

        // Если была аутентификация через соц.сеть, но юзверя в базе нет, временно сохраняем его
        this.userStore.clearTempSocialUserUser()
        if (!!logonResult && logonResult.logonStatus === LogonStatus.UserNotFoundButSocialNetworkAuthOK) {
            this.userStore.setTempSocialUser(this.getSessionUser())
        }

        // Выставим в сторе сессионого пользователя (какой именно решает бэк)
        this.userStore.updateSessionUser(!!logonResult.sessionUser ? logonResult.sessionUser : SessionUser.anonymousUser)
        return logonResult
    }

    private buildResetPasswordRequest (): string {
        return this.internalBuildHttRequest('user', 'password/reset')
    }

    private buildChangePasswordRequest (): string {
        return this.internalBuildHttRequest('auth', 'password/change')
    }

    private buildSendConfirmRegRequest (): string {
        return this.internalBuildHttRequest('user', 'register/sendconfirm')
    }

}
