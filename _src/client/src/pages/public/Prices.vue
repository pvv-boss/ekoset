<template>
  <section>
    <TheBanner
      :h1="sitePageInfo.sitePageH1"
      :alt="sitePageInfo.sitePageName"
      :imageSrc="sitePageInfo.sitePageBanner"
    ></TheBanner>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <client-only>
      <div class="brc-section__wrapper">
        <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
      </div>
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
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import SitePage, { SitePageType } from '@/models/SitePage'
import TheBanner from '@/components/header/TheBanner.vue'

@Component({
  components: {
    DynamicComponentsContainer,
    BreadCrumbs,
    TheBanner
  }
})
export default class Prices extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private breadCrumbList: any[] = []
  private sitePageInfo: SitePage = new SitePage()


  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const dynamicComponentInfo = !!siteSection
      ? getServiceContainer().dynamicComponentsService.getSitePageDynamicComponentsWithSiteSection(siteSection, SitePageType.PRICES)
      : getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.PRICES)

    const sitePageInfo = getServiceContainer().topMenuService.getSitePageById(SitePageType.PRICES)

    const data = await Promise.all([dynamicComponentInfo, sitePageInfo])

    return {
      dynamicComponentInfo: data[0],
      sitePageInfo: data[1]
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
