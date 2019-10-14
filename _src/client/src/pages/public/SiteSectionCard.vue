<template>
  <section>
    <figure class="brc-page-image__wrapper">
      <img
        class="brc-page-image"
        :src="siteSectionItem.siteSectionImgBig"
        :alt="siteSectionItem.siteSectionName"
        itemprop="image"
      />
      <figcaption>{{siteSectionItem.siteSectionName}}</figcaption>
      <h1 itemprop="headline name" class="brc-page-title">{{siteSectionItem.siteSectionName}}</h1>
    </figure>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <TopDynamicBlock
      :leftBlock="siteSectionItem.siteSectionFreeText1"
      :rightBlock="siteSectionItem.siteSectionFreeText2"
    ></TopDynamicBlock>

    <div class="brc-section__wrapper">
      <h2 v-if="serviceList.length>0">Услуги</h2>
      <ServiceList v-if="serviceList.length>0" :serviceList="serviceList"></ServiceList>
    </div>
    <div class="brc-section__wrapper">
      <h2>Комплексные решения</h2>
      <ClientTypeOfferList></ClientTypeOfferList>
    </div>
    <div class="brc-section__wrapper">
      <h2 v-if="busineesTypeOfferList.length>0">Индивидуальные предложения</h2>
      <BusinessTypeOfferList
        v-if="busineesTypeOfferList.length>0"
        :offerList="busineesTypeOfferList"
      ></BusinessTypeOfferList>
    </div>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import SiteSection from '@/models/ekoset/SiteSection'
import TheShared from '@/components/TheShared.vue'
import ServiceList from '@/components/public/ServiceList.vue'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import BusinessService from '@/models/ekoset/BusinessService'
import TopDynamicBlock from '@/components/public/TopDynamicBlock.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'

@Component({
  components: {
    TheShared,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    ServiceList,
    TopDynamicBlock,
    BreadCrumbs
  }
})
export default class SiteSectionCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceList: BusinessService[] = []
  private busineesTypeOfferList: IndividualOffer[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const apiSharedData = getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSectionItem = getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)

    const serviceList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.siteSection)
    const busineesTypeOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)
    const data = await Promise.all([siteSectionItem, serviceList, busineesTypeOfferList, apiSharedData])

    return {
      siteSectionItem: data[0],
      serviceList: data[1],
      busineesTypeOfferList: data[2],
      apiSharedData: data[3]
    }
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    this.breadCrumbList.push({ name: siteSectionName, link: '' })
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
