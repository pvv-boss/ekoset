
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'

const needAuthorize = ({ redirect, route, store, app }) => {
  const isAuthRoute = !!route.meta && route.meta.find((item) => item.requiresAuth)

  if (isAuthRoute && !userStore(store).isAuthenticated) {
    return redirect('/auth/login')
  }
}

const userStore = (store) => {
  return getModule(AuthStore, store)
}

export default needAuthorize
