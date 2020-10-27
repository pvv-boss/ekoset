<template>
  <div class="brc-page-container">
    <TheLayoutHeader></TheLayoutHeader>
    <div class="brc-body">
      <nuxt></nuxt>
    </div>
    <TheMessagesAriseBlock></TheMessagesAriseBlock>
    <TheLayoutFooter v-once></TheLayoutFooter>
    <client-only>
      <BaseBackToTop></BaseBackToTop>
    </client-only>
  </div>
</template>

<script  lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {

}
</script>
