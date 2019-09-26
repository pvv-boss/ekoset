import Admin from '@/pages/admin/Admin.vue'
import AdminArticleList from '@/pages/admin/AdminArticleList.vue'
import AdminArticleCard from '@/pages/admin/AdminArticleCard.vue'
import AdminSiteSectionList from '@/pages/admin/AdminSiteSectionList.vue'
import AdminSiteSectionCard from '@/pages/admin/AdminSiteSectionCard.vue'
import AdminServiceList from '@/pages/admin/AdminServiceList.vue'
import AdminServiceCard from '@/pages/admin/AdminServiceCard.vue'
import AdminBrandList from '@/pages/admin/AdminBrandList.vue'
import AdminBrandCard from '@/pages/admin/AdminBrandCard.vue'
import AdminIndividualOfferList from '@/pages/admin/AdminIndividualOfferList.vue'
import AdminIndividualOfferCard from '@/pages/admin/AdminIndividualOfferCard.vue'
import AdminClActivityTypes from '@/pages/admin/AdminClActivityTypes.vue'
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
  },
  {
    name: 'admin-brands',
    path: '/admin/brand/',
    props: true,
    component: AdminBrandList,
    meta: { title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-brand-card',
    path: '/admin/brand/:brand',
    props: true,
    component: AdminBrandCard,
    meta: { title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-individual-offer-card',
    path: '/admin/individual-offer/:siteSection/:offer?/:clienttype?',
    props: true,
    component: AdminIndividualOfferCard,
    meta: { title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'admin-individual-offers',
    path: '/admin/individual-offer/',
    props: true,
    component: AdminIndividualOfferList,
    meta: { title: 'Экосеть: Панель управления - индивидуальные предложения' }
  }
  ,
  {
    name: 'cl-activity-types',
    path: '/admin/cl-activity-types',
    props: true,
    component: AdminClActivityTypes,
    meta: {
      title: 'Справочники: Направления деятельности',
      // requiresAuth: true
    }
  }
]
