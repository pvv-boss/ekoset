<template>
  <section class="brc-admin-container" :class="{sidebarclose:!sidebaropen}">
    <TheAdminSideBar :sidebaropen="sidebaropen" class="brc-admin-container__nav"></TheAdminSideBar>
    <TheAdminLayoutHeader @humburger:open="sidebaropen=$event" class="brc-admin-container__header"></TheAdminLayoutHeader>
    <main class="brc-admin-container__content">
      <nuxt></nuxt>
    </main>
    <client-only>
      <BaseBackToTop></BaseBackToTop>
    </client-only>
  </section>
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
  private sidebaropen = true
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
.brc-admin-container {
  display: grid;
  grid-template-rows: 64px calc(100vh - 64px);
  // grid-template-columns: 260px 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'nav header'
    'nav content';

  // &.sidebarclose {
  //   grid-template-columns: 0px 1fr;
  // }
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
