import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService';
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'

@Module({
  name: 'BuscetStore',
  stateFactory: true,
  namespaced: true
})
export default class BuscetStore extends VuexModule {
  private addedServiceListState: BusinessService[] = []

  @Mutation
  public addServiceMutation (businessService: BusinessService) {
    this.addedServiceListState.push(businessService)
  }

  @Mutation
  public removeServiceMutation (businessService: BusinessService) {
    const index = this.addedServiceListState.indexOf(businessService)
    this.addedServiceListState.splice(index)
  }


  @Action
  public async addService (businessService: BusinessService) {
    if (this.addedServiceList.indexOf(businessService) === -1) {
      this.context.commit('addServiceMutation', businessService)
      BrcDialogPlugin.showNotify(BrcDialogType.Info, '', '<br>Добавлено в корзину. Можете отправить заказ <br> <br> ', 1500, { position: BrcDialogPosition.Central })
    }
  }

  @Action
  public async removeService (businessService: BusinessService) {
    this.context.commit('removeServiceMutation', businessService)
  }

  public get addedServiceList (): BusinessService[] {
    return this.addedServiceListState
  }

  public get addedServiceCount (): number {
    return this.addedServiceListState.length
  }

}
