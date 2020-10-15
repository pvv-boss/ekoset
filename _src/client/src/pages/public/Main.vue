<template>
  <main>
    <LazyTheDynamicBanner :banners-info="bannersInfo"></LazyTheDynamicBanner>
    <LazySiteSectionList
      :site-section-list="siteSectionItems"
    ></LazySiteSectionList>
    <DynamicComponentsContainer
      :dynamic-component-info="dynamicComponentInfo"
    ></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SeoMeta from '@/models/ekoset/SeoMeta'

import SiteSection from '@/models/ekoset/SiteSection'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SitePage, { SitePageType } from '@/models/SitePage'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import BannersInfo from '@/models/ekoset/BannersInfo'


@Component
export default class Main extends Vue {
  private siteSectionItems: SiteSection[] = []
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private sitePageInfo: SitePage = new SitePage()
  private breadCrumbList: any[] = []
  private routeFullPath = ''
  private bannersInfo: BannersInfo[] = []

  private head () {
    return MetaTagsBuilder.head(this.sitePageInfo, this.routeFullPath)
  }

  private async asyncData (context: NuxtContext) {
    const siteSectionItems = getServiceContainer().publicEkosetService.getSiteSections()
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.MAIN)
    const sitePageInfo = getServiceContainer().topMenuService.getSitePageById(SitePageType.MAIN)

    const bannersInfo = getServiceContainer().mediaService.getBannersForMainPage()

    const data = await Promise.all([siteSectionItems, dynamicComponentInfo, sitePageInfo, bannersInfo])
    return {
      siteSectionItems: data[0],
      dynamicComponentInfo: data[1],
      sitePageInfo: data[2],
      routeFullPath: context.route.fullPath,
      bannersInfo: data[3]
    }
  }
}
</script>
