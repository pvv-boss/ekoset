import Articles from '@/pages/Articles.vue'
import ArticleCard from '@/pages/ArticleCard.vue'
import Privacy from '@/pages/Privacy.vue'
import ServiceLanding from '@/pages/ServiceLanding.vue'
import MainLanding from '@/pages/MainLanding.vue'

export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: MainLanding,
    meta: { title: 'Экосеть' }
  },
  {
    name: 'service',
    path: '/service/:param1?/:param2?/:param3?',
    props: true,
    component: ServiceLanding,
    meta: { title: 'Экосеть: Услуги для бизнеса' }
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
