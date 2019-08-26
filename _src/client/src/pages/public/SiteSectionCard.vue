<template>
  <section>
    <h1 itemprop="headline name">{{siteSectionItem.siteSectionName}}</h1>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SiteSection from '../../models/ekoset/SiteSection';
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData';

@Component({
  components: {
    TheShared
  }
})
export default class SiteSectionCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private siteSectionItem: SiteSection = new SiteSection()

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    const siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.activity)

    return {
      apiSharedData,
      siteSectionItem
    }
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
