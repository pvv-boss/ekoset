﻿import { Middleware, Context } from '@nuxt/types';
import { ServiceRegistry } from '@/ServiceRegistry';
import { AuthService } from '@/services/AuthService';


const requiresAuthorize: Middleware = async (ctx: Context) => {
  const isAuthRoute = ctx.route.matched.some((record) => record.meta?.requiresAuth);

  if (isAuthRoute) {
    const isUserAuth = await ServiceRegistry.instance.getService(AuthService).isUserAuthorized()
    if (!isUserAuth) {
      return ctx.redirect(
        {
          name: 'auth-login',
          params: {
            mode: 'login'
          }
        });
    }
  }
}

export default requiresAuthorize
