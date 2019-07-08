import Article from '@/pages/Article.vue'
import ArticleCard from '@/components/ekoset/article/ArticleCard.vue'

export const EkosetRouter = [
  {
    name: 'news',
    path: '/news',
    props: true,
    component: Article,
    meta: { title: 'Экосеть: Новости' }
  },
  {
    name: 'article-card',
    path: '/news/:id(\\d+)',
    component: ArticleCard,
    meta: { title: 'Экосеть: Новость' }
  }
]
