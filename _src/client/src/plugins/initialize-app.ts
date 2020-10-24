
import { Context, Plugin } from '@nuxt/types'
import { ServiceRegistry } from '@/ServiceRegistry';
import { Inject } from '@nuxt/types/app';
import AxiosRequest from '@/api/core/AxiosRequest';
import AppConfig from '@/AppConfig';
import ArticleService from '@/services/ArticleService';
import { AuthService } from '@/services/AuthService';
import BusinessServiceService from '@/services/BusinessServiceService';
import DynamicComponentsService from '@/services/DynamicComponentsService';
import IndividualOfferService from '@/services/IndividualOfferService';
import MediaService from '@/services/MediaService';
import PublicEkosetService from '@/services/PublicEkosetService';
import TopMenuService from '@/services/TopMenuService';
import UserDealService from '@/services/UserDealService';
// import FetchRequest from '@/api/core/FetchRequest';


declare module 'vue/types/vue' {
  interface Vue {
    $serviceRegistry: ServiceRegistry
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$serviceRegistry inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $serviceRegistry: ServiceRegistry
  }
  // nuxtContext.$serviceRegistry
  interface Context {
    $serviceRegistry: ServiceRegistry
  }
}

declare module 'vuex/types/index' {
  // this.$serviceRegistry inside Vuex stores
  interface Store<S> {
    $serviceRegistry (): ServiceRegistry
  }
}

const initializeApp: Plugin = (ctx: Context, inject: Inject) => {

  inject('serviceRegistry', ServiceRegistry.instance)

  // if (process.server) {
  ServiceRegistry.instance.register(ArticleService);

  ServiceRegistry.instance.register(AuthService);
  ServiceRegistry.instance.register(BusinessServiceService);
  ServiceRegistry.instance.register(DynamicComponentsService);
  ServiceRegistry.instance.register(IndividualOfferService);
  ServiceRegistry.instance.register(MediaService);
  ServiceRegistry.instance.register(PublicEkosetService);
  ServiceRegistry.instance.register(TopMenuService);
  ServiceRegistry.instance.register(UserDealService);

  const api = new AxiosRequest({}, AppConfig.endPoint);
  ServiceRegistry.instance.updateApiRequest(api);
  ServiceRegistry.instance.updateNuxtContext(ctx);
  //}
}

export default initializeApp;