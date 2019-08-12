<template>
  <div class="brc-page-container">
    <TheLayoutHeader></TheLayoutHeader>
    <BreadCrumbs></BreadCrumbs>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <no-ssr>
      <TheLayoutFooter></TheLayoutFooter>
      <BaseCookieNotice></BaseCookieNotice>
      <ActivateAccauntNotice></ActivateAccauntNotice>
    </no-ssr>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheLayoutHeader from '@/components/header/TheLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import ActivateAccauntNotice from '@/components/user/ActivateAccauntNotice.vue'
import BaseCookieNotice from '@/components/base/BaseCookieNotice.vue'

@Component({
  components: {
    TheLayoutHeader,
    TheLayoutFooter,
    ActivateAccauntNotice,
    BaseCookieNotice,
    BreadCrumbs
  }
})
export default class DefaultLayout extends Vue {
}
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
