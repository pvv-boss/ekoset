<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">{{businessService.businessServiceName}}</h1>
    <figure>
      <img
        class="brc-page-img"
        src="/images/banner-service-1.jpg"
        :alt="businessService.businessServiceName"
        itemprop="image"
      />
      <figcaption>{{businessService.businessServiceName}}</figcaption>
    </figure>
    <div class="brc-page-description">
      <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться.&nbsp;а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве текста по&nbsp;умолчанию, так что поиск по&nbsp;ключ настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые</p>
      <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться.&nbsp;а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве текста по&nbsp;умолчанию, так что поиск по&nbsp;ключ настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые</p>
    </div>

    <h2 v-if="childServiceList.length > 0">Список услуг</h2>
    <ServiceList :serviceList="childServiceList"></ServiceList>

    <h2 v-if="childServiceList.length > 0">Стоимость услуг</h2>
    <ServicePriceTable :servicePriceList="childServiceList" v-if="childServiceList.length > 0"></ServicePriceTable>

    <h2>Индивидуальные предложения</h2>
    <BusinessTypeOfferList :offerList="busineesTypeOfferList"></BusinessTypeOfferList>

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
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'

@Component({
  components: {
    TheShared,
    ServiceList,
    ServicePriceTable,
    BusinessTypeOfferList,
    ClientTypeOfferList,
    BreadCrumbs
  }
})
export default class ServiceCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private busineesTypeOfferList: IndividualOffer[] = []
  private breadCrumbList: Object[] = []

  private async asyncData (context: NuxtContext) {
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

  private async mounted () {
    const siteSection = getModule(AppStore, this.$store).currentSiteSection
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: siteSection } })
        this.breadCrumbList.push({ name: this.businessService.businessServiceName, link: '' })
      });

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
