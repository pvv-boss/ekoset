import { interopDefault } from "./AdminRouter";

export const EkosetRouter = [
    {
        name: "main",
        path: "/",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "main" */ "@/pages/public/Main.vue")),
    },
    {
        name: "about",
        path: "/about",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "about" */ "@/pages/public/About.vue")),
    },
    {
        name: "clients",
        path: "/:siteSection?/clients",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "clients" */ "@/pages/public/Clients.vue")),
    },
    {
        name: "contacts",
        path: "/:siteSection?/contacts",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "contacts" */ "@/pages/public/Contacts.vue")),
    },
    {
        name: "prices",
        path: "/:siteSection?/prices",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "prices" */ "@/pages/public/Prices.vue")),
    },

    {
        name: "offer-card",
        path: "/:siteSection?/:clienttype?/offers/:offer?",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "offerCard" */ "@/pages/public/OfferCard.vue")),
    },
    {
        name: "service-card",
        path: "/:siteSection?/services/:service",
        component: () => interopDefault(import(/* webpackChunkName: "serviceCard" */ "@/pages/public/ServiceCard.vue")),
        props: true,
    },

    {
        name: "news",
        path: "/:siteSection?/news",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "articles" */ "@/pages/public/Articles.vue")),
    },

    {
        name: "news-card",
        path: "/:siteSection?/news/:article",
        component: () => interopDefault(import(/* webpackChunkName: "articles" */ "@/pages/public/ArticleCard.vue")),
        props: true,
    },

    {
        name: "activity-card",
        path: "/:siteSection",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "siteSectionCard" */ "@/pages/public/SiteSectionCard.vue")),
    },

    {
        name: "custom-page",
        path: "/:siteSection?/pages/:page",
        props: true,
        component: () => interopDefault(import(/* webpackChunkName: "dynamicPage" */ "@/pages/public/DynamicPage.vue")),
    },
];
