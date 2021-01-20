import { Context } from "@nuxt/types";
import { Location } from "vue-router";
import { RequestAPI } from "@/api/core/RequestAPI";
import AxiosRequest from '@/api/core/AxiosRequest';
import { plainToClass } from 'class-transformer';

export class BaseService {
  private api: RequestAPI;
  protected ctx: Context;

  public injectNuxtContext (ctx: Context) {
    this.ctx = ctx;
  }

  public set apiRequest (api: RequestAPI) {
    this.api = api;
  }

  public get apiRequest () {
    if (!this.api) {
      this.api = new AxiosRequest()
    }
    return this.api;
  }

  public get context () {
    return this.ctx
  }

  public async getOneOrEmpty<T> (ctor: { new(): T }, url: string, options?: any): Promise<T> {
    try {
      const response = await this.apiRequest.getJSON(url, options);
      let result = response?.data?.data;
      result = !!result ? (Array.isArray(result) && result.length > 0 ? result[0] : result) : null;
      return !!result ? plainToClass(ctor, result) : new ctor();
    } catch {
      return new ctor();
    }
  }


  public async getArrayOrEmpty<T> (ctor: { new(): T }, url: string): Promise<T[]> {
    try {
      const response = await this.apiRequest.getJSON(url);
      const data = response?.data?.data;
      return !!data ? plainToClass(ctor, Array.from(data)) : [];
    } catch {
      return [];
    }
  }

  public notAuthRedirect () {
    this.safePushRoute({ name: "auth-login", params: { mode: "login" } });
  }

  public notFoundRedirect ({ status, statusText }) {
    this.safePushRoute({ name: "not-found", params: { status, statusText } });
  }

  public errorRedirect ({ status, statusText, message }) {
    this.safePushRoute({
      name: "error-page",
      params: { status, statusText: !!statusText ? statusText : message },
    });
  }

  public safePushRoute (rawLocation: Location) {
    if (this.context.route.name !== rawLocation.name) {
      this.context.app.router?.push(rawLocation);
    }
  }

  public getIdBySlug (slug: string) {
    let result = 0;

    if (!!slug && slug.toString().indexOf("-") > -1) {
      const tryGet = Number(slug.split("-").pop());
      result = Number.isNaN(tryGet) ? 0 : tryGet;
    }

    if (!!slug && result === 0) {
      result = Number(slug);
    }
    return result;
  }
}
