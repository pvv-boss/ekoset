import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService';
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'
import Cookies from 'js-cookie';
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem';

@Module({
  name: 'BuscetStore',
  stateFactory: true,
  namespaced: true
})
export default class BuscetStore extends VuexModule {
  private isStoreInitialized = false
  private cookieBusctetStoreName = 'ekoset_busket_store'
  private addedServiceListState: BusinessServiceLocalStorageItem[] = []

  @Mutation
  public addServiceMutation (businessService: BusinessServiceLocalStorageItem) {
    this.addedServiceListState.push(businessService)
  }

  @Mutation
  public removeServiceMutation (businessService: BusinessServiceLocalStorageItem) {

    const index = findAddedServiceIndex(this.addedServiceListState, businessService)
    this.addedServiceListState.splice(index, 1)

    Cookies.set(this.cookieBusctetStoreName, this.addedServiceListState, { expires: 10 })

  }

  @Mutation
  public setStoreInitialized () {
    this.isStoreInitialized = true
  }

  @Action
  public async initServiceList () {
    if (!this.storeInitialized) {
      const cookStr = Cookies.get(this.cookieBusctetStoreName)
      if (!!cookStr) {
        try {
          const serviceArray = JSON.parse(cookStr)
          if (!!serviceArray) {
            serviceArray.forEach((element) => {
              this.context.commit('addServiceMutation', element)
            });
          }
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.log(err)
        } finally {
          this.context.commit('setStoreInitialized')
        }
      }
    }
  }

  @Action
  public async addService (businessService: BusinessServiceLocalStorageItem) {
    // const index = this.addedServiceList.findIndex((iterElement) => {
    //   return iterElement.serviceName === businessService.serviceName && iterElement.serviceUrl === businessService.serviceUrl
    // })
    if (findAddedServiceIndex(this.addedServiceList, businessService) === -1) {
      this.context.commit('addServiceMutation', businessService)
      Cookies.set(this.cookieBusctetStoreName, this.addedServiceList, { expires: 10 })
      BrcDialogPlugin.showNotify(BrcDialogType.Info, 'ЭКОСЕТЬ', 'Добавлено в корзину. <br> Можете отправить заказ', 1500, { position: BrcDialogPosition.Central })
    } else {
      BrcDialogPlugin.showNotify(BrcDialogType.Info, 'ЭКОСЕТЬ', 'Вы уже добавили это в корзину', 1500, { position: BrcDialogPosition.Central })
    }
  }


  @Action
  public async removeService (businessService: BusinessServiceLocalStorageItem) {
    this.context.commit('removeServiceMutation', businessService)
  }

  public get addedServiceList (): BusinessServiceLocalStorageItem[] {
    return this.addedServiceListState
  }

  public get addedServiceListAsText () {
    const names: string[] = []
    if (!!this.addedServiceList) {
      this.addedServiceList.forEach((iterServ) => {
        names.push(iterServ.serviceName)
      })
    }
    return names.length > 0 ? names.join(';') : 'не выбрано'
  }

  public get addedServiceCount (): number {
    return this.addedServiceListState.length
  }

  public get storeInitialized () {
    return this.isStoreInitialized
  }

}

const findAddedServiceIndex = (addedServiceList: BusinessServiceLocalStorageItem[], businessService: BusinessServiceLocalStorageItem) => {
  const index = addedServiceList.findIndex((iterElement) => {
    return iterElement.serviceName === businessService.serviceName && iterElement.serviceUrl === businessService.serviceUrl
  })
  return index
}

