<template>
  <div class="brc-admin-container">
    <client-only>
      <TheAdminSideBar class="brc-admin-container__nav"></TheAdminSideBar>
      <TheAdminLayoutHeader v-once class="brc-admin-container__header"></TheAdminLayoutHeader>
    </client-only>
    <section class="brc-admin-container__content">
      <nuxt></nuxt>
    </section>
    <client-only>
      <BaseBackToTop></BaseBackToTop>
    </client-only>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheAdminLayoutHeader from '@/components/TheAdminLayoutHeader.vue'
import TheAdminSideBar from '@/components/TheAdminSideBar.vue'
import BaseBackToTop from '@/components/base/BaseBackToTop.vue'

@Component({
  components: {
    TheAdminLayoutHeader,
    BaseBackToTop,
    TheAdminSideBar
  }
})
export default class AdminLayout extends Vue {
  private isVisibleNavigation = true


}
</script>

<style lang="scss">
@import '@/styles/index.scss';
.brc-admin-container {
  display: grid;
  grid-template-rows: 64px calc(100vh - 64px);
  grid-template-columns: 260px 1fr;
  grid-template-areas:
    'nav header'
    'nav content';
}

.brc-admin-container__nav {
  grid-area: nav;
}

.brc-admin-container__header {
  grid-area: header;
}

.brc-admin-container__content {
  grid-area: content;
  background-color: #e9ebee;
  overflow: auto; /* overflow condition on parent */
}
</style>
