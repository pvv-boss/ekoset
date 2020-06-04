const isDev = process.env.NODE_ENV !== 'production'

const config = {
  mode: 'universal',
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
    }
    ],

    link: [
      // {
      //   rel: 'preload',
      //   href: '//code-ya.jivosite.com/widget/AMTXfSmabC',
      //   as: 'script'
      // },
      {
        rel: 'preload',
        href: '//cdn.materialdesignicons.com/5.1.45/css/materialdesignicons.min.css',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: '//cdn.materialdesignicons.com/5.1.45/css/materialdesignicons.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/buefy/dist/buefy.min.css',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png'
      }
    ],

    script: [
      {
        // async: '',
        // src: '//code-ya.jivosite.com/widget/AMTXfSmabC'
      }
    ],

    bodyAttrs: {
      itemscope: '',
      itemtype: 'https://schema.org/WebPage'
    }
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
      src: '@/plugins/vue-good-table'
    },
    {
      src: '@/plugins/dragable-plugin'
    },
    {
      src: '@/plugins/image-lazy-load'
    },
    {
      src: '@/plugins/brc-buefy-plugin'
    }
  ],

  router: {
    middleware: ['needAuthorize', 'baseMiddleware']
  },

  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true,
      eslint: true
    }]
  ],

  modules: [
    'nuxt-purgecss',
    'nuxt-webfontloader',
    ['@nuxtjs/router', {
      path: 'src/routers',
      fileName: 'index.ts'
    }],
    ['@naumstory/nuxtjs-yandex-metrika',
      {
        id: '64542580',
        webvisor: false,
        clickmap: true,
        useCDN: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }]
  ],

  build: {
    crossorigin: true,
    babel: {
      plugins: [
        ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }]
      ]
    },
    // analyze: true,
    extractCSS: true,

    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true
        }
      }
    }),

    optimization: {
      minimize: !isDev
    },

    splitChunks: {
      layouts: true,
      pages: true,
      commons: true
    },

    filenames: {
      css: ({
        isDev
      }) => isDev ? '[name].css' : '[contenthash].css',
    },

    extend (config, {
      isDev,
      isClient
    }) {
      return config
    },
  },

  render: {
    compressor: false,
    resourceHints: false,
    etag: false,
    static: {
      etag: false
    }
  },

  purgeCSS: {
    mode: 'postcss',
    // whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, , /file.*?$/, /grid.*?$/, /help.*?$/, ]
    whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, /ql.*?$/, /theme.*?$/],
    whitelist: ['label', 'field-label']
  },

  webfontloader: {
    events: false,
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
