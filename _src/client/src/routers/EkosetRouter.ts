import Articles from '@/pages/public/Articles.vue'
import SiteSectionCard from '@/pages/public/SiteSectionCard.vue'
import OfferCard from '@/pages/public/OfferCard.vue'
import ArticleCard from '@/pages/public/ArticleCard.vue'
import ServiceCard from '@/pages/public/ServiceCard.vue'
import Privacy from '@/pages/private/Privacy.vue'
import UserSettings from '@/pages/private/UserSettings.vue'
import Main from '@/pages/public/Main.vue'
import Clients from '@/pages/public/Clients.vue'
import Contacts from '@/pages/public/Contacts.vue'
import Prices from '@/pages/public/Prices.vue'

export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: Main
  },
  {
    name: 'clients',
    path: '/:siteSection?/clients',
    props: true,
    component: Clients
  },
  {
    name: 'contacts',
    path: '/:siteSection?/contacts',
    props: true,
    component: Contacts
  },
  {
    name: 'prices',
    path: '/:siteSection?/prices',
    props: true,
    component: Prices
  },
  {
    name: 'offer-card',
    path: '/:siteSection/:clienttype?/offers/:offer?',
    props: true,
    component: OfferCard
  },
  {
    name: 'service-card',
    path: '/:siteSection/services/:service',
    component: ServiceCard,
    props: true,
  },

  {
    name: 'news-card',
    path: '/:siteSection?/news/:article',
    component: ArticleCard,
    props: true,
    meta: {
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'getSiteSectionName', link: 'getSiteSectionSlug' },
        { name: 'Новости', link: 'news' },
        { name: 'getArticleName', link: '' }
      ]
    }
  },

  {
    name: 'news',
    path: '/:siteSection?/news',
    props: true,
    component: Articles,
    meta: {
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'news' }
      ]
    }
  },

  {
    name: 'activity-card',
    path: '/:siteSection',
    props: true,
    component: SiteSectionCard
  },

  {
    name: 'user',
    path: '/user/:privacyType(disinfectionwork|research|document)?',
    props: true,
    component: Privacy,
    meta: {
      title: 'Экосеть: Личный кабинет',
      // requiresAuth: true
    }
  },
  {
    name: 'user-settings',
    path: '/user/settings',
    props: true,
    component: UserSettings,
    meta: {
      title: 'Экосеть: Настройки пользователя',
      // requiresAuth: true
    }
  }
]
