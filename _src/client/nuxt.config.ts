import { NuxtConfig } from '@nuxt/types'


const config: NuxtConfig = {
  components: true,
  modern: true,
  srcDir: 'src/',
  loading: {
    color: '#ac1315'
  },

  head: {
    htmlAttrs: {
      prefix: 'og:http://ogp.me/ns#',
      lang: 'ru'
    },

    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: "yandex-verification",
      content: "5455f453f5d27f37"
    }
    ],



    link: [
      // {
      //   rel: 'preload',
      //   href: '//code-ya.jivosite.com/widget/AMTXfSmabC',
      //   as: 'script'
      // },
      // может в лайаут его ? В админский через head
      {
        rel: 'preload',
        href: "https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css",
        as: 'style'

        // this.onload=null;this.rel='stylesheet'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css'
      },

      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      },

      // {
      //   rel: 'preload',
      //   href: 'https://unpkg.com/buefy/dist/buefy.min.css',
      //   as: 'style'

      //   // this.onload
      // },

      // {
      //   rel: 'stylesheet',
      //   href: 'https://unpkg.com/buefy/dist/buefy.min.css',
      // }
    ],


    script: [
      //   // async: '',
      //   // src: '//code-ya.jivosite.com/widget/AMTXfSmabC'
      // }
    ],

    bodyAttrs: {
      itemscope: '',
      itemtype: 'https://schema.org/WebPage'
    },
  },

  pageTransition: {
    css: false
  },

  plugins: [
    {
      src: '@/plugins/initialize-app'
    },
    {
      src: '@/plugins/brc-dialog-plugin', mode: 'client'
    },
    {
      src: '@/plugins/vuelidate', mode: 'client'
    },
    {
      src: '@/plugins/brc-directives', mode: 'client'
    },
    {
      src: '@/plugins/yandex-share', mode: 'client'
    },
    {
      src: '@/plugins/brc-route-middleware'
    },
    {
      src: '@/plugins/brc-buefy-plugin'
    },
    {
      src: '@/plugins/vue-lazyload'
    }
  ],

  router: {
    prefetchLinks: false,
    middleware: ['needAuthorize', 'baseMiddleware']
  },

  buildModules: [
    'nuxt-webfontloader',
    'nuxt-purgecss',
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true,
      eslint: true
    }]
  ],

  modules: [
    ['@nuxtjs/router', {
      path: 'src/routers',
      fileName: 'index.ts'
    }]
    ,
    ['@nuxtjs/yandex-metrika',
      {
        id: '64542580',
        webvisor: true,
        clickmap: true,
        useCDN: true,
        trackLinks: true,
        accurateTrackBounce: false
      }]
  ],


  build: {
    extractCSS: true,
    optimizeCSS: true,

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },

    filenames: {
      css: ({
        isDev
      }) => isDev ? '[name].css' : '[contenthash].css',
    },
  },


  render: {
    compressor: false,
    resourceHints: true,
    etag: false
  },

  purgeCSS: {
    mode: 'postcss',
    // whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, , /file.*?$/, /grid.*?$/, /help.*?$/, ]
    whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, /ql.*?$/, /theme.*?$/],
    whitelist: ['label', 'field-label']
  },

  webfontloader: {
    google: {
      families: ['Roboto:400,500:cyrillic&display=swap']
    }
  },

  server: {
    port: 8010,
    host: 'localhost'
  }
}

export default config
