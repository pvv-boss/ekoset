import Admin from '@/pages/admin/Admin.vue'
import AdminArticleList from '@/pages/admin/AdminArticleList.vue'
import AdminArticleCard from '@/pages/admin/AdminArticleCard.vue'
import AdminSiteSectionList from '@/pages/admin/AdminSiteSectionList.vue'
import AdminSiteSectionCard from '@/pages/admin/AdminSiteSectionCard.vue'
import AdminServiceList from '@/pages/admin/AdminServiceList.vue'
import AdminServiceCard from '@/pages/admin/AdminServiceCard.vue'
import AdminBrandList from '@/pages/admin/AdminBrandList.vue'
import AdminBrandCard from '@/pages/admin/AdminBrandCard.vue'
import AdminIndividualOfferCard from '@/pages/admin/AdminIndividualOfferCard.vue'
import AdminClActivityTypes from '@/pages/admin/AdminClActivityTypes.vue'
import AdminClPartnerGroups from '@/pages/admin/AdminClPartnerGroups.vue'
import AdminClientList from '@/pages/admin/AdminClientList.vue'
import AdminClientCard from '@/pages/admin/AdminClientCard.vue'
import AdminFooterSettings from '@/pages/admin/AdminFooterSettings.vue'

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
    name: 'admin-individual-offer-card-client-type',
    path: '/admin/individual-offer/:siteSection/:clienttype(business|person)',
    props: true,
    component: AdminIndividualOfferCard,
    meta: { title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'admin-individual-offer-card',
    path: '/admin/individual-offer/:siteSection/:offer?',
    props: true,
    component: AdminIndividualOfferCard,
    meta: { title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'admin-client-card',
    path: '/admin/client/:client',
    props: true,
    component: AdminClientCard,
    meta: { title: 'Экосеть: Панель управления - клиенты' }
  },
  {
    name: 'admin-clients',
    path: '/admin/client/',
    props: true,
    component: AdminClientList,
    meta: { title: 'Экосеть: Панель управления - клиенты' }
  },
  {
    name: 'cl-activity-types',
    path: '/admin/cl-activity-types',
    props: true,
    component: AdminClActivityTypes,
    meta: {
      title: 'Справочники: Направления деятельности',
      // requiresAuth: true
    }
  },
  {
    name: 'cl-partner-groups',
    path: '/admin/cl-partner-groups',
    props: true,
    component: AdminClPartnerGroups,
    meta: {
      title: 'Справочники: Группы клиентов',
      // requiresAuth: true
    }
  },
  {
    name: 'admin-footer-settings',
    path: '/admin/footer-settings',
    props: true,
    component: AdminFooterSettings,
    meta: {
      title: 'Настройки: Футер',
      // requiresAuth: true
    }
  }
]
