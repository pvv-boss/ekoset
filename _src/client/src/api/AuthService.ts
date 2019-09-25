import HttpUtil from '@/utils/HttpUtil'
import PassportStrategyDescriptor from '@/models/user/PassportStrategyDescriptor'
import decodeJwt from 'jwt-decode'
import Cookies from 'js-cookie'
import SessionUser from '@/models/user/SessionUser'
import { LogonResult, LogonStatus } from '@/models/user/LogonResult'
import LoginData from '@/models/user/LoginData'
import { getModule } from 'vuex-module-decorators'
import AuthStore from '@/store/AuthStore'
import { Store } from 'vuex'
import BaseService from './BaseService'

export default class AuthService extends BaseService {
  private store: Store<any>
  private userStore: AuthStore
  private accessTokenStorageKey = this.getConfig().cookieName + '_jwt_store'

  constructor (store: Store<any>) {
    super()
    this.store = store
    this.userStore = getModule(AuthStore, this.store)
  }

  // AccessToken запишется в HttpUtil через хидер или через callback от соц.сети this.loginFromCallback
  public async login (authType: string, loginData: LoginData) {
    // Войти через form
    if (authType === PassportStrategyDescriptor.LOCAL) {
      loginData.unlinkedSocialUser = this.userStore.tempSocialUser
      const result = await HttpUtil.httpPost(this.buildAuthHttRequest(PassportStrategyDescriptor.LOCAL), loginData)
      const accessToken = this.getAccessToken()
      this.processAuth(result, accessToken)
    } else {
      // Войти через внешние источники аутентификации (соц.сети)
      window.location.href = this.buildAuthHttRequest(authType)
    }
  }

  // Обработка логина от AuthCallback.vue если было перенаправление с соц.сети. Токен берем из куки, которую выставил сервер
  public async loginFromCallback () {
    const tryCookies = Cookies.get(this.getConfig().cookieName)
    if (tryCookies) {
      try {
        const respObj = JSON.parse(tryCookies)
        this.processAuth(respObj.payload, respObj.accessToken)
      } catch (err) {
        this.processAuth(LogonResult.makeFailedResult(), undefined)
      }
    }
    Cookies.remove(this.getConfig().cookieName)
  }

  // Регистрация
  // AccessToken запишется в HttpUtil через хидер
  public async register (registrationData: LoginData) {
    registrationData.unlinkedSocialUser = this.userStore.tempSocialUser
    return HttpUtil.httpPost(this.buildRegisterNewUserRequest(), registrationData)
  }

  // Смена пароля
  public async changePassword (oldPassword: string, newPassword: string) {
    return HttpUtil.httpPost(this.buildChangePasswordRequest(), { password: oldPassword, newpassword: newPassword })
  }

  // Восстановление пароля
  public async resetPassword (email: string) {
    await HttpUtil.httpPost(this.buildResetPasswordRequest(), { useremail: email })
  }

  // Выйти
  public async logoff () {
    await HttpUtil.httpGet(this.buildLogoffRequest())
    this.userStore.clearTempSocialUserUser()
    this.clearAccessToken()
  }

  // Отправка письма для потдтверждения email
  public async sendConfirmRegEmail () {
    const currentUser = this.getSessionUser()
    if (currentUser && currentUser.appUserId > 0) {
      await HttpUtil.httpPost(this.buildSendConfirmRegRequest(), { useremail: currentUser.appUserEmail })
    }
  }

  public getSessionUser (): SessionUser {
    let user = SessionUser.anonymousUser
    const token = this.getAccessToken()
    if (token && token !== undefined) {
      try {
        const payload = decodeJwt(token, { header: false })
        if (payload) {
          user = payload as any
          this.deleteClaimProperties(user)
        }
      } catch (err) {
        this.clearAccessToken()
      }
    }
    return user
  }

  public getAccessToken () {
    return Cookies.get(this.accessTokenStorageKey)
  }

  public setAccessToken (accessToken: string | undefined) {
    if (accessToken === null || !accessToken || accessToken === 'undefined' || accessToken === undefined) {
      this.clearAccessToken()
    } else {
      Cookies.set(this.accessTokenStorageKey, accessToken, { expires: 10 })
      const newUser = this.getSessionUser()
      if (this.userStore.sessionUser.appUserId !== newUser.appUserId) {
        this.userStore.updateSessionUser()
      }
    }
  }

  // Если не был подтвержден email и срок подтверждения не истек и пора напомнить
  public get isUserNotVerified () {
    const currentUser = this.getSessionUser()
    if (currentUser && currentUser.appUserId !== 0) {
      return currentUser.appUserRegVerifiedInd !== 1
    }
    return false
  }

  private clearAccessToken () {
    Cookies.remove(this.accessTokenStorageKey)
    this.userStore.updateSessionUser()
  }

  private processAuth (logonResult: LogonResult, accessToken: string | undefined) {
    this.setAccessToken(accessToken)
    if (!logonResult) {
      logonResult = LogonResult.makeFailedResult()
    }

    // Если была аутентификация через соц.сеть, но юзверя в базе нет, временно сохраняем его
    this.userStore.clearTempSocialUserUser()
    if (logonResult && logonResult.logonStatus === LogonStatus.UserNotFoundButSocialNetworkAuthOK) {
      this.userStore.setTempSocialUser(this.getSessionUser())
      this.clearAccessToken()
    }
    this.userStore.endLogin(logonResult)
  }

  private buildAuthHttRequest (authType: string): string {
    return this.internalBuildHttRequest('auth', authType)
  }

  private buildRegisterNewUserRequest (): string {
    return this.internalBuildHttRequest('user', 'register')
  }

  private buildLogoffRequest (): string {
    return this.internalBuildHttRequest('user', 'logoff')
  }

  private buildResetPasswordRequest (): string {
    return this.internalBuildHttRequest('user', 'password/reset')
  }

  private buildChangePasswordRequest (): string {
    return this.internalBuildHttRequest('user', 'password/change')
  }

  private buildSendConfirmRegRequest (): string {
    return this.internalBuildHttRequest('user', 'register/sendconfirm')
  }

  private deleteClaimProperties (payload: any) {
    delete payload.exp
    delete payload.jti
    delete payload.nbf
    delete payload.aud
    delete payload.sub
    delete payload.iss
    delete payload.iat
  }
}
