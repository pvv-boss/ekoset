import { Context } from "@nuxt/types";
import { AuthService } from "@/services/AuthService";
import { AdminMenuSectionPermissionsManager } from "@/models/AdminMenuSectionPermissionsManager";

const requiresAuthorize = async (ctx: Context) => {
    const isAuthRoute = ctx.route.matched.some((record) => record.meta?.requiresAuth);
    const isRequiresAdmin = ctx.route.matched.some((record) => record.meta?.requiresAdmin);

    const requiresRightForAdminSectionRecord = ctx.route.matched.find((record) => record.meta?.requiresRightForAdminSection);

    if (isAuthRoute) {
        const isUserAuth = ctx.$serviceRegistry.getService(AuthService).isUserAuthorized;
        const isUserAdmin = ctx.$serviceRegistry.getService(AuthService).isUserAdmin;
        let isAllowed = isUserAuth && ((isRequiresAdmin && isUserAdmin) || (!isRequiresAdmin && !isUserAdmin));

        if (!!requiresRightForAdminSectionRecord) {
            isAllowed = !!AdminMenuSectionPermissionsManager.existsOnCurrentUser(
                requiresRightForAdminSectionRecord.meta.requiresRightForAdminSection
            );
        }

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
