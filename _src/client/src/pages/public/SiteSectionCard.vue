<template>
  <section>
    <figure class="brc-page-image__wrapper">
      <img
        class="brc-page-image"
        :src="siteSectionItem.siteSectionImgBig"
        :alt="siteSectionItem.siteSectionName"
        itemprop="image"
      />
      <figcaption>{{siteSectionItem.siteSectionName}}</figcaption>
      <h1 itemprop="headline name" class="brc-page-title">{{siteSectionItem.siteSectionH1}}</h1>
    </figure>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>

    <div class="brc-section__wrapper">
      <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
    </div>
  </section>
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

@Component({
  components: {
    DynamicComponentsContainer,
    BreadCrumbs
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
