import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options';

const baseMiddleware = (context: NuxtContext) => {
  const appStore = getModule(AppStore, context.store)

  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  appStore.changeCurrentSiteSection(newSiteSection)
  // appStore.changeCurrentCustomPage(context.params.page)
}

export default baseMiddleware
