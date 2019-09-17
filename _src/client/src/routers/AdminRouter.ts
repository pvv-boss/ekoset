import Admin from '@/pages/admin/Admin.vue'
import AdminArticleList from '@/components/admin/AdminArticleList.vue'
import AdminArticleCard from '@/components/admin/AdminArticleCard.vue'
import AdminSiteSectionList from '@/components/admin/AdminSiteSectionList.vue'
import AdminSiteSectionCard from '@/components/admin/AdminSiteSectionCard.vue'
import AdminServiceList from '@/components/admin/AdminServiceList.vue'
import AdminServiceCard from '@/components/admin/AdminServiceCard.vue'

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
    name: 'admin-news-article',
    path: '/admin/news/article',
    props: true,
    component: AdminArticleCard,
    meta: { title: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-news-article-card',
    path: '/admin/news/article/:article',
    props: true,
    component: AdminArticleCard,
    meta: { title: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-site-section-card',
    path: '/admin/sitesection/:siteSection',
    props: true,
    component: AdminSiteSectionCard,
    meta: { title: 'Экосеть: Панель управления - подразделы сайта' }
  },
  {
    name: 'admin-site-sections',
    path: '/admin/sitesection/',
    props: true,
    component: AdminSiteSectionList,
    meta: { title: 'Экосеть: Панель управления - подразделы сайта' }
  },
  {
    name: 'admin-service-card',
    path: '/admin/service/:service',
    props: true,
    component: AdminServiceCard,
    meta: { title: 'Экосеть: Панель управления - услуги' }
  },
  {
    name: 'admin-services',
    path: '/admin/service/',
    props: true,
    component: AdminServiceList,
    meta: { title: 'Экосеть: Панель управления - услуги' }
  }
]
