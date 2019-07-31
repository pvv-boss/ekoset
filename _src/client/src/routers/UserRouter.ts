import Login from '@/pages/private/Login.vue'
import ChangePasswordForm from '@/components/user/ChangePasswordForm.vue'
import RestorePasswordForm from '@/components/user/RestorePasswordForm.vue'
import AuthCallback from '@/components/user/AuthCallback.vue'

export const UserRoute = [
  {
    name: 'auth-login',
    path: '/auth/:mode(login|registration)',
    props: true,
    component: Login,
    meta: { title: 'Госторги24: Вход на сайт' }
  },
  {
    name: 'auth-change',
    path: '/user/password/:mode(change|reset)',
    props: true,
    component: ChangePasswordForm,
    meta: {
      title: 'Госторги24: Смена пароля',
      requiresAuth: true
    }
  },
  {
    name: 'auth-restore',
    path: '/auth/restore',
    component: RestorePasswordForm,
    meta: { title: 'Госторги24: Восстановление пароля' }
  },
  {
    name: 'auth-callback',
    path: '/auth/callback/:mode(login|registration|logoff)',
    props: true,
    component: AuthCallback
  }
]

export default UserRoute
