<template>
  <section>
    <h1 itemprop="headline name">Страница услуги</h1>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({
  components: {
    TheShared
  }
})
export default class ServiceCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private businessService: BusinessService = new BusinessService()

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity, context.params.service)
    const businessService = await getServiceContainer().businessServiceService.getBySlug(context.params.service)

    return {
      apiSharedData,
      businessService
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
