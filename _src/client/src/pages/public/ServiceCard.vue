<template>
  <main>
    <TheBanner
      :h1="businessService.businessServiceH1"
      :alt="businessService.businessServiceName"
      :imageSrc="businessService.businessServiceImgBig"
    ></TheBanner>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
  </main>
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
import TheBanner from '@/components/header/TheBanner.vue'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'

@Component({
  components: {
    BreadCrumbs,
    DynamicComponentsContainer,
    TheBanner
  }
})
export default class ServiceCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private businessService: BusinessService = new BusinessService()
  private childServiceList: BusinessService[] = []
  private priceServiceList: BusinessService[] = []
  private breadCrumbList: any[] = []

  private routeFullPath = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const businessService = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getServiceDynamicComponentsInfo(siteSection, context.params.service)

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

  private head () {
    return MetaTagsBuilder.head(this.businessService, this.routeFullPath)
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-service-img {
  width: 100%;
}
</style>
