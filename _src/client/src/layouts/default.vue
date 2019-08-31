<template>
  <div class="brc-page-container">
    <TheLayoutHeader></TheLayoutHeader>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <TheLayoutFooter></TheLayoutFooter>
    <no-ssr>
      <BaseCookieNotice></BaseCookieNotice>
      <BaseBackToTop></BaseBackToTop>
      <!-- <ActivateAccauntNotice></ActivateAccauntNotice> -->
    </no-ssr>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheLayoutHeader from '@/components/header/TheLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'
import ActivateAccauntNotice from '@/components/user/ActivateAccauntNotice.vue'
import BaseCookieNotice from '@/components/base/BaseCookieNotice.vue'
import BaseBackToTop from '@/components/base/BaseBackToTop.vue'
import { NuxtContext } from 'vue/types/options';

@Component({
  components: {
    TheLayoutHeader,
    TheLayoutFooter,
    ActivateAccauntNotice,
    BaseBackToTop,
    BaseCookieNotice
  }
})
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
