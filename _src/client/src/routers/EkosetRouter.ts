import Articles from '@/pages/public/Articles.vue'
import ActivityCard from '@/pages/public/ActivityCard.vue'
import Offers from '@/pages/public/Offers.vue'
import OfferCard from '@/pages/public/OfferCard.vue'
import ArticleCard from '@/pages/public/ArticleCard.vue'
import Services from '@/pages/public/Services.vue'
import ServiceCard from '@/pages/public/ServiceCard.vue'
import Privacy from '@/pages/private/Privacy.vue'
import Main from '@/pages/public/Main.vue'
import Clients from '@/pages/public/Clients.vue'
import Contacts from '@/pages/public/Contacts.vue'
import Prices from '@/pages/public/Prices.vue'
import About from '@/pages/public/About.vue'

export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: Main,
    meta: { title: 'Экосеть' }
  },
  {
    name: 'about',
    path: '/about',
    props: true,
    component: About,
    meta: { title: 'Экосеть: О компании' }
  },
  {
    name: 'clients',
    path: '/clients',
    props: true,
    component: Clients,
    meta: { title: 'Экосеть: клиенты' }
  },
  {
    name: 'contacts',
    path: '/contacts',
    props: true,
    component: Contacts,
    meta: { title: 'Экосеть: контакты' }
  },
  {
    name: 'prices',
    path: '/prices',
    props: true,
    component: Prices,
    meta: { title: 'Экосеть: цены' }
  },

  {
    name: 'offer-list',
    path: '/:activity/offers',
    props: true,
    component: Offers,
    meta: { title: 'Экосеть: Направления деятельности' }
  },

  {
    name: 'activity-prices',
    path: '/:activity/prices',
    props: true,
    component: Prices,
    meta: { title: 'Экосеть: Цены раздела' }
  },

  {
    name: 'offer-card',
    path: '/:activity/offers/:offerId',
    props: true,
    component: OfferCard,
    meta: { title: 'Экосеть: Направление деятельности' }
  },

  {
    name: 'service-list',
    path: '/:activity/services',
    component: Services,
    meta: { title: 'Экосеть: Услуги' }
  },

  {
    name: 'service-card',
    path: '/:activity/services/:service',
    component: ServiceCard,
    meta: { title: 'Экосеть: Услуга' }
  },

  {
    name: 'service-news',
    path: '/:activity/services/:service/news',
    component: Articles,
    meta: { title: 'Экосеть: Новости услуги' }
  },

  {
    name: 'news',
    path: '/news',
    props: true,
    component: Articles,
    meta: {
      title: 'Экосеть: Новости',
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'news' }
      ]
    }
  },
  {
    name: 'activity-news',
    path: '/:activity/news',
    props: true,
    component: Articles,
    meta: {
      title: 'Экосеть: Новости раздела',
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'news' }
      ]
    }
  },
  {
    name: 'news-card',
    path: '/news/:articleUrl',
    component: ArticleCard,
    meta: {
      title: 'Экосеть: Новость',
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'news' },
        { name: (t: { params: { articleUrl: any; }; }) => `Новость ${t.params.articleUrl}` }
      ]
    }
  },
  {
    name: 'user-privacy-mode',
    path: '/user/:userId(\\d+)/:privacyType(contract|work|research|document)/:mode(tile|list)?',
    props: true,
    component: Privacy,
    meta: {
      title: 'Экосеть: Личный кабинет',
      // requiresAuth: true
    }
  },
  {
    name: 'activity-card',
    path: '/:activity',
    props: true,
    component: ActivityCard,
    meta: { title: 'Экосеть: Направление деятельности' }
  }
]
