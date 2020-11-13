import Login from '@/pages/private/Login.vue'
import RestorePasswordForm from '@/components/user/RestorePasswordForm.vue'
import UserProfile from '@/pages/private/UserProfile.vue'
import UserDeals from '@/pages/private/UserDeals.vue'
import ContractList from '@/components/private/ContractList.vue'
import LabaratoryList from '@/components/private/LabaratoryList.vue'
import SanitaryList from '@/components/private/SanitaryList.vue'
import DisinfectionList from '@/components/private/DisinfectionList.vue'
import ConfirmResetPassworCallback from '@/components/user/ConfirmResetPassworCallback.vue'


export const UserRoute = [
  {
    name: 'auth-login',
    path: '/auth/:mode(login|registration)',
    props: true,
    component: Login,
    meta: { title: 'Экосеть:: Вход на сайт' }
  },

  {
    name: 'auth-restore',
    path: '/auth/restore',
    component: RestorePasswordForm,
    meta: { title: 'Экосеть:: Восстановление пароля' }
  },

  {
    name: 'user-profile',
    path: '/user/profile',
    props: true,
    component: UserProfile,
    meta: { requiresAuth: true }
  },

  {
    name: 'confirm-reset-password',
    path: '/user/password/reset/confirm/:code',
    props: true,
    component: ConfirmResetPassworCallback
  },

  {
    name: 'user-deals',
    path: '/user/deals',
    props: true,
    meta: { requiresAuth: true },
    component: UserDeals,
    children: [
      {
        name: 'user-deals-empty',
        path: '',
        props: true,
        component: ContractList
      },
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
