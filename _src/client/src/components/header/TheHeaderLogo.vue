<template>
  <nuxt-link :to="getNuxtLink">
    <img :src="logoImageSrc" :alt="getCurrentSiteSection" class="brc-logo_main" />
  </nuxt-link>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import { getServiceContainer } from '../../api/ServiceContainer'

@Component({
  components: {
  }
})
export default class TheHeaderLogo extends Vue {

  @Prop()
  private disignMode: boolean

  @Prop()
  private imageSrcForDesignMode: string

  private currentLogoSrc = '/images/logo.png'

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName || 'Экосеть'
  }

  private get logoImageSrc () {
    return !!this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.currentLogoSrc
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async updateLogoSrc () {
    if (!this.disignMode) {
      const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
      if (siteSectionSlug) {
        const siteSection = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(siteSectionSlug)
        this.currentLogoSrc = siteSection.siteSectionLogo || '/images/logo.png'
      } else {
        this.currentLogoSrc = '/images/logo.png'
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
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-logo_main {
  width: 277px;
  height: 96px;

  @media (max-width: 900px) {
    max-height: 60px !important;
    height: 60px !important;
    width: 174px !important;
  }
}
</style>