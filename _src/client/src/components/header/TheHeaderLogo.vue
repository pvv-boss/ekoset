<template>
  <nuxt-link :to="getNuxtLink">
    <img
      src="~/assets/images/page_logo_1_ck71lvkv50000kciace7g1eik.svg"
      :alt="currentSiteSectionName"
      class="brc-logo_main"
    />
  </nuxt-link>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import SitePage from '@/models/SitePage'
import PublicEkosetService from '@/services/PublicEkosetService'
import { ServiceRegistry } from '@/ServiceRegistry'

@Component({
  components: {
  }
})
export default class TheHeaderLogo extends Vue {

  @Prop()
  private disignMode: boolean

  @Prop()
  private imageSrcForDesignMode: string

  // @Prop()
  // private sitePage: SitePage

  private defaultLogo = '~/assets/images/page_logo_1_ck71lvkv50000kciace7g1eik.svg'
  private currentLogoSrc = ''

  private get currentSiteSectionName () {
    return getModule(AppStore, this.$store).currentSiteSectionName || 'Экосеть'
  }

  // private get currentSitePage () {
  //   return getModule(AppStore, this.$store).currentDefaultSitePage
  // }

  private get logoImageSrc () {
    return this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.currentLogoSrc
  }

  @Watch('currentSiteSectionName', { immediate: true })
  private async updateLogoSrc () {
    this.updateLogo()
  }

  // @Watch('currentSitePage', { immediate: true })
  // private async updateLogoSrcFromCustomPage () {
  //   this.updateLogo()
  // }

  private async updateLogo () {
    if (!this.disignMode) {
      this.currentLogoSrc = this.defaultLogo
      const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
      if (siteSectionSlug) {
        const siteSection = await ServiceRegistry.instance.getService(PublicEkosetService).getSiteSectionBySlug(siteSectionSlug)
        this.currentLogoSrc = siteSection ? siteSection.siteSectionLogo : this.defaultLogo
      }

      if (!siteSectionSlug) {
        // const sitePage = getModule(AppStore, this.$store).currentSitePage
        const sitePage = getModule(AppStore, this.$store).currentDefaultSitePage
        this.currentLogoSrc = !!sitePage && sitePage.sitePageLogo || this.defaultLogo
      }
    }
  }

  private get getNuxtLink () {
    if (this.disignMode) {
      return ''
    }
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
    return { name: siteSectionSlug ? 'activity-card' : 'main', params: { siteSection: siteSectionSlug } }
  }
}
</script>

<style lang="scss">
.brc-logo_main {
  width: 277px;
  height: 96px;
  display: block;
  margin-bottom: 5px;

  @media (max-width: 900px) {
    max-height: 60px !important;
    height: 60px !important;
    width: 174px !important;
  }
}
</style>