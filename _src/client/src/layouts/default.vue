<template>
  <div class="brc-page-container">
    <TheLayoutHeader></TheLayoutHeader>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <TheMessagesAriseBlock></TheMessagesAriseBlock>
    <TheLayoutFooter></TheLayoutFooter>
    <client-only>
      <!-- <BaseCookieNotice></BaseCookieNotice> -->
      <BaseBackToTop></BaseBackToTop>
      <!-- <ActivateAccauntNotice></ActivateAccauntNotice> -->
    </client-only>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheLayoutHeader from '@/components/header/TheLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'
import TheMessagesAriseBlock from '@/components/TheMessagesAriseBlock.vue'
import ActivateAccauntNotice from '@/components/user/ActivateAccauntNotice.vue'
import BaseCookieNotice from '@/components/base/BaseCookieNotice.vue'
import BaseBackToTop from '@/components/base/BaseBackToTop.vue'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    TheLayoutHeader,
    TheLayoutFooter,
    BaseBackToTop,
    TheMessagesAriseBlock
  }
})
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss">
@import '@/styles/index.scss';
</style>
