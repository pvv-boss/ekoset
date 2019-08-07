import Vue from 'vue'
import Router from 'vue-router'
import UserRoute from '@/routers/UserRouter'
import BaseNotFound from '@/components/base/BaseNotFound.vue'
import BaseError from '@/components/base/BaseError.vue'
import { EkosetRouter } from '@/routers/EkosetRouter'
import { AdminRouter } from '@/routers/AdminRouter'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      ...UserRoute,
      ...AdminRouter,
      ...EkosetRouter,
      {
        name: 'not-found',
        path: '*',
        component: BaseNotFound,
        meta: {
          title: 'Экосеть: Страница не найдена!'
        }
      },
      {
        name: 'error',
        path: '/error',
        component: BaseError,
        props: true,
        meta: {
          title: 'Экосеть: Ошибка!'
        }
      }
    ],
    scrollBehavior (to, from, savedPosition) {
      return {
        x: 0,
        y: 0
      }
    }
  })
}
