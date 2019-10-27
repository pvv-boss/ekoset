<template>
  <section>
    <figure class="brc-page-image__wrapper">
      <img
        class="brc-page-image"
        :src="individualOffer.indOfferImgBig"
        :alt="individualOffer.indOfferName"
        itemprop="image"
      />
      <figcaption>{{individualOffer.indOfferName}}</figcaption>
      <h1 itemprop="headline name" class="brc-page-title">{{individualOffer.indOfferH1}}</h1>
    </figure>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <TopDynamicBlock
      :leftBlock="individualOffer.indOfferFreeText1"
      :rightBlock="individualOffer.indOfferFreeText2"
    ></TopDynamicBlock>

    <div class="brc-section__wrapper" v-if="serviceList.length > 0">
      <h2>Список услуг</h2>
      <ServiceList :serviceList="serviceList"></ServiceList>
    </div>
    <div class="brc-section__wrapper" v-if="serviceList.length > 0">
      <h2>Стоимость услуг</h2>
      <ServicePriceTable :servicePriceList="servicePriceList"></ServicePriceTable>
    </div>
    <div
      class="brc-section__wrapper"
      v-if="otherOfferList.length > 0 || otherOfferHeaderText === 'Комплексные решения'"
    >
      <h2>{{otherOfferHeaderText}}</h2>
      <component :is="otherOfferComponentName" :offerList="otherOfferList"></component>
    </div>
    <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import ServiceList from '@/components/public/ServiceList.vue'
import TopDynamicBlock from '@/components/public/TopDynamicBlock.vue'
import BusinessService from '../../models/ekoset/BusinessService'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'


@Component({
  components: {
    ServicePriceTable,
    ServiceList,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    TopDynamicBlock,
    BreadCrumbs,
    DynamicComponentsContainer
  }
})
export default class OfferCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private individualOffer: IndividualOffer = new IndividualOffer()
  private otherOfferList: IndividualOffer[] = []
  private serviceList: BusinessService[] = []
  private servicePriceList: BusinessService[] = []
  private breadCrumbList: any[] = []

  private offerHeaderText = ''
  private otherOfferHeaderText = ''
  private otherOfferComponentName = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const dynamicComponentInfo = await getServiceContainer().publicEkosetService.getDynamicComponentsAllInfo(siteSection)
    // Индивидуальное предложение Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let individualOffer: IndividualOffer
    let otherOfferList: Promise<IndividualOffer[]> = Promise.resolve([new IndividualOffer()])

    if (context.params.clienttype) {
      individualOffer = context.params.clienttype === 'business'
        ? await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug(siteSection)
        : await getServiceContainer().individualOfferService.getForPrivatePersonBySiteSectionSlug(siteSection)
    } else {
      individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
    }

    let offerHeaderText = individualOffer.indOfferName
    let otherOfferHeaderText = 'Комплексные решения'
    let otherOfferComponentName = 'ClientTypeOfferList'

    // Услуги Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let serviceList: Promise<BusinessService>
    let servicePriceList: Promise<BusinessService>
    if (context.params.clienttype) {
      serviceList = context.params.clienttype === 'business'
        ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(siteSection)
        : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(siteSection)

      servicePriceList = context.params.clienttype === 'business'
        ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(siteSection, false)
        : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(siteSection, false)

      otherOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(siteSection)
      offerHeaderText = context.params.clienttype === 'business' ? 'Услуги для Бизнеса' : 'Услуги для Частных лиц'
      otherOfferHeaderText = 'Индивидуальные предложения'
      otherOfferComponentName = 'BusinessTypeOfferList'
    } else {
      serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(siteSection, individualOffer.clActivityId)
      // servicePriceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(siteSection, individualOffer.indOfferUrl, false)
    }

    // const data = await Promise.all([serviceList, otherOfferList, servicePriceList])
    const data = await Promise.all([serviceList, otherOfferList])

    return {
      individualOffer,
      dynamicComponentInfo,
      serviceList: data[0],
      offerHeaderText,
      otherOfferHeaderText,
      otherOfferComponentName,
      otherOfferList: data[1],
      servicePriceList: data[0]
    }
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
    this.breadCrumbList.push({ name: this.offerHeaderText, link: '' })
  }

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }
}
</script>
