<template>
  <section>
    <h1 itemprop="headline name">Клиенты</h1>
    <ClientList></ClientList>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

import ClientList from '@/components/public/ClientList.vue'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import Partner from '@/models/ekoset/Partner'

@Component({
  components: {
    ClientList,
    TheShared
  }
})
export default class Clients extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private clientItems: Partner[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)

    const clientList = getServiceContainer().publicEkosetService.getPartners()

    const data = await Promise.all([clientList])
    return {
      apiSharedData,
      clientItems: data[0]
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
