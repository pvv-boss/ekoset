import Vue, { ComponentOptions } from 'vue'
import { Store } from 'vuex'
import VueRouter, { Route } from 'vue-router'
import { Middleware } from '@nuxt/types';


declare module 'vue/types/options' {

  export interface NuxtContext {
    app: NuxtAppOptions
    /**
     * @deprecated Use process.client instead
    */
    isClient: boolean
    /**
     * @deprecated Use process.server instead
    */
    isServer: boolean
    /**
     * @deprecated Use process.static instead
    */
    isStatic: boolean
    isDev: boolean
    isHMR: boolean
    route: Route
    store: Store<any>
    params: Route['params']
    payload: any
    query: Route['query']
    redirect (status: number, path: string, query?: Route['query']): void
    redirect (path: string, query?: Route['query']): void
  }

  // export type Middleware = string | ((ctx: NuxtContext, cb: Function) => Promise<void> | void)

  export interface NuxtLoading extends Vue {
    fail?(): NuxtLoading
    finish (): NuxtLoading
    increase?(num: number): NuxtLoading
    pause?(): NuxtLoading
    start (): NuxtLoading
  }

  export interface ComponentOptions<V extends Vue> {
    // This adds the `middleware` property to the existing `vue/types/options/ComponentOptions` type
    middleware?: Middleware | Middleware[]
  }

  export interface NuxtAppOptions extends ComponentOptions<Vue> {
    [key: string]: any

  }


}
