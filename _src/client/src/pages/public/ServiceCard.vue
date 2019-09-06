<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">{{businessService.businessServiceName}}</h1>
    <figure>
      <img
        class="brc-page-img"
        :src="businessService.businessServiceImgBig"
        :alt="businessService.businessServiceName"
        itemprop="image"
      />
      <figcaption>{{businessService.businessServiceName}}</figcaption>
    </figure>
    <TopDynamicBlock
      :leftBlock="businessService.businessServiceFreeText1"
      :rightBlock="businessService.businessServiceFreeText2"
    ></TopDynamicBlock>

    <div class="brc-section__wrapper" v-if="childServiceList.length > 0">
      <h2>Список услуг</h2>
      <ServiceList :serviceList="childServiceList"></ServiceList>
    </div>

    <div class="brc-section__wrapper">
      <h2>Стоимость услуг</h2>
      <ServicePriceTable :servicePriceList="priceServiceList"></ServicePriceTable>
    </div>

    <div class="brc-section__wrapper" v-if="busineesTypeOfferList.length > 0">
      <h2>Индивидуальные предложения</h2>
      <BusinessTypeOfferList :offerList="busineesTypeOfferList"></BusinessTypeOfferList>
    </div>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import BusinessService from '@/models/ekoset/BusinessService'
import ServiceList from '@/components/public/ServiceList.vue'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import TopDynamicBlock from '@/components/public/TopDynamicBlock.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { returnStatement } from '@babel/types';

@Component({
  components: {
    TheShared,
    ServiceList,
    ServicePriceTable,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    TopDynamicBlock,
    BreadCrumbs
  }
})
export default class ServiceCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private busineesTypeOfferList: IndividualOffer[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection, context.params.service)
    const businessService = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const childServiceList = getServiceContainer().businessServiceService.getChildServicesByParentId(businessService.businessServiceId)
    const busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)

    const data = await Promise.all([childServiceList, busineesTypeOfferList])

    return {
      apiSharedData,
      businessService,
      childServiceList: data[0],
      busineesTypeOfferList: data[1]
    }
  }

  private get priceServiceList () {
    return this.childServiceList.length > 0 ? this.childServiceList : [this.businessService]
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSectionSlug) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'activity-card', params: { siteSection: siteSectionSlug } })
    }
    this.breadCrumbList.push({ name: this.businessService.businessServiceName, link: '' })
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
