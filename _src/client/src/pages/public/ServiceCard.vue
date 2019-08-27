<template>
  <section>
    <h1 itemprop="headline name">{{businessService.businessServiceName}}</h1>
    <figure>
      <img
        :src="businessService.businessServiceImgBig"
        :alt="businessService.businessServiceName"
        itemprop="image"
      />
      <figcaption>{{businessService.businessServiceName}}</figcaption>
    </figure>
    <div>Описание услуги</div>
    <h2 v-if="childServiceList.Length > 0">Список услуг</h2>
    <ServiceList :serviceList="childServiceList"></ServiceList>
    <h2 v-if="childServiceList.Length > 0">Стоимость услуг</h2>
    <ServicePriceTable :servicePriceList="childServiceList"></ServicePriceTable>
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
import ServiceList from '@/components/public/ServiceList.vue'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'

@Component({
  components: {
    TheShared,
    ServiceList,
    ServicePriceTable
  }
})
export default class ServiceCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []

  private async asyncData (context: NuxtContext) {
    const businessService = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity, context.params.service)
    const childServiceList = getServiceContainer().businessServiceService.getChildServicesByParentId(businessService.businessServiceId)

    const data = await Promise.all([childServiceList])

    return {
      apiSharedData,
      businessService,
      childServiceList: data[0]
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
