import EkosetClient from '@/models/EkosetClient'
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

  private ekosetClientState: EkosetClient = new EkosetClient()

  @VuexMutation
  private setSessionUser (sessionUser: SessionUser) {
    const setVal = sessionUser ?? SessionUser.anonymousUser
    this.sessionUserState = setVal
  }

  @VuexMutation
  private setTempSocialUser (sessionUser: SessionUser) {
    const setVal = sessionUser ?? SessionUser.anonymousUser
    this.tempSocialUserState = setVal
  }

  @VuexMutation
  private setEkosetClient (ekosetClient: EkosetClient) {
    this.ekosetClientState = ekosetClient
  }

  @VuexAction
  public updateSessionUser (user: SessionUser) {
    this.setSessionUser(user)
  }


  @VuexAction
  public clearTempSocialUserUser () {
    this.setTempSocialUser(SessionUser.anonymousUser)
  }

  @VuexAction
  public updateEkosetClient (ekosetClient: EkosetClient) {
    this.setEkosetClient(ekosetClient)
  }

  public get isAuthenticated () {
    return !!this.sessionUser && this.sessionUser.appUserId > 0
  }

  public get sessionUser () {
    return this.sessionUserState
  }

  public get ekosetClient () {
    return this.ekosetClientState
  }

  public get tempSocialUser () {
    return this.tempSocialUserState
  }
}
