import { AdminMenuSection } from "@/models/AdminMenuSectionPermissionsManager";

export const AdminRouter = [
    {
        name: "admin",
        path: "/admin",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/StartAdmin.vue")),
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        name: "admin-news",
        path: "/admin/news",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.News },
    },
    {
        name: "admin-news-article",
        path: "/admin/news/article",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.News },
    },
    {
        name: "admin-news-article-card",
        path: "/admin-news/article/:article",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminArticleCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.News },
    },
    {
        name: "admin-site-section-card",
        path: "/admin/sitesection/:siteSection",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminSiteSectionCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.SiteSections },
    },
    {
        name: "admin-site-sections",
        path: "/admin/sitesection/",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminSiteSectionList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.SiteSections },
    },

    {
        name: "admin-top-menu-list",
        path: "/admin/topmenu",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminTopMenuList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.TopMenu },
    },
    {
        name: "admin-top-menu-card",
        path: "/admin/topmenu/:sitePageId",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminTopMenuCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.TopMenu },
    },

    {
        name: "admin-service-card",
        path: "/admin/service/:service",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminServiceCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.SiteSections },
    },
    {
        name: "admin-brands",
        path: "/admin/brand/",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminBrandList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.Brands },
    },
    {
        name: "admin-brand-card",
        path: "/admin/brand/:brand",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminBrandCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.Brands },
    },
    {
        name: "admin-individual-offer-card-client-type",
        path: "/admin/individual-offer/:siteSection/:clienttype(business|person)",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminIndividualOfferCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.SiteSections },
    },
    {
        name: "admin-individual-offer-card",
        path: "/admin/individual-offer/:siteSection/:offer?",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminIndividualOfferCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.SiteSections },
    },
    {
        name: "cl-activity-types",
        path: "/admin/cl-activity-types",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminClActivityTypes.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.ServiceType },
    },
    {
        name: "admin-footer-settings",
        path: "/admin/footer-settings",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminFooterSettings.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.FooterService },
    },

    {
        name: "admin-documents",
        path: "/admin/docs",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/AdminDocuments.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.Documents },
    },

    {
        name: "admin-manager-list",
        path: "/admin/staff/managers",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/ManagerList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.Staffs },
    },
    {
        name: "admin-clients-list",
        path: "/admin/staff/clients",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/ContactClientList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.ContactPersons },
    },

    {
        name: "admin-client-card",
        path: "/admin/staff/clients/:clientId",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/ClientCard.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.ContactPersons },
    },

    {
        name: "admin-request-list",
        path: "/admin/user/requests",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "admin" */ "@/pages/admin/UserRequestList.vue")),
        meta: { requiresAuth: true, requiresAdmin: true, requiresRightForAdminSection: AdminMenuSection.Requets },
    },
];

export function interopDefault(promise) {
    return promise.then((m) => m.default || m);
}
