<template>
  <section>
    <h1 itemprop="headline name">Цены</h1>

    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'

@Component({
  components: {
    TheShared,
    BusinessTypeOfferList,
    ClientTypeOfferList
  }
})
export default class Prices extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()


  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)

    return {
      apiSharedData
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
