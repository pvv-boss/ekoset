<template>
  <section>
    <h1 itemprop="headline name">Контакты</h1>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'

@Component({
  components: {
    TheShared
  }
})
export default class Contacts extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    return {
      apiSharedData
    }
  }

  private head () {
    return {
      title: 'Экосеть',// this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
