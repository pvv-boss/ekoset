<template>
  <section>
    <h1 itemprop="headline name">Клиенты</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import MessageForm from '@/components/public/MessageForm.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import Partner from '@/models/ekoset/Partner'

@Component({
  components: {
    MessageForm
  }
})
export default class Clients extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private clientItems: Partner[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData()

    const clientList = getServiceContainer().publicEkosetService.getPartners()

    const data = await Promise.all([clientList])
    return {
      apiSharedData,
      clientItems: data[0]
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
