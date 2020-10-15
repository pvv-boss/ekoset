<template>
  <main>
    <TheBanner
      :h1="individualOffer.indOfferH1"
      :alt="individualOffer.indOfferName"
      :image-src="individualOffer.indOfferImgBig"
    ></TheBanner>
    <BreadCrumbs :bread-crumbs="breadCrumbList"></BreadCrumbs>
    <DynamicComponentsContainer
      :dynamic-component-info="dynamicComponentInfo"
    ></DynamicComponentsContainer>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import MetaTagsBuilder from '@/utils/MetaTagsBuilder'


@Component
export default class OfferCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private individualOffer: IndividualOffer = new IndividualOffer()
  private breadCrumbList: any[] = []
  private offerHeaderText = ''
  private routeFullPath = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    // Индивидуальное предложение Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let individualOffer: IndividualOffer
    let offerHeaderText = ''

    if (context.params.clienttype) {
      individualOffer = context.params.clienttype === 'business'
        ? await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug(siteSection)
        : await getServiceContainer().individualOfferService.getForPrivatePersonBySiteSectionSlug(siteSection)

      offerHeaderText = context.params.clienttype === 'business' ? 'Для бизнеса' : 'Для дома'
    } else {
      individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
      offerHeaderText = individualOffer.indOfferName
    }

    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getIndOfferDynamicComponentsInfo(siteSection, individualOffer.indOfferUrl, context.params.clienttype, individualOffer.clActivityId)

    const data = await Promise.all([dynamicComponentInfo])

    return {
      individualOffer,
      offerHeaderText,
      dynamicComponentInfo: data[0],
      routeFullPath: context.route.fullPath
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

  private head () {
    return MetaTagsBuilder.head(this.individualOffer, this.routeFullPath)
  }
}
</script>
