
import { Store } from 'vuex'
import { NuxtContext } from 'vue/types/options'
import { getModule, Module, VuexModule, Action } from 'vuex-module-decorators'
import AppStore from './AppStore'

export const actions = {
  nuxtServerInit () {

    // tslint:disable-next-line:no-console
    console.log('nuxtServerInit')

    // getModule(AppStore, store).changeDefaultCustomPage()
  }
}

// @Module({
//   name: 'Index',
//   stateFactory: true,
//   namespaced: true
// })
// export class Index extends VuexModule {

//   @Action
//   public async nuxtServerInit () {
//     // tslint:disable-next-line:no-console
//     console.log('nuxtServerInit')
//   }
// }

export const strict = false
