import StartAdmin from '@/pages/admin/StartAdmin.vue'
import AdminArticleList from '@/pages/admin/AdminArticleList.vue'
import AdminArticleCard from '@/pages/admin/AdminArticleCard.vue'
import AdminSiteSectionList from '@/pages/admin/AdminSiteSectionList.vue'
import AdminSiteSectionCard from '@/pages/admin/AdminSiteSectionCard.vue'
import AdminServiceCard from '@/pages/admin/AdminServiceCard.vue'
import AdminBrandList from '@/pages/admin/AdminBrandList.vue'
import AdminBrandCard from '@/pages/admin/AdminBrandCard.vue'
import AdminIndividualOfferCard from '@/pages/admin/AdminIndividualOfferCard.vue'
import AdminClActivityTypes from '@/pages/admin/AdminClActivityTypes.vue'
import AdminFooterSettings from '@/pages/admin/AdminFooterSettings.vue'
import AdminTopMenuList from '@/pages/admin/AdminTopMenuList.vue'
import AdminTopMenuCard from '@/pages/admin/AdminTopMenuCard.vue'
import AdminDocuments from '@/pages/admin/AdminDocuments.vue'

export const AdminRouter = [
  {
    name: 'admin',
    path: '/admin',
    props: true,
    component: StartAdmin,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления' }
  },
  {
    name: 'admin-news',
    path: '/admin/news',
    props: true,
    component: AdminArticleList,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - список новостей' }
  },
  {
    name: 'admin-news-article',
    path: '/admin/news/article',
    props: true,
    component: AdminArticleCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-news-article-card',
    path: '/admin-news/article/:article',
    props: true,
    component: AdminArticleCard,
    meta: { requiresAuth: true, itle: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-site-section-card',
    path: '/admin/sitesection/:siteSection',
    props: true,
    component: AdminSiteSectionCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - подразделы сайта' }
  },
  {
    name: 'admin-site-sections',
    path: '/admin/sitesection/',
    props: true,
    component: AdminSiteSectionList,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - подразделы сайта' }
  },

  {
    name: 'admin-top-menu-list',
    path: '/admin/topmenu',
    props: true,
    component: AdminTopMenuList,
    meta: { requiresAuth: true }
  },
  {
    name: 'admin-top-menu-card',
    path: '/admin/topmenu/:sitePageId',
    props: true,
    component: AdminTopMenuCard,
    meta: { requiresAuth: true }
  },

  {
    name: 'admin-service-card',
    path: '/admin/service/:service',
    props: true,
    component: AdminServiceCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - услуги' }
  },
  {
    name: 'admin-brands',
    path: '/admin/brand/',
    props: true,
    component: AdminBrandList,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-brand-card',
    path: '/admin/brand/:brand',
    props: true,
    component: AdminBrandCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-individual-offer-card-client-type',
    path: '/admin/individual-offer/:siteSection/:clienttype(business|person)',
    props: true,
    component: AdminIndividualOfferCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'admin-individual-offer-card',
    path: '/admin/individual-offer/:siteSection/:offer?',
    props: true,
    component: AdminIndividualOfferCard,
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'cl-activity-types',
    path: '/admin/cl-activity-types',
    props: true,
    component: AdminClActivityTypes,
    meta: {
      title: 'Справочники: Направления деятельности',
      requiresAuth: true
    }
  },
  {
    name: 'admin-footer-settings',
    path: '/admin/footer-settings',
    props: true,
    component: AdminFooterSettings,
    meta: {
      title: 'Настройки: Футер',
      requiresAuth: true
    }
  },

  {
    name: 'admin-documents',
    path: '/admin/docs',
    props: true,
    component: AdminDocuments,
    meta: {
      requiresAuth: true
    }
  }

]
