import { Module, VuexModule, VuexMutation, VuexAction } from 'nuxt-property-decorator'

@Module({
  name: 'AdminStore',
  stateFactory: true,
  namespaced: true
})
export default class AdminStore extends VuexModule {
  private breadCrumbListState: any[] = [];

  @VuexMutation
  public setBreadCrumbList (list: any[]) {
    this.breadCrumbListState = list;
  }

  @VuexAction
  public async changeBreadCrumbList (list: any[]) {
    this.context.commit('setBreadCrumbList', list)
  }

  public get breadCrumbList (): any[] {
    return this.breadCrumbListState;
  }
}
