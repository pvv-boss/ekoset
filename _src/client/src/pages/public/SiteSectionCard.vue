<template>
  <main>
    <TheDynamicBanner :banners-info="bannersInfo"></TheDynamicBanner>
    <BreadCrumbs :bread-crumbs="breadCrumbList"></BreadCrumbs>
    <DynamicComponentsContainer
      :dynamic-component-info="dynamicComponentInfo"
    ></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SiteSection from '@/models/ekoset/SiteSection'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SeoMeta from '@/models/ekoset/SeoMeta'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import BannersInfo from '@/models/ekoset/BannersInfo'

@Component
export default class SiteSectionCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private siteSectionItem: SiteSection = new SiteSection()
  private breadCrumbList: any[] = []
  private routeFullPath = ''
  private bannersInfo: BannersInfo[] = []

  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSiteSectionDynamicComponentsInfo(context.params.siteSection)
    const siteSectionItem = getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)
    const bannersInfo = getServiceContainer().mediaService.getBannersForSiteSection(getServiceContainer().mediaService.getIdBySlug(context.params.siteSection))

    const data = await Promise.all([siteSectionItem, dynamicComponentInfo, bannersInfo])

    return {
      siteSectionItem: data[0],
      dynamicComponentInfo: data[1],
      routeFullPath: context.route.fullPath,
      bannersInfo: data[2]
    }
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    this.breadCrumbList.push({ name: siteSectionName, link: '' })
  }

  private head () {
    return MetaTagsBuilder.head(this.siteSectionItem, this.routeFullPath)
  }
}
</script>
