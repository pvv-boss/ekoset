import Admin from '@/pages/Admin.vue'
import AdminArticleList from '@/components/admin/AdminArticleList.vue'
import AdminArticleCard from '@/components/admin/AdminArticleCard.vue'

export const AdminRouter = [
  {
    name: 'admin',
    path: '/admin',
    props: true,
    component: Admin,
    meta: { title: 'Экосеть: Панель управления' }
  },
  {
    name: 'admin-news',
    path: '/admin/news',
    props: true,
    component: AdminArticleList,
    meta: { title: 'Экосеть: Панель управления - список новостей' }
  },
  {
    name: 'admin-news-section',
    path: '/admin/news/:siteSectionId(\\d+)',
    props: true,
    component: AdminArticleList,
    meta: { title: 'Экосеть: Панель управления - список новостей' }
  },
  {
    name: 'admin-news-article',
    path: '/admin/news/article',
    props: true,
    component: AdminArticleCard,
    meta: { title: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-news-article-card',
    path: '/admin/news/article/:id(\\d+)',
    props: true,
    component: AdminArticleCard,
    meta: { title: 'Экосеть: Панель управления - редактирование новости' }
  }
]
