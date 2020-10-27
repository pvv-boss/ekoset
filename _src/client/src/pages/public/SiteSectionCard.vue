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
import SiteSection from '@/models/ekoset/SiteSection'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import BannersInfo from '@/models/ekoset/BannersInfo'
import { Context } from "@nuxt/types";
import DynamicComponentsService from '@/services/DynamicComponentsService'
import { ServiceRegistry } from '@/ServiceRegistry'
import PublicEkosetService from '@/services/PublicEkosetService'
import MediaService from '@/services/MediaService'


@Component
export default class SiteSectionCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private siteSectionItem: SiteSection = new SiteSection()
  private breadCrumbList: any[] = []
  private routeFullPath = ''
  private bannersInfo: BannersInfo[] = []

  private async asyncData (context: Context) {
    const dynamicComponentInfo = ServiceRegistry.instance.getService(DynamicComponentsService).getSiteSectionDynamicComponentsInfo(context.params.siteSection)
    const siteSectionItem = ServiceRegistry.instance.getService(PublicEkosetService).getSiteSectionBySlug(context.params.siteSection)
    const bannersInfo = ServiceRegistry.instance.getService(MediaService).getBannersForSiteSection(ServiceRegistry.instance.getService(MediaService).getIdBySlug(context.params.siteSection))

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
