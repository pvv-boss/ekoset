import { Context } from "@nuxt/types";
import { AuthService } from "@/services/AuthService";

const requiresAuthorize = async (ctx: Context) => {
    const isAuthRoute = ctx.route.matched.some((record) => record.meta?.requiresAuth);
    const isRequiresAdmin = ctx.route.matched.some((record) => record.meta?.requiresAdmin);

    if (isAuthRoute) {
        const isUserAuth = ctx.$serviceRegistry.getService(AuthService).isUserAuthorized;
        const isUserAdmin = ctx.$serviceRegistry.getService(AuthService).isUserAdmin;
        const isAllowed = isUserAuth && ((isRequiresAdmin && isUserAdmin) || (!isRequiresAdmin && !isUserAdmin));

        if (!isAllowed) {
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
