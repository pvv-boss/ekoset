import { Store } from 'vuex'
import AuthService from './AuthService'
import ArticleService from './ArticleService';
import PublicEkosetService from './PublicEkosetService';


export class ServiceContainer {
  public authService: AuthService
  public articleService: ArticleService
  public publicEkosetService: PublicEkosetService

  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    this.publicEkosetService = new PublicEkosetService()
    this.articleService = new ArticleService()
    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}
