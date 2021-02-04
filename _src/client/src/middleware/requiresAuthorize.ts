import { Context } from "@nuxt/types";
import { AuthService } from "@/services/AuthService";

const requiresAuthorize = async (ctx: Context) => {
    const isAuthRoute = ctx.route.matched.some((record) => record.meta?.requiresAuth);
    if (isAuthRoute) {
        const isUserAuth = ctx.$serviceRegistry.getService(AuthService).isUserAuthorized;
        if (!isUserAuth) {
            return ctx.redirect({
                name: "auth-login",
                params: {
                    mode: "login",
                },
            });
        }
    }
};

export default requiresAuthorize;
