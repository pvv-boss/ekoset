<template>
  <div class="brc-page-container">
    <LazyTheLayoutHeader></LazyTheLayoutHeader>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <LazyTheMessagesAriseBlock></LazyTheMessagesAriseBlock>
    <LazyTheLayoutFooter v-once></LazyTheLayoutFooter>
    <client-only>
      <LazyBaseBackToTop></LazyBaseBackToTop>
    </client-only>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
