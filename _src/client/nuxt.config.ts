import NuxtConfiguration from '@nuxt/config'
import webpack = require('webpack')

const config: NuxtConfiguration = {

  mode: 'universal',
  srcDir: 'src/',

  head: {
    title: 'Экосеть',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'Description', content: 'Экосеть' },
      { name: 'Keywords', content: 'Экосеть' },
      { name: 'theme-color', content: '#317EFB' },
      { hid: 'og:title', property: 'og:title', content: 'Экосеть' },
      { hid: 'og:image', property: 'og:image', content: 'Экосеть' },
      { hid: 'og:description', property: 'og:description', content: 'Экосеть' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: 'Экосеть' },
      { hid: 'og:image:type', property: 'og:image:type', content: 'image/png' },
      { hid: 'og:image:width', property: 'og:image:width', content: '400' },
      { hid: 'og:image:height', property: 'og:image:height', content: '300' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: 'Экосеть' }
    ],

    script: [
      { src: 'https://unpkg.com/vue/dist/vue.runtime.min.js' },
      { src: 'https://unpkg.com/vue-router/dist/vue-router.min.js' },
      { src: 'https://unpkg.com/vuex/dist/vuex.min.js' },
      { src: 'https://unpkg.com/axios/dist/axios.min.js' },
      { src: 'https://unpkg.com/quill/dist/quill.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/vue-quill-editor' },
      { src: 'https://unpkg.com/quill-image-resize-module/image-resize.min.js' }
    ],

    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&&display=swap&subset=cyrillic' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.core.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.snow.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/quill/dist/quill.bubble.css' },
      { rel: 'stylesheet', href: '/_nuxt/app.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    }
  ],

  router: {
    middleware: ['needAuthorize', 'setPageTitle']
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
    whitelistPatterns: [/el.*?$/, /brc.*?$/, /ql.*?$/]
  },

  server: {
    port: 8010,
    host: 'localhost'
  }
}

export default config
