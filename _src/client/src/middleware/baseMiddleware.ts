import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options';

const baseMiddleware = async (context: NuxtContext) => {
  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  await appStore(context.store).changeCurrentSiteSection(newSiteSection)
}

const appStore = (store) => {
  return getModule(AppStore, store)
}

export default baseMiddleware
