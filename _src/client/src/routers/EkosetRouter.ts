import Article from '@/pages/Article.vue'

export const EkosetRouter = [
  {
    name: 'news',
    path: '/news',
    props: true,
    component: Article,
    meta: { title: 'Экосеть: Новости' }
  }
]
