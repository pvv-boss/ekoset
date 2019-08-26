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
    name: 'activity-card',
    path: '/:activity',
    props: true,
    component: SiteSectionCard
  },

  {
    name: 'main',
    path: '/',
    props: true,
    component: Main
  },
  {
    name: 'clients',
    path: '/:activity?/clients',
    props: true,
    component: Clients
  },
  {
    name: 'contacts',
    path: '/:activity?/contacts',
    props: true,
    component: Contacts
  },
  {
    name: 'prices',
    path: '/:activity?/prices',
    props: true,
    component: Prices
  },
  {
    name: 'offer-card',
    path: '/:activity/offers/:offer',
    props: true,
    component: OfferCard
  },
  {
    name: 'service-card',
    path: '/:activity/services/:service',
    component: ServiceCard
  },

  {
    name: 'news-card',
    path: '/:activity?/news/:article',
    component: ArticleCard,
    meta: {
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'news' },
        { name: (t: { params: { articleUrl: any; }; }) => `Новость ${t.params.articleUrl}` }
      ]
    }
  },

  {
    name: 'news',
    path: '/:activity?/news',
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
