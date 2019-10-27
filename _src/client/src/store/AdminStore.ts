import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer';

@Module({
  name: 'AdminStore',
  stateFactory: true,
  namespaced: true
})
export default class AdminStore extends VuexModule {
  private breadCrumbListState: any[] = [];

  @Mutation
  public setBreadCrumbList (list: any[]) {
    this.breadCrumbListState = list;
  }

  @Action
  public async changeBreadCrumbList (list: any[]) {
    this.context.commit('setBreadCrumbList', list)
  }

  public get breadCrumbList (): any[] {
    return this.breadCrumbListState;
  }
}
