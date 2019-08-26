import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options';

const baseMiddleware = (context: NuxtContext) => {
  const newSiteSection = context.params.activity ? context.params.activity : null
  appStore(context.store).changeCurrentSiteSection(newSiteSection)
}

const appStore = (store) => {
  return getModule(AppStore, store)
}

export default baseMiddleware
