import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {

  mode: 'universal',

  srcDir: 'src/',

  plugins: [
    {
      src: '@/plugins/initialize-app'
    },
    {
      src: '@/plugins/brc-dialog-plugin', mode: 'client'
    },
    {
      src: '@/plugins/vuelidate', mode: 'client'
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
          'element-ui': 'ELEMENT'
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
    port: 8000,
    host: 'localhost'
  }
}

export default config
