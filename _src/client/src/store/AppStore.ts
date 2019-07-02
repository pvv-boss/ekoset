import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({
  name: 'AppStore',
  stateFactory: true,
  namespaced: true
})
export default class AppStore extends VuexModule {
  private pageTitleState: string = 'Эколайн'

  @Mutation
  public setPageTitle (title: string) {
    this.pageTitleState = title
  }

  @Action
  public async changetPageTitle (title: string) {
    this.context.commit('setPageTitle', title)
  }

  public get pageTitle (): string {
    return this.pageTitleState
  }
}
