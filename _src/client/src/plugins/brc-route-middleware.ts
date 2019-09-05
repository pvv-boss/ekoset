import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options'

export default (context: NuxtContext) => {
  const newSiteSection = context.params.siteSection ? context.params.siteSection : null

  // tslint:disable-next-line:no-console
  console.log('Plugin ' + newSiteSection)

  getModule(AppStore, context.store).changeCurrentSiteSection(newSiteSection)
}
