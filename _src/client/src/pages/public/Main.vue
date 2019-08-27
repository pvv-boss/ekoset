<template>
  <section>
    <h1 itemprop="headline name">Экосеть: главная страница</h1>
    <figure>
      <img alt="Экосеть" itemprop="image" />
      <figcaption>Экосеть</figcaption>
    </figure>
    <div>Описание главной страницы</div>
    <SiteSectionList :siteSectionList="siteSectionItems"></SiteSectionList>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Article from '@/models/ekoset/Article.ts'
import SeoMeta from '@/models/ekoset/SeoMeta.ts'

import TheShared from '@/components/TheShared.vue'
import SiteSectionList from '@/components/public/SiteSectionList.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import ClBrand from '@/models/ekoset/ClBrand'
import ApiSharedData from '@/models/ekoset/ApiSharedData'

@Component({
  components: {
    TheShared,
    SiteSectionList
  }
})
export default class Main extends Vue {
  private siteSectionItems: SiteSection[] = []
  private apiSharedData: ApiSharedData = new ApiSharedData()

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }

  private async asyncData (context: NuxtContext) {
    const siteSectionItems = await getServiceContainer().publicEkosetService.getSiteSections()
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    return {
      apiSharedData,
      siteSectionItems
    }
  }
}
</script>
