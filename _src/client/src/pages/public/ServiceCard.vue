<template>
  <main>
    <TheBanner
      :h1="businessService.businessServiceH1"
      :alt="businessService.businessServiceName"
      :image-src="businessService.businessServiceImgBig"
    ></TheBanner>
    <a class="brc-service-buscet__icon_desktop" @click="addServiceToBuscet">
      <span>{{ basketImageInfo.alt }}</span>
      <img
        src="~/assets/images/addBusket.svg"
        :alt="basketImageInfo.alt"
        :title="basketImageInfo.alt"
      />
    </a>

    <a class="brc-service-buscet__icon_mobile" @click="addServiceToBuscet">
      <img
        :src="basketImageInfo.src"
        :alt="basketImageInfo.alt"
        :title="basketImageInfo.alt"
      />
    </a>

    <BreadCrumbs :bread-crumbs="breadCrumbList"></BreadCrumbs>
    <DynamicComponentsContainer
      :dynamic-component-info="dynamicComponentInfo"
    ></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Context } from "@nuxt/types";
import BusinessService from '@/models/ekoset/BusinessService'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'
import BuscetStore, { findAddedServiceIndex } from '@/store/BuscetStore'
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem'
import BusinessServiceService from '@/services/BusinessServiceService';
import { ServiceRegistry } from '@/ServiceRegistry';
import DynamicComponentsService from '@/services/DynamicComponentsService';

@Component
export default class ServiceCard extends Vue {
  private basketImageInfo: any = { src: require('~/assets/images/addBusket.svg'), alt: 'Добавить в корзину' }
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private priceServiceList: BusinessService[] = []
  private breadCrumbList: any[] = []

  private routeFullPath = ''


  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  @Watch('buscetStore.addedServiceList')
  private onBasketChanged () {
    this.updateBasketImage()
  }


  private updateBasketImage () {
    const wrapper = BusinessServiceLocalStorageItem.createFromBusinessService(this.businessService)
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, wrapper)
    const info = ind === -1 ? { src: require('~/assets/images/addBusketWhite.svg'), alt: 'Добавить в корзину' } : { src: require('~/assets/images/checkBasketWhite.svg'), alt: 'В корзине' }
    this.basketImageInfo.src = info.src
    this.basketImageInfo.alt = info.alt
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  private get getPriceServiceList () {
    return [...this.childServiceList, this.businessService]
  }


  private addServiceToBuscet () {
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, BusinessServiceLocalStorageItem.createFromBusinessService(this.businessService))
    if (ind === -1) {
      this.buscetStore.addService(BusinessServiceLocalStorageItem.createFromBusinessService(this.businessService))
    } else {
      this.buscetStore.removeService(BusinessServiceLocalStorageItem.createFromBusinessService(this.businessService))
    }
  }


  private async asyncData (context: Context) {
    const siteSection = context.params.siteSection
    const businessService = await ServiceRegistry.instance.getService(BusinessServiceService).getBySlug(context.params.service)
    const dynamicComponentInfo = ServiceRegistry.instance.getService(DynamicComponentsService).getServiceDynamicComponentsInfo(siteSection, context.params.service)

    getModule(AppStore, context.store).changeCurrentServiceName(businessService.businessServiceName)

    const data = await Promise.all([dynamicComponentInfo])

    return {
      dynamicComponentInfo: data[0],
      businessService,
      routeFullPath: context.route.fullPath
    }
  }

  private destroyed () {
    getModule(AppStore, this.$store).changeCurrentServiceName(null)
  }

  private mounted () {
    this.updateBasketImage()
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
    return MetaTagsBuilder.head(this.businessService, this.routeFullPath)
  }

}
</script>

<style lang="scss">
.brc-service-img {
  width: 100%;
}

.brc-service-buscet__icon_desktop {
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  span {
    margin-right: 8px;
    font-size: 13px;
    color: #ed0205 !important;
    text-decoration: underline;
    &:hover {
      color: darkred !important;
    }
  }

  img {
    width: 32px !important;
    height: 32px !important;
    margin: 0px !important;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.brc-service-buscet__icon_mobile {
  display: none;
  position: absolute;
  top: 220px;
  right: 25px;
  background-color: #ed0205;
  padding: 5px;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: -10px;
  border-radius: 50%;

  img {
    width: 32px !important;
    height: 32px !important;
    margin: 0px !important;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
