<template>
  <main>
    <TheBanner
      :h1="siteSectionItem.siteSectionH1"
      :alt="siteSectionItem.siteSectionName"
      :imageSrc="siteSectionItem.siteSectionImgBig"
    ></TheBanner>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SiteSection from '@/models/ekoset/SiteSection'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import TheBanner from '@/components/header/TheBanner.vue'

@Component({
  components: {
    DynamicComponentsContainer,
    BreadCrumbs,
    TheBanner
  }
})
export default class SiteSectionCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private siteSectionItem: SiteSection = new SiteSection()
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSiteSectionDynamicComponentsInfo(context.params.siteSection)
    const siteSectionItem = getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)

    const data = await Promise.all([siteSectionItem, dynamicComponentInfo])

    return {
      siteSectionItem: data[0],
      dynamicComponentInfo: data[1]
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

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }
}
</script>
