import AuthStore from '@/store/AuthStore'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { NuxtContext } from 'vue/types/options'

export default (context: NuxtContext) => {
  const newSiteSection = context.params.siteSection ? context.params.siteSection : null
  getModule(AppStore, context.store).changeCurrentSiteSection(newSiteSection)
  getModule(AppStore, context.store).changeDefaultCustomPage()

  if (process.client) {
    getModule(AuthStore, context.store).updateSessionUser()
  }

  const isAuthRoute = !!context.route.meta && context.route.meta.find((item) => item.requiresAuth)
  if (process.client && isAuthRoute && !getModule(AuthStore, context.store).isAuthenticated) {
    return context.redirect('/auth/login')
  }
}
