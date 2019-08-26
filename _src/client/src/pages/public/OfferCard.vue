<template>
  <section>
    <h1 itemprop="headline name">{{individualOffer.indOfferName}}</h1>
    <figure>
      <img
        :src="individualOffer.indOfferImgBig"
        :alt="individualOffer.indOfferName"
        itemprop="image"
      />
      <figcaption>{{individualOffer.indOfferName}}</figcaption>
    </figure>
    <div>Описание предложения</div>
    <h2>Список услуг</h2>
    <ServiceList :serviceList="serviceList"></ServiceList>
    <h2>Стоимость услуг</h2>
    <ServicePriceTable :servicePriceList="serviceList"></ServicePriceTable>
    <ServiceList :serviceList="serviceSecondList"></ServiceList>
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
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'
import ServiceList from '@/components/public/ServiceList.vue'
import BusinessService from '../../models/ekoset/BusinessService'

@Component({
  components: {
    TheShared,
    ServicePriceTable,
    ServiceList
  }
})
export default class OfferCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private individualOffer: IndividualOffer = new IndividualOffer()
  private serviceList: BusinessService[] = []
  private serviceSecondList: BusinessService[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    const individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
    const serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(context.params.activity, context.params.offer)
    const serviceSecondList = getServiceContainer().businessServiceService.getByClientTypeAndBySiteSectionSlug(context.params.activity, individualOffer.clClientId)

    const data = await Promise.all([serviceList, serviceSecondList])

    return {
      apiSharedData,
      individualOffer,
      serviceList: data[0],
      serviceSecondList: data[1]
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
