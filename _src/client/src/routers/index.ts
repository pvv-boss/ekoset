import Vue from "vue";
import Router from "vue-router";
import UserRoute from "@/routers/UserRouter";
import BaseNotFound from "@/components/base/BaseNotFound.vue";
import BaseError from "@/components/base/BaseError.vue";
import { EkosetRouter } from "@/routers/EkosetRouter";
import { AdminRouter } from "@/routers/AdminRouter";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            ...UserRoute,
            ...AdminRouter,
            ...EkosetRouter,
            {
                name: "error-page",
                path: "/app/error",
                component: BaseError,
                props: true,
            },

            {
                name: "not-found",
                path: "/app/not-found-page",
                component: BaseNotFound,
            },

            {
                path: "/:pathMatch(.*)*",
                redirect: { name: "not-found" },
            },
        ],

        scrollBehavior(to, from, savedPosition) {
            if (to.name !== from.name) {
                if (!!savedPosition) {
                    return savedPosition;
                } else {
                    return { x: 0, y: 0, behavior: "smooth" };
                }
            }
        },
    });
}
