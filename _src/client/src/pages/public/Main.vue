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
      <h1 itemprop="headline name" class="brc-page-title">Экосеть</h1>
    </figure>
    <SiteSectionList :siteSectionList="siteSectionItems"></SiteSectionList>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Article from '@/models/ekoset/Article'
import SeoMeta from '@/models/ekoset/SeoMeta'

import SiteSectionList from '@/components/public/SiteSectionList.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import { SitePageType } from '@/models/SitePage'

@Component({
  components: {
    DynamicComponentsContainer,
    SiteSectionList
  }
})
export default class Main extends Vue {
  private siteSectionItems: SiteSection[] = []
  private dynamicComponentInfo: DynamicComponentInfo[] = []

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }

  private async asyncData (context: NuxtContext) {
    const siteSectionItems = getServiceContainer().publicEkosetService.getSiteSections()
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.MAIN)
    const data = await Promise.all([siteSectionItems, dynamicComponentInfo])
    return {
      dynamicComponentInfop: data[1],
      siteSectionItems: data[0]
    }
  }
}
</script>
