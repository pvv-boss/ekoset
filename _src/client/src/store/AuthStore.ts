import SessionUser from '@/models/user/SessionUser'
import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'

@Module({
  name: 'AuthStore',
  stateFactory: true,
  namespaced: true
})
export default class AuthStore extends VuexModule {
  private sessionUserState: SessionUser = SessionUser.anonymousUser
  private tempSocialUserState: SessionUser = SessionUser.anonymousUser

  @VuexMutation
  public setSessionUser (sessionUser: SessionUser) {
    const setVal = sessionUser ?? SessionUser.anonymousUser
    this.sessionUserState = setVal
  }

  @VuexMutation
  public setTempSocialUser (sessionUser: SessionUser) {
    const setVal = sessionUser ?? SessionUser.anonymousUser
    this.tempSocialUserState = setVal
  }

  @VuexAction
  public updateSessionUser (user: SessionUser) {
    this.context.commit('setSessionUser', user) // Вот так НЕ будет "рекурсии"
  }

  @VuexAction
  public clearTempSocialUserUser () {
    this.context.commit('setTempSocialUser', SessionUser.anonymousUser)
  }

  public get isAuthenticated () {
    return !!this.sessionUser && this.sessionUser.appUserId > 0
  }

  public get sessionUser () {
    return this.sessionUserState
  }

  public get tempSocialUser () {
    return this.tempSocialUserState
  }
}
