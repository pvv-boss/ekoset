<template>
  <main>
    <h1 itemprop="headline name">Нас рекомендуют</h1>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <RecommendationList :brandList="brandList" :allBrandsPage="true"></RecommendationList>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import BusinessService from '@/models/ekoset/BusinessService'
import RecommendationList from '@/components/public/RecommendationList.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import { SitePageType } from '@/models/SitePage'

@Component({
  components: {
    DynamicComponentsContainer,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    BreadCrumbs,
    RecommendationList
  }
})
export default class Brands extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private breadCrumbList: any[] = []
  private brandList: Brands[] = []


  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.CLIENTS)
    const siteSection = context.params.siteSection
    let brandList: Promise<Brands>
    if (siteSection) {
      brandList = getServiceContainer().publicEkosetService.getBrandsBySiteSectionSlug(siteSection)
    } else {
      brandList = getServiceContainer().publicEkosetService.getBrandsForHomePage()
    }
    const data = await Promise.all([brandList, dynamicComponentInfo])

    return {
      dynamicComponentInfo: data[1],
      brandList: data[0]
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
    this.breadCrumbList.push({ name: 'Все рекомендации', link: '' })
  }
}
</script>
