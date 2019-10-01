import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer';

@Module({
  name: 'AppStore',
  stateFactory: true,
  namespaced: true
})
export default class AppStore extends VuexModule {
  private currentSiteSectionState: string | null = null
  private currentSiteSectionNameState: string | null = null

  @Mutation
  public setCurrentSiteSection (siteSectionSlug: string | null) {
    this.currentSiteSectionState = siteSectionSlug
  }

  @Mutation
  public setCurrentSiteSectionName (siteSectionName: string | null) {
    this.currentSiteSectionNameState = siteSectionName
  }

  @Action
  public async changeCurrentSiteSection (siteSectionSlug: string | null) {
    this.context.commit('setCurrentSiteSection', siteSectionSlug)

    if (!!siteSectionSlug) {
      const siteSectionModel = await getServiceContainer().publicEkosetService.getSiteSectionNameBySlug(siteSectionSlug)
      if (siteSectionModel) {
        this.context.commit('setCurrentSiteSectionName', siteSectionModel.siteSectionName)
      } else {
        this.context.commit('setCurrentSiteSectionName', null)
      }
    } else {
      this.context.commit('setCurrentSiteSectionName', null)
    }
  }

  public get currentSiteSection (): string | null {
    return this.currentSiteSectionState
  }

  public get currentSiteSectionName (): string | null {
    return this.currentSiteSectionNameState
  }
}
