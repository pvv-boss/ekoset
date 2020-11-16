import { BaseService } from './services/BaseService'
import { Context } from '@nuxt/types'
import { AbstractApiRequest } from "@/api/core/AbstractApiRequest";

export type ConstructorOf<T extends BaseService> = new (...args: any[]) => T;

export class ContextServiceRegistry {
  private servicesMap = new Map<ConstructorOf<BaseService>, any>()


  public updateNuxtContext (ctx: Context) {
    for (const iterServ of this.servicesMap.values()) {
      iterServ.injectNuxtContext(ctx)
    }
  }

  public updateApiRequest (api: AbstractApiRequest) {
    for (const iterServ of this.servicesMap.values()) {
      iterServ.apiRequest = api;
    }
  }

  public register<T extends BaseService> (ctor: ConstructorOf<T>, ...args: any[]) {
    const service = new ctor(...args)
    this.servicesMap.set(ctor, service)
    return this
  }

  public getService<T extends BaseService> (ctor: ConstructorOf<T>): T {
    return this.servicesMap.get(ctor) || new ctor()
  }

  public exists<T extends BaseService> (ctor: new (...args: any[]) => T): boolean {
    return !!this.getService(ctor)
  }
}

let instance: ContextServiceRegistry = new ContextServiceRegistry()

export class ServiceRegistry {
  public static get instance () {
    return instance
  }
}

export const createNewServiceRegistryFromPlugin = () => {
  instance = new ContextServiceRegistry()
}



