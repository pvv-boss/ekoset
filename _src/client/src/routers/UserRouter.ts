import Login from '@/pages/private/Login.vue'
import ChangePasswordForm from '@/components/user/ChangePasswordForm.vue'
import RestorePasswordForm from '@/components/user/RestorePasswordForm.vue'
import AuthCallback from '@/components/user/AuthCallback.vue'
import UserProfile from '@/pages/private/UserProfile.vue'
import UserDeals from '@/pages/private/UserDeals.vue'
import ContractList from '@/components/private/ContractList.vue'
import LabaratoryList from '@/components/private/LabaratoryList.vue'
import SanitaryList from '@/components/private/SanitaryList.vue'
import DisinfectionList from '@/components/private/DisinfectionList.vue'

export const UserRoute = [
  {
    name: 'auth-login',
    path: '/auth/:mode(login|registration)',
    props: true,
    component: Login,
    meta: { title: 'Экосеть:: Вход на сайт' }
  },
  {
    name: 'auth-change',
    path: '/user/password/:mode(change|reset)',
    props: true,
    component: ChangePasswordForm,
    meta: {
      title: 'Экосеть:: Смена пароля',
      requiresAuth: true
    }
  },
  {
    name: 'auth-restore',
    path: '/auth/restore',
    component: RestorePasswordForm,
    meta: { title: 'Экосеть:: Восстановление пароля' }
  },
  {
    name: 'auth-callback',
    path: '/auth/callback/:mode(login|registration|logoff)',
    props: true,
    component: AuthCallback
  },
  {
    name: 'user-prifile',
    path: '/user/profile',
    props: true,
    component: UserProfile
  },

  {
    name: 'user-deals',
    path: '/user/deals',
    props: true,
    component: UserDeals,
    children: [
      {
        name: 'user-deals-contracts',
        path: 'contracts',
        props: true,
        component: ContractList
      },
      {
        name: 'user-deals-labaratory',
        path: 'labs',
        props: true,
        component: LabaratoryList
      },
      {
        name: 'user-deals-sanitary',
        path: 'sanitary',
        props: true,
        component: SanitaryList
      },
      {
        name: 'user-deals-disinfection',
        path: 'disinfection',
        props: true,
        component: DisinfectionList
      }
    ]
  }

]

export default UserRoute
