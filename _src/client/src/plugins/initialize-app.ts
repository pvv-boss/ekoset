import { Context, Plugin } from "@nuxt/types";
import { ContextServiceRegistry, ServiceRegistry } from "@/ServiceRegistry";
import { Inject } from "@nuxt/types/app";
import AxiosRequest from "@/api/core/AxiosRequest";
import { AppConfig } from "@/AppConfig";
import ArticleService from "@/services/ArticleService";
import { AuthService } from "@/services/AuthService";
import BusinessServiceService from "@/services/BusinessServiceService";
import DynamicComponentsService from "@/services/DynamicComponentsService";
import IndividualOfferService from "@/services/IndividualOfferService";
import MediaService from "@/services/MediaService";
import PublicEkosetService from "@/services/PublicEkosetService";
import TopMenuService from "@/services/TopMenuService";
import UserDealService from "@/services/UserDealService";
import { getModule } from "vuex-module-decorators";
import BuscetStore from "@/store/BuscetStore";
import UserService from "@/services/UserService";
import { ApiResponse } from "@/api/core/ApiResponse";
import { BrcDialogType } from "./brc-dialog/BrcDialogType";
import BrcDialogPlugin from "@/plugins/brc-dialog/brc-dialog";
import { BrcDialogPosition } from "@/plugins/brc-dialog/BrcDialogPosition";

declare module "vue/types/vue" {
    interface Vue {
        $serviceRegistry: ContextServiceRegistry;
    }
}

declare module "@nuxt/types" {
    // nuxtContext.app.$serviceRegistry inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $serviceRegistry: ContextServiceRegistry;
    }
    // nuxtContext.$serviceRegistry
    interface Context {
        $serviceRegistry: ContextServiceRegistry;
    }
}

declare module "vuex/types/index" {
    // this.$serviceRegistry inside Vuex stores
    interface Store<S> {
        $serviceRegistry(): ContextServiceRegistry;
    }
}

const initializeApp = async (ctx: Context, inject: Inject) => {
    initializeServiceRegistry(ctx, inject);

    if (process.server) {
        await ServiceRegistry.instance.getService(AuthService).trySetSessionUserFromServer();
    }

    if (process.client) {
        getModule(BuscetStore, ctx.store).initServiceList();
    }
};

const initializeServiceRegistry = (ctx: Context, inject: Inject) => {
    ServiceRegistry.createFreshSrvRegistry();

    ServiceRegistry.instance.register(ArticleService);
    ServiceRegistry.instance.register(AuthService);
    ServiceRegistry.instance.register(BusinessServiceService);
    ServiceRegistry.instance.register(DynamicComponentsService);
    ServiceRegistry.instance.register(IndividualOfferService);
    ServiceRegistry.instance.register(MediaService);
    ServiceRegistry.instance.register(PublicEkosetService);
    ServiceRegistry.instance.register(TopMenuService);
    ServiceRegistry.instance.register(UserDealService);
    ServiceRegistry.instance.register(UserService);

    ServiceRegistry.instance.updateNuxtContext(ctx);

    const api = createApiRequest();
    ServiceRegistry.instance.updateRequestApi(api);

    inject("serviceRegistry", ServiceRegistry.instance);
};

const createApiRequest = () => {
    const api = new AxiosRequest({ withCredentials: true }, AppConfig.endPoint);

    api.addRequestInterceptor((config) => {
        config.headers = !!config.headers ? config.headers : {};
        const accessToken = ServiceRegistry.instance.getService(AuthService).getAccessToken();

        if (!!accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    });

    api.addResponseInterceptor((response: ApiResponse) => {
        const token = response.headers[AppConfig.jwtHeaderName];
        ServiceRegistry.instance.getService(AuthService).updateAccessToken(token);
    });

    api.addResponseInterceptor((response: ApiResponse) => {
        if (response?.data?.showNotify) {
            BrcDialogPlugin.showNotify(
                BrcDialogType.Info,
                response.data?.showNotify.title,
                response.data?.showNotify.text,
                2500,
                { position: BrcDialogPosition.Central }
            );
        }
    });

    return api;
};

export default initializeApp;
