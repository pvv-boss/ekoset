import { BaseService } from "./services/BaseService";
import { Context } from "@nuxt/types";
import { RequestAPI } from "@/api/core/RequestAPI";

export type ConstructorOf<T extends BaseService> = new (...args: any[]) => T;

export class ContextServiceRegistry {
    private ctx: Context;
    private servicesMap = new Map<ConstructorOf<BaseService>, any>();

    public updateNuxtContext(ctx: Context) {
        this.ctx = ctx;
        for (const iterServ of this.servicesMap.values()) {
            iterServ.injectNuxtContext(ctx);
        }
    }

    public updateRequestApi(api: RequestAPI) {
        for (const iterServ of this.servicesMap.values()) {
            iterServ.apiRequest = api;
        }
    }

    public register<T extends BaseService>(ctor: ConstructorOf<T>, ...args: any[]) {
        const service = new ctor(...args);
        this.servicesMap.set(ctor, service);
        return this;
    }

    БАГА. 
    public getService<T extends BaseService>(ctor: ConstructorOf<T>): T {
        return this.servicesMap.get(ctor) || new ctor();
    }

    public exists<T extends BaseService>(ctor: new (...args: any[]) => T): boolean {
        return !!this.servicesMap.get(ctor);
    }

    public get nuxtContext() {
        return this.ctx;
    }
}

let instance: ContextServiceRegistry = new ContextServiceRegistry();

export class ServiceRegistry {
    public static get instance() {
        return instance;
    }

    public static createFreshSrvRegistry() {
        instance = new ContextServiceRegistry();
    }
}
