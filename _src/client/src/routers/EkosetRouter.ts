import Articles from '@/pages/public/Articles.vue'
import Activities from '@/pages/public/Activities.vue'
import ArticleCard from '@/pages/public/ArticleCard.vue'
import ServiceCard from '@/pages/public/ServiceCard.vue'
import Privacy from '@/pages/private/Privacy.vue'
import Main from '@/pages/public/Main.vue'

export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: Main,
    meta: { title: 'Экосеть' }
  },
  // {
  //   name: 'service',
  //   path: '/service/:param1?/:param2?/:param3?',
  //   props: true,
  //   component: ServiceLanding,
  //   meta: { title: 'Экосеть: Услуги для бизнеса' }
  // },
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
    name: 'article-list',
    path: '/news',
    props: true,
    component: Articles,
    meta: { title: 'Экосеть: Новости' }
  },
  {
    name: 'article-section-list',
    path: '/:siteSectionId(\\d+)/news',
    props: true,
    component: Articles,
    meta: { title: 'Экосеть: Новости' }
  },
  {
    name: 'article-card',
    path: '/news/:articleUrl',
    component: ArticleCard,
    meta: { title: 'Экосеть: Новость' }
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
