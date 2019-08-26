<template>
  <section>
    <h1 itemprop="headline name">Индивидуальное предложение</h1>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import IndividualOffer from '@/models/ekoset/IndividualOffer'

@Component({
  components: {
    TheShared
  }
})
export default class OfferCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private individualOffer: IndividualOffer = new IndividualOffer()

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    const individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
    return {
      apiSharedData,
      individualOffer
    }
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
