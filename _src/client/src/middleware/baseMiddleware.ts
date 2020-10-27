import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BuscetStore from '@/store/BuscetStore';
import { Context } from '@nuxt/types';

const baseMiddleware = (context: Context) => {
  const appStore = getModule(AppStore, context.store)

  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  appStore.changeCurrentSiteSection(newSiteSection)


  getModule(AppStore, context.store).changeDefaultCustomPage()

  if (process.client) {
    getModule(BuscetStore, context.store).initServiceList()
  }
}

export default baseMiddleware
