import Articles from '@/pages/Articles.vue'
import ArticleCard from '@/pages/ArticleCard.vue'

export const EkosetRouter = [
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
    path: '/news/:id(\\d+)',
    component: ArticleCard,
    meta: { title: 'Экосеть: Новость' }
  }
]
