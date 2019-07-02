import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import SessionUser from '@/models/user/SessionUser'
import { getServiceContainer } from '@/api/ServiceContainer'
import { LogonResult } from '@/models/user/LogonResult'
import LoginData from '@/models/user/LoginData'
import { RegistrationResult } from '@/models/user/RegistrationResult'
import { ChangePasswordResult } from '@/models/user/ChangePasswordResult'

@Module({
  name: 'AuthStore',
  stateFactory: true,
  namespaced: true
})
export default class AuthStore extends VuexModule {
  private sessionUserState: SessionUser = SessionUser.anonymousUser
  private tempSocialUserState: SessionUser = SessionUser.anonymousUser
  private logonResultState: LogonResult = LogonResult.makeUnknownResult()
  private registrationResultState: RegistrationResult = RegistrationResult.makeUnknownResult()
  private changePasswordResultState: ChangePasswordResult = ChangePasswordResult.makeUnknownResult()

  @Mutation
  public setSessionUser(sessionUser: SessionUser) {
    const setVal = sessionUser != null ? sessionUser : SessionUser.anonymousUser
    this.sessionUserState = setVal
  }

  @Mutation
  public setTempSocialUser(sessionUser: SessionUser) {
    const setVal = sessionUser != null ? sessionUser : SessionUser.anonymousUser
    this.tempSocialUserState = setVal
  }

  @Mutation
  public setLogonResult(logonResult: LogonResult) {
    const setVal = logonResult != null ? logonResult : LogonResult.makeUnknownResult()
    this.logonResultState = setVal
  }

  @Mutation
  public setRegistrationResult(registrationResult: RegistrationResult) {
    const setVal = registrationResult != null ? registrationResult : RegistrationResult.makeUnknownResult()
    this.registrationResultState = setVal
  }

  @Mutation
  public setChangePasswordResult(result: ChangePasswordResult) {
    const setVal = result != null ? result : ChangePasswordResult.makeUnknownResult()
    this.changePasswordResultState = setVal
  }

  @Action
  public async startLogin({ authType, loginData }) {
    this.context.commit('setLogonResult', LogonResult.makeUnknownResult())
    await getServiceContainer().authService.login(authType, loginData)
  }

  @Action
  public async endLogin(logonResult: LogonResult) {
    logonResult.endProcess = true
    this.context.commit('setLogonResult', logonResult)
    this.context.dispatch('updateSessionUser')
  }

  @Action
  public async register(registrationData: LoginData) {
    this.context.commit('setRegistrationResult', RegistrationResult.makeUnknownResult())

    const registrationResult = await getServiceContainer().authService.register(registrationData)
    registrationResult.endProcess = true

    this.context.commit('setRegistrationResult', registrationResult)

    this.context.dispatch('updateSessionUser')
    this.context.dispatch('clearTempSocialUserUser')
  }

  @Action
  public async logoff() {
    await getServiceContainer().authService.logoff()

    this.context.commit('setLogonResult', LogonResult.makeUnknownResult())
    this.context.commit('setRegistrationResult', RegistrationResult.makeUnknownResult())
    this.context.dispatch('updateSessionUser')
  }

  @Action
  public async resetPassword(email: string) {
    this.context.commit('setLogonResult', LogonResult.makeUnknownResult())
    this.context.commit('setRegistrationResult', RegistrationResult.makeUnknownResult())

    await getServiceContainer().authService.resetPassword(email)
    this.context.dispatch('updateSessionUser')
  }

  @Action
  public async changePassword({ oldPassword, newPassword }) {
    this.context.commit('setChangePasswordResult', ChangePasswordResult.makeUnknownResult())

    const result = await getServiceContainer().authService.changePassword(oldPassword, newPassword)
    result.endProcess = true
    this.context.commit('setChangePasswordResult', result)

    this.context.dispatch('updateSessionUser')
    this.context.dispatch('clearTempSocialUserUser')
  }

  @Action
  public async sendConfirmRegEmail() {
    await getServiceContainer().authService.sendConfirmRegEmail()
  }

  @Action
  public async updateSessionUser() {
    const user = getServiceContainer().authService.getSessionUser()
    this.context.commit('setSessionUser', user)
  }

  @Action
  public async clearTempSocialUserUser() {
    this.context.commit('setTempSocialUser', SessionUser.anonymousUser)
  }

  public get passportStrategyDescriptorList() {
    return getServiceContainer().authService.appConfig.enabledAuthProviders
  }

  public get isAuthenticated() {
    return this.sessionUserState && this.sessionUserState.appUserId > 0
  }

  public get sessionUser() {
    return this.sessionUserState
  }

  public get isUserNotVerified() {
    return getServiceContainer().authService.isUserNotVerified
  }

  public get tempSocialUser() {
    return this.tempSocialUserState
  }

  public get logonResult() {
    return this.logonResultState
  }

  public get registrationResult() {
    return this.registrationResultState
  }

  public get changePasswordResult() {
    return this.changePasswordResultState
  }
}
