<template>
  <header class="brc-admin_page__header">
    <nuxt-link :to="{name: 'main'}" class="brc-logo_main" id="brc-page-header-main-logo">
      <img src="/images/logo.png" alt="Экосеть" />
    </nuxt-link>
    <h3>Здесь будет гамбургер для меню, ссылка на ЛК админа, заголовок, хлебные крошки...</h3>
  </header>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class TheAdminLayoutHeader extends Vue {

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-admin_page__header {
  height: min-content;
  padding: 15px;
  position: relative;

  > h3 {
    position: absolute !important;
    bottom: 50% !important;
    left: 40% !important;
  }

  .a,
  img {
    max-height: 64px;
  }
}
</style>