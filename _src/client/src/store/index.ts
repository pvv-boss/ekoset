
import { AppConfig } from '@/AppConfig'
import { ServiceRegistry } from '@/ServiceRegistry'
import { AuthService } from '@/services/AuthService'
import { Context, NuxtAppOptions } from '@nuxt/types'
import { Store } from 'vuex'

// const initSessionUserFromServer = async (app: NuxtAppOptions) => {
//     await ServiceRegistry.instance.getService(AuthService).setSessionUserFromServer()
//     //    await ServiceRegistry.instance.getService(AuthService).setSessionUserFromServer(app.$cookies.getAll({ fromRes: false, parseJSON: false }))
// }

// export const actions = {
//     async nuxtServerInit (store: Store<any>, ctx: Context) {
//         await initSessionUserFromServer(ctx.app);
//     }


export const strict = false
