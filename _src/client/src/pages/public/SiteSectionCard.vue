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

    <h2>Услуги</h2>
    <ServiceList :serviceList="serviceList"></ServiceList>

    <h2>Комплексные решения</h2>
    <ClientTypeOfferList></ClientTypeOfferList>

    <h2>Индивидуальные предложения</h2>
    <BusinessTypeOfferList :offerList="busineesTypeOfferList"></BusinessTypeOfferList>

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
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import BusinessService from '../../models/ekoset/BusinessService'

@Component({
  components: {
    TheShared,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    ServiceList
  }
})
export default class SiteSectionCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceList: BusinessService[] = []
  private busineesTypeOfferList: IndividualOffer[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSectionItem = getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)

    const serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.siteSection)
    const busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)
    const data = await Promise.all([siteSectionItem, serviceList, busineesTypeOfferList])

    return {
      apiSharedData,
      siteSectionItem: data[0],
      serviceList: data[1],
      busineesTypeOfferList: data[2]
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
