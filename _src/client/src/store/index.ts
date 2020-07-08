
import { Store } from 'vuex'
import { NuxtContext } from 'vue/types/options'
import { getModule, Module, VuexModule, Action } from 'vuex-module-decorators'
import AppStore from './AppStore'
import { getServiceContainer } from '@/api/ServiceContainer'
import BuscetStore from './BuscetStore'

export const actions = {
  nuxtServerInit (store: Store<any>) {
    //    getModule(BuscetStore, store).initServiceList()
  }
}


export const strict = false
