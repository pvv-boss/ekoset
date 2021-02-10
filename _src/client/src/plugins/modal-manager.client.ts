import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import Vue, { AsyncComponent, ComponentOptions } from "vue";
import VModal from "vue-js-modal/dist/ssr.nocss";

declare module "vue/types/vue" {
    interface Vue {
        $modal: VModal;
    }
}

declare module "vue/types/vue" {
    interface Vue {
        $modalManager: ModalManager;
    }
}

Vue.use(VModal, {
    dynamic: true,
    injectModalsContainer: true,
    dynamicDefaults: {
        clickToClose: false,
        adaptive: true,
        maxWidth: 568,
        height: "auto",
        scrollable: true,
    },
});

class ModalManager {
    modalShow(modal: typeof Vue | ComponentOptions<Vue> | AsyncComponent, props = {}, options: any = {}): Promise<any> {
        if (modal.name === "Dialog") {
            options.width = "350";
        }

        return new Promise((resolve) => {
            Vue.prototype.$modal.show(
                modal,
                props,
                {
                    height: "auto",
                    scrollable: true,
                    ...options,
                },
                {
                    "before-close": (event) => {
                        return resolve(event.params || null);
                    },
                }
            );
        });
    }
}

const initModals: Plugin = (ctx: Context, inject: Inject) => {
    inject("modalManager", new ModalManager());
};

export default initModals;
