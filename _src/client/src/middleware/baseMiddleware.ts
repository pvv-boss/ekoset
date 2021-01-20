import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { Context } from '@nuxt/types';

const baseMiddleware = (context: Context) => {
  const appStore = getModule(AppStore, context.store)

  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  appStore.changeCurrentSiteSection(newSiteSection)

  // appStore.changeDefaultCustomPage()

}

export default baseMiddleware
