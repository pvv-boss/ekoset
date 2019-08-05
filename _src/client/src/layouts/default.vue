<template>
  <div v-show="!loading" class="brc-page-container">
    <TheNewLayoutHeader></TheNewLayoutHeader>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <no-ssr>
      <TheLayoutFooter v-if="!loading"></TheLayoutFooter>
      <BaseCookieNotice></BaseCookieNotice>
      <ActivateAccauntNotice></ActivateAccauntNotice>
    </no-ssr>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheNewLayoutHeader from '@/components/TheNewLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import ActivateAccauntNotice from '@/components/user/ActivateAccauntNotice.vue'
import BaseCookieNotice from '@/components/base/BaseCookieNotice.vue'

@Component({
  components: {
    TheNewLayoutHeader,
    TheLayoutFooter,
    ActivateAccauntNotice,
    BaseCookieNotice,
    BreadCrumbs
  }
})
export default class DefaultLayout extends Vue {
  private loading = true

  private mounted () {
    this.$nextTick(() => {
      this.checkLoading()
    })
  }

  private checkLoading () {
    const el = document.getElementsByClassName('brc-body')
    if (el && el.length > 0) {
      this.loading = false
    } else {
      setTimeout(this.checkLoading, 1500)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
