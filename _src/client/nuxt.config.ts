import NuxtConfiguration from '@nuxt/config'
import webpack = require('webpack')

const config: NuxtConfiguration = {

  mode: 'universal',
  srcDir: 'src/',
  head: {
    htmlAttrs: {
      prefix: 'og:http://ogp.me/ns#'
    },

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],

    script: [
      { src: 'https://unpkg.com/vue/dist/vue.runtime.min.js' },
      { src: 'https://unpkg.com/vue-router/dist/vue-router.min.js' },
      { src: 'https://unpkg.com/vuex/dist/vuex.min.js' },
      { src: 'https://unpkg.com/axios/dist/axios.min.js' },
      { src: 'https://unpkg.com/quill/dist/quill.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/vue-quill-editor' },
      { src: 'https://unpkg.com/quill-image-resize-module/image-resize.min.js' },
      { src: 'https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js' },
      { src: 'https://yastatic.net/share2/share.js' },
    ],

    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&&display=swap&subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.core.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.snow.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.bubble.css' },
      { rel: 'stylesheet', href: '/_nuxt/app.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
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
      src: '@/plugins/nuxt-quill-plugin', mode: 'client'
    },
    {
      src: '@/plugins/brc-directives', mode: 'client'
    }
  ],

  router: {
    middleware: ['needAuthorize', 'baseMiddleware']
  },

  modules: [
    'nuxt-purgecss',
    ['@nuxtjs/router', { path: 'src/routers', fileName: 'index.ts' }]
  ],

  build: {
    extractCSS: true,
    filenames: {
      css: ({ isDev }) => isDev ? '[name].css' : 'app.css',
    },
    extend (config, { isDev, isClient }) {
      if (isClient) {
        config.externals = {
          'vue': 'Vue',
          'vuex': 'Vuex',
          'axios': 'axios',
          'vue-router': 'VueRouter',
          'Quill': 'Quill',
          'vue-quill-editor': 'VueQuillEditor',
          'quill-image-resize-module': 'ImageResize'
        }
      }
      return config
    }
  },

  purgeCSS: {
    mode: 'postcss',
    whitelistPatterns: [/el.*?$/, /brc.*?$/]
  },

  server: {
    port: 8010,
    host: 'localhost'
  }
}

export default config
