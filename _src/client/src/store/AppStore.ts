import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'AppStore',
  stateFactory: true,
  namespaced: true
})
export default class AppStore extends VuexModule {
  private currentSiteSectionState: string | null = null

  @Mutation
  public setCurrentSiteSection (siteSectionSlug: string | null) {
    this.currentSiteSectionState = siteSectionSlug
  }

  @Action
  public async changeCurrentSiteSection (siteSectionSlug: string | null) {
    this.context.commit('setCurrentSiteSection', siteSectionSlug)
  }

  public get currentSiteSection (): string | null {
    return this.currentSiteSectionState
  }
}
