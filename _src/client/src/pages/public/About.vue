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
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import SitePage, { SitePageType } from '@/models/SitePage'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import TopMenuService from '@/services/TopMenuService'
import { ServiceRegistry } from '@/ServiceRegistry'
import DynamicComponentsService from '@/services/DynamicComponentsService'
import { Context } from "@nuxt/types";

@Component
export default class About extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private sitePageInfo: SitePage = new SitePage()
  private breadCrumbList: any[] = []
  private routeFullPath = ''

  private async asyncData (context: Context) {
    const dynamicComponentInfo = context.$serviceRegistry.getService(DynamicComponentsService).getSitePageDynamicComponents(SitePageType.ABOUT)
    const sitePageInfo = context.$serviceRegistry.getService(TopMenuService).getSitePageById(SitePageType.ABOUT)
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
  private async configBreadCrumbs () {
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
