<template>
  <section>
    <h1 itemprop="headline name">{{siteSectionItem.siteSectionName}}</h1>
    <figure>
      <img
        :src="siteSectionItem.siteSectionImgBig"
        :alt="siteSectionItem.siteSectionName"
        itemprop="image"
      />
      <figcaption>{{siteSectionItem.siteSectionName}}</figcaption>
    </figure>
    <div>Описание раздела</div>
    <ServiceList :serviceList="serviceList"></ServiceList>
    <h2>Комплексные решения</h2>
    <ClientList :clientList="clientList"></ClientList>
    <h2>Индивидуальные предложения</h2>
    <ClientTypeOfferList :offerList="offerList"></ClientTypeOfferList>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SiteSection from '../../models/ekoset/SiteSection'
import TheShared from '@/components/TheShared.vue'
import ServiceList from '@/components/public/ServiceList.vue'
import ClientList from '@/components/public/ClientList.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import BusinessService from '../../models/ekoset/BusinessService'

@Component({
  components: {
    TheShared,
    ClientList,
    ClientTypeOfferList,
    ServiceList
  }
})
export default class SiteSectionCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceList: BusinessService[] = []
  private offerList: IndividualOffer[] = []
  private clientList: IndividualOffer[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    const siteSectionItem = getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.activity)
    const serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.activity)
    //TODO: типы клиентов - модель и сервисы
    const offerList = getServiceContainer().individualOfferService.getBySiteSectionSlug(context.params.activity)

    const data = await Promise.all([siteSectionItem, serviceList, offerList])

    return {
      apiSharedData,
      siteSectionItem: data[0],
      serviceList: data[1],
      offerList: data[2]
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
