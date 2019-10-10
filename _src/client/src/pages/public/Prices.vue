<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">Цены</h1>
    <no-ssr>
      <ServicePriceTable :servicePriceList="serviceList" :allPricesPage="true"></ServicePriceTable>
    </no-ssr>
    <TheShared :apiSharedData="apiSharedData" :showLetters="true"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
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
  private breadCrumbList: any[] = []
  private serviceList: BusinessService[] = []


  private async asyncData (context: NuxtContext) {
    const apiSharedData = getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSection = context.params.siteSection
    let serviceList: Promise<BusinessService>
    if (siteSection) {
      serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSection, false)
    } else {
      serviceList = getServiceContainer().businessServiceService.getMainList()
    }
    const data = await Promise.all([serviceList, apiSharedData])

    return {
      apiSharedData: data[1],
      serviceList: data[0]
    }
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSectionSlug) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'activity-card', params: { siteSection: siteSectionSlug } })
    }
    this.breadCrumbList.push({ name: 'Цены', link: '' })
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
