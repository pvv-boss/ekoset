
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'

const needAuthorize = ({ redirect, route, store, app, next }) => {
  const isAuthRoute = !!route.meta && route.meta.find((item) => item.requiresAuth)

  if (process.client) {
    getModule(AuthStore, store).updateSessionUser()
  }

  if (process.client && isAuthRoute && !getModule(AuthStore, store).isAuthenticated) {
    return redirect('/auth/login')
  }
}

export default needAuthorize
