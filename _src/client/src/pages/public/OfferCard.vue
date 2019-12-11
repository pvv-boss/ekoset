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

    <div class="brc-section__wrapper">
      <DynamicComponentsContainer :dynamicComponentInfo="dynamicComponentInfo"></DynamicComponentsContainer>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import FreeContentBlock from '@/components/FreeContentBlock.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'


@Component({
  components: {
    FreeContentBlock,
    BreadCrumbs,
    DynamicComponentsContainer
  }
})
export default class OfferCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private individualOffer: IndividualOffer = new IndividualOffer()
  private breadCrumbList: any[] = []
  private offerHeaderText: string = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    // Индивидуальное предложение Для бизнеса/частных лиц или по виду дуетяельности (автосалоны...)
    let individualOffer: IndividualOffer
    let offerHeaderText = ''

    if (context.params.clienttype) {
      individualOffer = context.params.clienttype === 'business'
        ? await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug(siteSection)
        : await getServiceContainer().individualOfferService.getForPrivatePersonBySiteSectionSlug(siteSection)

      offerHeaderText = context.params.clienttype === 'business' ? 'Для бизнеса' : 'Для частных лиц'
    } else {
      individualOffer = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
      offerHeaderText = individualOffer.indOfferName
    }

    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getIndOfferDynamicComponentsInfo(siteSection, individualOffer.indOfferUrl, context.params.clienttype, individualOffer.clActivityId)

    const data = await Promise.all([dynamicComponentInfo])

    return {
      individualOffer,
      offerHeaderText,
      dynamicComponentInfo: data[0]
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
