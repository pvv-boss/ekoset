import AuthStore from '@/store/AuthStore'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options'

export default (context: NuxtContext) => {
  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  getModule(AppStore, context.store).changeCurrentSiteSection(newSiteSection)
  // getModule(AppStore, context.store).changeCurrentCustomPage(context.params.page)

  getModule(AppStore, context.store).changeDefaultCustomPage()

  const isAuthRoute = !!context.route.meta && context.route.meta.find((item) => item.requiresAuth)
  if (isAuthRoute && !userStore(context.store).isAuthenticated) {
    return context.redirect('/auth/login')
  }
}


const userStore = (store) => {
  return getModule(AuthStore, store)
}
