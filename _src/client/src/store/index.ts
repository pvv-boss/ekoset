
import { Store } from 'vuex'
import { NuxtContext } from 'vue/types/options'
import { getModule, Module, VuexModule, Action } from 'vuex-module-decorators'
import AppStore from './AppStore'
import { getServiceContainer } from '@/api/ServiceContainer'
import AuthStore from './AuthStore'

export const actions = {
  nuxtServerInit (vuexContext: Store<any>) {
    // getModule(AppStore, vuexContext).changeDefaultCustomPage()
  }
}


export const strict = false
