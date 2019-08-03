import Articles from '@/pages/public/Articles.vue'
import Activities from '@/pages/public/Activities.vue'
import ArticleCard from '@/pages/public/ArticleCard.vue'
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
    name: 'activity-list',
    path: '/activities',
    props: true,
    component: Activities,
    meta: { title: 'Экосеть: Направления деятельности' }
  },
  {
    name: 'service-card',
    path: '/service/:serviceName',
    component: ServiceCard,
    meta: { title: 'Экосеть: Услуга' }
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
        { name: 'Новости', link: 'article-list' }
      ]
    }
  },
  {
    name: 'section-news',
    path: '/:siteSectionId(\\d+)/news',
    props: true,
    component: Articles,
    meta: {
      title: 'Экосеть: Новости',
      breadcrumb: [
        { name: 'Главная', link: 'main' },
        { name: 'Новости', link: 'article-list' }
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
        { name: 'Новости', link: 'article-list' },
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
  }
]
