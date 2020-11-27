// const Articles = () => import('@/pages/public/Articles.vue').default
import Articles from '@/pages/public/Articles.vue'
// import SiteSectionCard from '@/pages/public/SiteSectionCard.vue'
// import OfferCard from '@/pages/public/OfferCard.vue'
import ArticleCard from '@/pages/public/ArticleCard.vue'
// import ServiceCard from '@/pages/public/ServiceCard.vue'
// import Main from '@/pages/public/Main.vue'
// import Clients from '@/pages/public/Clients.vue'
import Contacts from '@/pages/public/Contacts.vue'
// import Prices from '@/pages/public/Prices.vue'
// import About from '@/pages/public/About.vue'
// import DynamicPage from '@/pages/public/DynamicPage.vue'


export const EkosetRouter = [
  {
    name: 'main',
    path: '/',
    props: true,
    component: () => require(/* webpackChunkName: "main" */ "@/pages/public/Main.vue").default
    //   component: Main
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    name: 'about',
    path: '/about',
    props: true,
    component: () => require(/* webpackChunkName: "about" */ "@/pages/public/About.vue").default
    //  component: About 
  },
  {
    name: 'clients',
    path: '/:siteSection?/clients',
    props: true,
    component: () => require(/* webpackChunkName: "clients" */ "@/pages/public/Clients.vue").default
    // component: Clients
  },
  {
    name: 'contacts',
    path: '/:siteSection?/contacts',
    props: true,
    component: Contacts
  },
  {
    name: 'prices',
    path: '/:siteSection?/prices',
    props: true,
    component: () => require(/* webpackChunkName: "prices" */ "@/pages/public/Prices.vue").default
    //   component: Prices
  },

  {
    name: 'offer-card',
    path: '/:siteSection?/:clienttype?/offers/:offer?',
    props: true,
    component: () => require(/* webpackChunkName: "offerCard" */ "@/pages/public/OfferCard.vue").default
    //    component: OfferCard
  },
  {
    name: 'service-card',
    path: '/:siteSection?/services/:service',
    component: () => require(/* webpackChunkName: "serviceCard" */ "@/pages/public/ServiceCard.vue").default,
    //    component: ServiceCard,
    props: true
  },

  {
    name: 'news',
    path: '/:siteSection?/news',
    props: true,
    component: Articles
  },

  {
    name: 'news-card',
    path: '/:siteSection?/news/:article',
    component: ArticleCard,
    props: true
  },

  {
    name: 'activity-card',
    path: '/:siteSection',
    props: true,
    component: () => require(/* webpackChunkName: "siteSectionCard" */ "@/pages/public/SiteSectionCard.vue").default,
    //    component: SiteSectionCard
  },

  {
    name: 'custom-page',
    path: '/:siteSection?/pages/:page',
    props: true,
    component: () => require(/* webpackChunkName: "dynamicPage" */ "@/pages/public/DynamicPage.vue").default,
    // component: DynamicPage
  }

]
