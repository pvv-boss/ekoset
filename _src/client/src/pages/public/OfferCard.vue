<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>

    <h1 itemprop="headline name">{{offerHeaderText}}</h1>
    <figure>
      <img
        class="brc-page-img"
        src="/images/banner-service-1.jpg"
        :alt="individualOffer.indOfferName"
        itemprop="image"
      />
      <figcaption>{{individualOffer.indOfferName}}</figcaption>
    </figure>
    <DynamicBlock></DynamicBlock>

    <div class="brc-section__wrapper" v-if="serviceList.length > 0">
      <h2>Список услуг</h2>
      <ServiceList :serviceList="serviceList"></ServiceList>
    </div>

    <div class="brc-section__wrapper" v-if="serviceList.length > 0">
      <h2>Стоимость услуг</h2>
      <ServicePriceTable :servicePriceList="serviceList"></ServicePriceTable>
    </div>
    <div class="brc-section__wrapper" v-if="otherOfferHeaderText === 'Комплексные решения'">
      <h2>{{otherOfferHeaderText}}</h2>
      <component :is="otherOfferComponentName"></component>
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
import DynamicBlock from '@/components/public/DynamicBlock.vue'
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
    DynamicBlock,
    BreadCrumbs
  }
})
export default class OfferCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private individualOffer: IndividualOffer = new IndividualOffer()
  private serviceList: BusinessService[] = []
  private breadCrumbList: Object[] = []

  private offerHeaderText = ''
  private otherOfferHeaderText = ''
  private otherOfferComponentName = ''
  private siteSection: string = ''

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSection = context.params.siteSection
    // Индивидуальное предложение Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let individualOffer: IndividualOffer
    if (context.params.clienttype) {
      individualOffer = context.params.clienttype === 'business'
        ? await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug(context.params.siteSection)
        : await getServiceContainer().individualOfferService.getForPrivatePersonBySiteSectionSlug(context.params.siteSection)

    } else {
      individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
    }

    let offerHeaderText = individualOffer.indOfferName
    let otherOfferHeaderText = 'Комплексные решения'
    let otherOfferComponentName = 'ClientTypeOfferList'
    // Услуги Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let serviceList: Promise<BusinessService>
    if (context.params.clienttype) {
      serviceList = context.params.clienttype === 'business'
        ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(context.params.siteSection)
        : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(context.params.siteSection)

      offerHeaderText = context.params.clienttype === 'business' ? 'Услуги для Бизнеса' : 'Услуги для Частных лиц'
      otherOfferHeaderText = 'Индивидуальные предложения'
      otherOfferComponentName = 'BusinessTypeOfferList'

    } else {
      serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(context.params.siteSection, individualOffer.indOfferUrl)
    }

    const data = await Promise.all([serviceList])

    return {
      individualOffer,
      apiSharedData,
      serviceList: data[0],
      offerHeaderText,
      otherOfferHeaderText,
      otherOfferComponentName,
      siteSection
    }
  }

  private async mounted () {
    getModule(AppStore, this.$store).changeCurrentSiteSection(this.siteSection)
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (this.siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: this.offerHeaderText, link: '' })
      });
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
