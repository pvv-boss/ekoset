<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1 itemprop="headline name">Контакты</h1>
    <TheShared :apiSharedData="apiSharedData"></TheShared>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import TheShared from '@/components/TheShared.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    TheShared,
    BreadCrumbs
  }
})
export default class Contacts extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private breadCrumbList: Object[] = []
  private siteSection: string = ''

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const siteSection = context.params.siteSection
    return {
      apiSharedData,
      siteSection
    }
  }

  private async mounted () {
    getModule(AppStore, this.$store).changeCurrentSiteSection(this.siteSection)
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (this.siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: 'Контакты', link: '' })
      });
    }
    else {
      this.breadCrumbList.push({ name: 'Контакты', link: '' })
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
