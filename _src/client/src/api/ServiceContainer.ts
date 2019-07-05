import { Store } from 'vuex'
import AuthService from './AuthService'
import ArticleService from './ArticleService';


export class ServiceContainer {
  public authService: AuthService
  public articleService: ArticleService

  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    this.articleService = new ArticleService()
    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}
