<template>
  <main>
    <TheDynamicBanner :banners-info="bannersInfo"></TheDynamicBanner>
    <SiteSectionList :site-section-list="siteSectionItems"></SiteSectionList>
    <DynamicComponentsContainer
      :dynamic-component-info="dynamicComponentInfo"
    ></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SeoMeta from '@/models/ekoset/SeoMeta'
import { Context } from "@nuxt/types";
import SiteSection from '@/models/ekoset/SiteSection'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SitePage, { SitePageType } from '@/models/SitePage'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import BannersInfo from '@/models/ekoset/BannersInfo'
import { ServiceRegistry } from '@/ServiceRegistry';
import PublicEkosetService from '@/services/PublicEkosetService';
import TopMenuService from '@/services/TopMenuService';
import DynamicComponentsService from '@/services/DynamicComponentsService';
import MediaService from '@/services/MediaService';


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

  private async asyncData (context: Context) {
    const siteSectionItems = ServiceRegistry.instance.getService(PublicEkosetService).getSiteSections()

    const dynamicComponentInfo = ServiceRegistry.instance.getService(DynamicComponentsService).getSitePageDynamicComponents(SitePageType.MAIN)
    const sitePageInfo = ServiceRegistry.instance.getService(TopMenuService).getSitePageById(SitePageType.MAIN)

    const bannersInfo = ServiceRegistry.instance.getService(MediaService).getBannersForMainPage()

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
