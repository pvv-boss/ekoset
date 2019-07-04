import { Store } from 'vuex'
import AuthService from './AuthService'
import NewsService from './NewsService';


export class ServiceContainer {
  public authService: AuthService
  public newsService: NewsService

  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    this.newsService = new NewsService()
    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}
