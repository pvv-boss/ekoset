<template>
  <main>
    <TheBanner
      :h1="sitePageInfo.sitePageH1"
      :alt="sitePageInfo.sitePageName"
      :image-src="sitePageInfo.sitePageBanner"
    ></TheBanner>
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

import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SitePage, { SitePageType } from '@/models/SitePage'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'

@Component
export default class Clients extends Vue {
  private breadCrumbList: any[] = []
  private sitePageInfo: SitePage = new SitePage()
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private clients = []
  private routeFullPath = ''


  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.CLIENTS)
    const sitePageInfo = getServiceContainer().topMenuService.getSitePageById(SitePageType.CLIENTS)

    const data = await Promise.all([dynamicComponentInfo, sitePageInfo])
    return {
      dynamicComponentInfo: data[0],
      sitePageInfo: data[1],
      routeFullPath: context.route.fullPath
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
    this.breadCrumbList.push({ name: this.sitePageInfo.sitePageName, link: '' })
  }

  private head () {
    return MetaTagsBuilder.head(this.sitePageInfo, this.routeFullPath)
  }
}
</script>

