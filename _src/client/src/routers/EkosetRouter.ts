
export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: () => require(/* webpackChunkName: "main" */ "@/pages/public/Main.vue").default
  },
  {
    name: 'about',
    path: '/about',
    props: true,
    component: () => require(/* webpackChunkName: "about" */ "@/pages/public/About.vue").default
  },
  {
    name: 'clients',
    path: '/:siteSection?/clients',
    props: true,
    component: () => require(/* webpackChunkName: "clients" */ "@/pages/public/Clients.vue").default
  },
  {
    name: 'contacts',
    path: '/:siteSection?/contacts',
    props: true,
    component: () => require(/* webpackChunkName: "contacts" */ "@/pages/public/Contacts.vue").default
  },
  {
    name: 'prices',
    path: '/:siteSection?/prices',
    props: true,
    component: () => require(/* webpackChunkName: "prices" */ "@/pages/public/Prices.vue").default
  },

  {
    name: 'offer-card',
    path: '/:siteSection?/:clienttype?/offers/:offer?',
    props: true,
    component: () => require(/* webpackChunkName: "offerCard" */ "@/pages/public/OfferCard.vue").default
  },
  {
    name: 'service-card',
    path: '/:siteSection?/services/:service',
    component: () => require(/* webpackChunkName: "serviceCard" */ "@/pages/public/ServiceCard.vue").default,
    props: true
  },

  {
    name: 'news',
    path: '/:siteSection?/news',
    props: true,
    component: () => require(/* webpackChunkName: "articles" */ "@/pages/public/Articles.vue").default
  },

  {
    name: 'news-card',
    path: '/:siteSection?/news/:article',
    component: () => require(/* webpackChunkName: "articles" */ "@/pages/public/ArticleCard.vue").default,
    props: true
  },

  {
    name: 'activity-card',
    path: '/:siteSection',
    props: true,
    component: () => require(/* webpackChunkName: "siteSectionCard" */ "@/pages/public/SiteSectionCard.vue").default,
  },

  {
    name: 'custom-page',
    path: '/:siteSection?/pages/:page',
    props: true,
    component: () => require(/* webpackChunkName: "dynamicPage" */ "@/pages/public/DynamicPage.vue").default,
  }

]
