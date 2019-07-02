import { Store } from 'vuex'
import AuthService from './AuthService'


export class ServiceContainer {
  public authService: AuthService
  public initialized = false

  public async initialize (store: Store<any>) {
    this.authService = new AuthService(store)
    await this.authService.initConfig()
    this.initialized = true

  }
}

const serviceContainerInstance = new ServiceContainer()

export const getServiceContainer = () => {
  return serviceContainerInstance
}
