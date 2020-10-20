import { Store } from 'vuex'
import AuthService from './AuthService'
import ArticleService from './ArticleService';
import PublicEkosetService from './PublicEkosetService';
import BusinessServiceService from './BusinessServiceService';
import IndividualOfferService from './IndividualOfferService';
import MediaService from './MediaService';
import DynamicComponentsService from './DynamicComponentsService';
import TopMenuService from './TopMenuService';
import UserDealService from './UserDealService';

class ServiceContainer {
  public authService: AuthService
  public articleService: ArticleService
  public publicEkosetService: PublicEkosetService
  public businessServiceService: BusinessServiceService
  public individualOfferService: IndividualOfferService
  public mediaService: MediaService
  public dynamicComponentsService: DynamicComponentsService
  public topMenuService: TopMenuService
  public userDealService: UserDealService

  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    this.publicEkosetService = new PublicEkosetService()
    this.businessServiceService = new BusinessServiceService()
    this.individualOfferService = new IndividualOfferService()
    this.articleService = new ArticleService()
    this.mediaService = new MediaService()
    this.dynamicComponentsService = new DynamicComponentsService(store)
    this.topMenuService = new TopMenuService()
    this.userDealService = new UserDealService()

    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}

