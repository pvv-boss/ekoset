<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>

    <h1 itemprop="headline name">{{offerHeaderText}}</h1>
    <figure>
      <img
        class="brc-page-img"
        :src="individualOffer.indOfferImgBig"
        :alt="individualOffer.indOfferName"
        itemprop="image"
      />
      <figcaption>{{individualOffer.indOfferName}}</figcaption>
    </figure>
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
      <ServicePriceTable :servicePriceList="serviceList"></ServicePriceTable>
    </div>
    <div
      class="brc-section__wrapper"
      v-if="otherOfferList.length > 0 || otherOfferHeaderText === 'Комплексные решения'"
    >
      <h2>{{otherOfferHeaderText}}</h2>
      <component :is="otherOfferComponentName" :offerList="otherOfferList"></component>
    </div>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
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


@Component({
  components: {
    TheShared,
    ServicePriceTable,
    ServiceList,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    TopDynamicBlock,
    BreadCrumbs
  }
})
export default class OfferCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private individualOffer: IndividualOffer = new IndividualOffer()
  private otherOfferList: IndividualOffer[] = []
  private serviceList: BusinessService[] = []
  private breadCrumbList: any[] = []

  private offerHeaderText = ''
  private otherOfferHeaderText = ''
  private otherOfferComponentName = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(siteSection)
    // Индивидуальное предложение Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let individualOffer: IndividualOffer
    let otherOfferList: Promise<IndividualOffer>

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
    otherOfferList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(siteSection)
    // Услуги Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let serviceList: Promise<BusinessService>
    if (context.params.clienttype) {
      serviceList = context.params.clienttype === 'business'
        ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(siteSection)
        : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(siteSection)

      offerHeaderText = context.params.clienttype === 'business' ? 'Услуги для Бизнеса' : 'Услуги для Частных лиц'
      otherOfferHeaderText = 'Индивидуальные предложения'
      otherOfferComponentName = 'BusinessTypeOfferList'
    } else {
      serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(siteSection, individualOffer.indOfferUrl)
    }

    const data = await Promise.all([serviceList, otherOfferList])

    return {
      individualOffer,
      apiSharedData,
      serviceList: data[0],
      offerHeaderText,
      otherOfferHeaderText,
      otherOfferComponentName,
      otherOfferList: data[1]
    }
  }

  private async mounted () {
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSectionName) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'activity-card', params: { siteSection: siteSectionSlug } })
      this.breadCrumbList.push({ name: this.offerHeaderText, link: '' })
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
