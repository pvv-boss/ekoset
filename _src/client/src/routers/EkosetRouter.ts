import News from '@/pages/News.vue'

export const EkosetRouter = [
  {
    name: 'news',
    path: '/news',
    props: true,
    component: News,
    meta: { title: 'Экосеть: Новости' }
  }
]