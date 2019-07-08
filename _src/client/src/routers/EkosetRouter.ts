import Article from '@/pages/Article.vue'
import ArticleEditor from '@/pages/ArticleEditor.vue'

export const EkosetRouter = [
  {
    name: 'news',
    path: '/news',
    props: true,
    component: Article,
    meta: { title: 'Экосеть: Новости' }
  },
  {
    name: 'editor',
    path: '/editor',
    props: true,
    component: ArticleEditor,
    meta: { title: 'Экосеть: Редактор статей' }
  }
]
