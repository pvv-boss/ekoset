import { Store } from 'vuex'
import AuthService from './AuthService'
import ArticleService from './ArticleService';
import PublicEkosetService from './PublicEkosetService';
import BusinessServiceService from './BusinessServiceService';
import IndividualOfferService from './IndividualOfferService';
import SeoMetaService from './SeoMetaService';
import FormMessageService from './FormMessageService';


export class ServiceContainer {
  public authService: AuthService
  public articleService: ArticleService
  public publicEkosetService: PublicEkosetService
  public businessServiceService: BusinessServiceService
  public individualOfferService: IndividualOfferService
  public seoMetaService: SeoMetaService
  public formMessageService: FormMessageService

  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    this.publicEkosetService = new PublicEkosetService()
    this.businessServiceService = new BusinessServiceService()
    this.individualOfferService = new IndividualOfferService()
    this.seoMetaService = new SeoMetaService()
    this.formMessageService = new FormMessageService()

    this.articleService = new ArticleService()
    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}
