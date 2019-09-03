<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">Цены</h1>
    <ServicePriceTable :servicePriceList="serviceList" :allPricesPage="true"></ServicePriceTable>
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
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import BusinessService from '@/models/ekoset/BusinessService'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'

@Component({
  components: {
    TheShared,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    BreadCrumbs,
    ServicePriceTable
  }
})
export default class Prices extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private breadCrumbList: Object[] = []
  private siteSection: string = ''
  private serviceList: BusinessService[] = []


  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSection = context.params.siteSection
    let serviceList: Promise<BusinessService>
    if (siteSection) {
      serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSection)
    }
    else {
      serviceList = getServiceContainer().businessServiceService.getMainList()
    }
    const data = await Promise.all([serviceList])

    return {
      apiSharedData,
      siteSection,
      serviceList: data[0]
    }
  }

  private async mounted () {
    getModule(AppStore, this.$store).changeCurrentSiteSection(this.siteSection)
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (this.siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: 'Цены', link: '' })
      });
    }
    else {
      this.breadCrumbList.push({ name: 'Цены', link: '' })
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
