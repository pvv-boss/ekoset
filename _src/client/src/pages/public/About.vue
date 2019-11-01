<template>
  <section>
    <figure class="brc-page-image__wrapper">
      <img
        alt="Экосеть"
        itemprop="image"
        src="/images/start-page-banner.jpg"
        class="brc-page-image"
      />
      <figcaption>Экосеть</figcaption>
      <h1 itemprop="headline name" class="brc-page-title">О компании</h1>
    </figure>
    <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import FreeContentBlock from '@/components/FreeContentBlock.vue'

@Component({
  components: {
    DynamicComponentsContainer,
    BreadCrumbs,
    FreeContentBlock
  }
})
export default class About extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getTopMenuDynamicComponents()
    return {
      dynamicComponentInfo
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


  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }
}
</script>
