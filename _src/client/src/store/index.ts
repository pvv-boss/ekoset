
import { Store } from 'vuex'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'
import AppStore from './AppStore'

export const actions = {
  nuxtServerInit (store: Store<any>, context: NuxtContext) {
    getModule(AppStore, store).changeDefaultCustomPage()
  }
}

export const strict = false
