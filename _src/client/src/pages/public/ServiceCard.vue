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
      <h1 itemprop="headline name" class="brc-page-title">{{businessService.businessServiceH1}}</h1>
    </figure>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>

    <div class="brc-section__wrapper">
      <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import BusinessService from '@/models/ekoset/BusinessService'
import ServiceList from '@/components/public/ServiceList.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'


@Component({
  components: {
    BreadCrumbs,
    DynamicComponentsContainer
  }
})
export default class ServiceCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private priceServiceList: BusinessService[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const businessService = getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getServiceDynamicComponentsInfo(siteSection, context.params.service)

    const data = await Promise.all([dynamicComponentInfo, businessService])

    return {
      dynamicComponentInfo: data[0],
      businessService: data[1]
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
@import '@/styles/variables.scss';
.brc-service-img {
  width: 100%;
}
</style>
