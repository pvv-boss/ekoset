<template>
  <section>
    <h1 itemprop="headline name">Цены</h1>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <client-only>
      <ServicePriceTable :servicePriceList="serviceList" :allPricesPage="true"></ServicePriceTable>
    </client-only>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import BusinessService from '@/models/ekoset/BusinessService'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'

@Component({
  components: {
    DynamicComponentsContainer,
    BreadCrumbs,
    ServicePriceTable
  }
})
export default class Prices extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private breadCrumbList: any[] = []
  private serviceList: BusinessService[] = []


  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const dynamicComponentInfo = !!siteSection ? getServiceContainer().dynamicComponentsService.getSiteSectionDynamicComponentsInfo(siteSection) : getServiceContainer().dynamicComponentsService.getTopMenuDynamicComponents()
    let serviceList: Promise<BusinessService>
    if (!!siteSection) {
      serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSection, false)
    } else {
      serviceList = getServiceContainer().businessServiceService.getMainList()
    }
    const data = await Promise.all([serviceList, dynamicComponentInfo])

    return {
      dynamicComponentInfo: data[1],
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

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }
}
</script>
