import Articles from '@/pages/Articles.vue'
import ArticleCard from '@/pages/ArticleCard.vue'
import Privacy from '@/pages/Privacy.vue'
import BusinessServiceLanding from '@/pages/BusinessServiceLanding.vue'
import CarServiceLanding from '@/pages/CarServiceLanding.vue'
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
    name: 'business-service',
    path: '/business-service',
    props: true,
    component: BusinessServiceLanding,
    meta: { title: 'Экосеть: Услуги для бизнеса' }
  },
  {
    name: 'car-service',
    path: '/car-service',
    props: true,
    component: CarServiceLanding,
    meta: { title: 'Экосеть: Услуги для автосалонов' }
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
    name: 'user-privacy',
    path: '/user/:userId(\\d+)/:privacyType(contract|work|research|document)',
    props: true,
    component: Privacy,
    meta: {
      title: 'Экосеть: Личный кабинет',
      // requiresAuth: true
    }
  },
  {
    name: 'user-privacy-mode',
    path: '/user/:userId(\\d+)/:privacyType(contract|work|research|document)/:mode(tile|list)',
    props: true,
    component: Privacy,
    meta: {
      title: 'Экосеть: Личный кабинет',
      // requiresAuth: true
    }
  }
]
