<template>
  <section>
    <figure class="brc-page-image__wrapper">
      <img
        class="brc-page-image"
        :src="businessService.businessServiceImgBig"
        :alt="businessService.businessServiceName"
        itemprop="image"
      />
      <figcaption>{{businessService.businessServiceName}}</figcaption>
      <h1 itemprop="headline name" class="brc-page-title">{{businessService.businessServiceName}}</h1>
    </figure>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
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
      <!-- <no-ssr> -->
      <ServicePriceTable :servicePriceList="getPriceServiceList"></ServicePriceTable>
      <!-- </no-ssr> -->
    </div>

    <div class="brc-section__wrapper" v-if="busineesTypeOfferList.length > 0">
      <h2>Индивидуальные предложения</h2>
      <BusinessTypeOfferList :offerList="busineesTypeOfferList"></BusinessTypeOfferList>
    </div>
    <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
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
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'

@Component({
  components: {
    ServiceList,
    ServicePriceTable,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    TopDynamicBlock,
    BreadCrumbs
  }
})
export default class ServiceCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private priceServiceList: BusinessService[] = []
  private busineesTypeOfferList: IndividualOffer[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const businessService = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const serviceIdForRelations = !!businessService.businessServiceParentId && businessService.businessServiceParentId > 0 ? businessService.businessServiceParentId : businessService.businessServiceId
    const dynamicComponentInfo = getServiceContainer().publicEkosetService.getDynamicComponentsInfo(context.params.siteSection, 'slug-' + serviceIdForRelations)
    const childServiceList = getServiceContainer().businessServiceService.getChildServicesByParentId(businessService.businessServiceId)
    const busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)

    const data = await Promise.all([childServiceList, busineesTypeOfferList, dynamicComponentInfo])

    return {
      dynamicComponentInfo: data[2],
      businessService,
      childServiceList: data[0],
      busineesTypeOfferList: data[1]
    }
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  private get getPriceServiceList () {
    return [...this.childServiceList, this.businessService]
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

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.brc-service-img {
  width: 100%;
}
</style>
