import webpack = require('webpack')

const config = {
  mode: 'universal',
  modern: true,
  srcDir: 'src/',
  loading: {
    color: '#ac1315'
  },

  head: {
    htmlAttrs: {
      prefix: 'og:http://ogp.me/ns#'
    },

    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
    ],

    script: [
      // { src: 'https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js' },
      // { src: 'https://yastatic.net/share2/share.js' }
    ],

    link: [{
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&&display=swap&subset=cyrillic'
    },
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/buefy/dist/buefy.min.css'
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.png'
    }
      // { rel: 'stylesheet', href: 'highlight.js/styles/atom-one-light.css' }
    ],

    bodyAttrs: {
      itemscope: '',
      itemtype: 'https://schema.org/WebPage'
    }
  },

  pageTransition: {
    css: false
  },

  plugins: [{
    src: '@/plugins/initialize-app'
  },
  {
    src: '@/plugins/brc-dialog-plugin',
    mode: 'client'
  },
  {
    src: '@/plugins/vuelidate',
    mode: 'client'
  },
  {
    src: '@/plugins/nuxt-quill-plugin',
    mode: 'client'
  },
  {
    src: '@/plugins/brc-directives',
    mode: 'client'
  },
  {
    src: '@/plugins/yandex-share',
    mode: 'client'
  },
  {
    src: '@/plugins/brc-route-middleware'
  },
  {
    src: '@/plugins/vue-good-table'
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
    ['@nuxtjs/router', {
      path: 'src/routers',
      fileName: 'index.ts'
    }],
    'nuxt-buefy'
  ],

  build: {
    // analyze: true,
    extractCSS: true,
    splitChunks: {
      layouts: true
    },

    filenames: {
      css: ({
        isDev
      }) => isDev ? '[contenthash].css' : '[contenthash].css',
    },

    extend (config, {
      isDev,
      isClient
    }) {
      return config
    },

    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },

  render: {
    compressor: false
  },

  purgeCSS: {
    mode: 'postcss',
    // whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, , /file.*?$/, /grid.*?$/, /help.*?$/, ]
    whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, /ql.*?$/, /theme.*?$/]
  },

  server: {
    port: 8010,
    host: 'localhost'
  }
}

export default config
