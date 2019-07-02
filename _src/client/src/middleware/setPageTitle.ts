import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

const setPageTitle = ({ route, store }) => {
  const pageTitle = !!route.meta && route.meta.find((item) => item.title)
  if (pageTitle) {
    appStore(store).changetPageTitle(pageTitle.title)
  }
}

const appStore = (store) => {
  return getModule(AppStore, store)
}

export default setPageTitle
