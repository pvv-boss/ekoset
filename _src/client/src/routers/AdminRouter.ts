export const AdminRouter = [
  {
    name: 'admin',
    path: '/admin',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/StartAdmin.vue")),
    meta: { requiresAuth: true }
  },
  {
    name: 'admin-news',
    path: '/admin/news',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleList.vue")),
    meta: { requiresAuth: true }
  },
  {
    name: 'admin-news-article',
    path: '/admin/news/article',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-news-article-card',
    path: '/admin-news/article/:article',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleCard.vue")),
    meta: { requiresAuth: true, itle: 'Экосеть: Панель управления - редактирование новости' }
  },
  {
    name: 'admin-site-section-card',
    path: '/admin/sitesection/:siteSection',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminSiteSectionCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - подразделы сайта' }
  },
  {
    name: 'admin-site-sections',
    path: '/admin/sitesection/',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminSiteSectionList.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - подразделы сайта' }
  },

  {
    name: 'admin-top-menu-list',
    path: '/admin/topmenu',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminTopMenuList.vue")),
    meta: { requiresAuth: true }
  },
  {
    name: 'admin-top-menu-card',
    path: '/admin/topmenu/:sitePageId',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminTopMenuCard.vue")),
    meta: { requiresAuth: true }
  },

  {
    name: 'admin-service-card',
    path: '/admin/service/:service',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminServiceCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - услуги' }
  },
  {
    name: 'admin-brands',
    path: '/admin/brand/',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminBrandList.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-brand-card',
    path: '/admin/brand/:brand',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminBrandCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - бренды' }
  },
  {
    name: 'admin-individual-offer-card-client-type',
    path: '/admin/individual-offer/:siteSection/:clienttype(business|person)',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminIndividualOfferCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'admin-individual-offer-card',
    path: '/admin/individual-offer/:siteSection/:offer?',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminIndividualOfferCard.vue")),
    meta: { requiresAuth: true, title: 'Экосеть: Панель управления - индивидуальные предложения' }
  },
  {
    name: 'cl-activity-types',
    path: '/admin/cl-activity-types',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminClActivityTypes.vue")),
    meta: {
      title: 'Справочники: Направления деятельности',
      requiresAuth: true
    }
  },
  {
    name: 'admin-footer-settings',
    path: '/admin/footer-settings',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminFooterSettings.vue")),
    meta: {
      title: 'Настройки: Футер',
      requiresAuth: true
    }
  },

  {
    name: 'admin-documents',
    path: '/admin/docs',
    props: true,
    component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminDocuments.vue")),
    meta: {
      requiresAuth: true
    }
  }

]


export function interopDefault (promise) {
  return promise.then((m) => m.default || m);
}