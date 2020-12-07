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

  public head () {
    const canonical = 'https://ekoset.ru' + this.$route.path
    return {
      link: [
        {
          rel: 'canonical',
          href: canonical.endsWith('/') ? canonical.slice(0, -1) : canonical
        }
      ]
    }
  }

}
</script>
