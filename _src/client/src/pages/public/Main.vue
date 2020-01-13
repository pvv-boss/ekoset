<template>
  <section>
    <TheBanner
      :h1="sitePageInfo.sitePageH1"
      :alt="sitePageInfo.sitePageName"
      :imageSrc="sitePageInfo.sitePageBanner"
    ></TheBanner>
    <SiteSectionList :siteSectionList="siteSectionItems"></SiteSectionList>
    <div class="brc-section__wrapper">
      <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SeoMeta from '@/models/ekoset/SeoMeta'

import SiteSectionList from '@/components/public/SiteSectionList.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import SitePage, { SitePageType } from '@/models/SitePage'
import TheBanner from '@/components/header/TheBanner.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'


@Component({
  components: {
    DynamicComponentsContainer,
    SiteSectionList,
    TheBanner,
    BreadCrumbs
  }
})
export default class Main extends Vue {
  private siteSectionItems: SiteSection[] = []
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private sitePageInfo: SitePage = new SitePage()
  private breadCrumbList: any[] = []

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }

  private async asyncData (context: NuxtContext) {
    const siteSectionItems = getServiceContainer().publicEkosetService.getSiteSections()
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.MAIN)
    const sitePageInfo = getServiceContainer().topMenuService.getSitePageById(SitePageType.MAIN)

    const data = await Promise.all([siteSectionItems, dynamicComponentInfo, sitePageInfo])
    return {
      siteSectionItems: data[0],
      dynamicComponentInfo: data[1],
      sitePageInfo: data[2]
    }
  }
}
</script>
