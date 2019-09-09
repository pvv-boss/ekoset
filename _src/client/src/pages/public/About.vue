<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">О компании</h1>
    <figure>
      <img
        alt="Экосеть"
        itemprop="image"
        src="/images/start-page-banner.jpg"
        class="brc-main-image"
      />
      <figcaption>Экосеть</figcaption>
    </figure>
    <TopDynamicBlock></TopDynamicBlock>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import TopDynamicBlock from '@/components/public/TopDynamicBlock.vue'

@Component({
  components: {
    TheShared,
    BreadCrumbs,
    TopDynamicBlock
  }
})
export default class About extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    return {
      apiSharedData
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
    this.breadCrumbList.push({ name: 'О компании', link: '' })
  }


  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
