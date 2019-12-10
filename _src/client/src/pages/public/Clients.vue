<template>
  <section>
    <h1 itemprop="headline name">Наши клиенты</h1>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <div class="brc-clients__wrapper">
      <div v-for="group in partnerGroupList" :key="group.partnerGroupId">
        <h4>{{group.partnerGroupName}}</h4>
        <ClientList
          :clientList="clientItems.filter(obj => obj.partnerGroupId === group.partnerGroupId)"
        ></ClientList>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

import ClientList from '@/components/public/ClientList.vue'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import Partner from '@/models/ekoset/Partner'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'

@Component({
  components: {
    ClientList,
    DynamicComponentsContainer,
    BreadCrumbs
  }
})
export default class Clients extends Vue {
  private clientItems: Partner[] = []
  private breadCrumbList: any[] = []
  private dynamicComponentInfo: DynamicComponentInfo[] = []

  private get partnerGroupList () {
    const groupList = Array.from(this.clientItems, (x) => Object.assign({}, { partnerGroupName: x.partnerGroupName, partnerGroupId: x.partnerGroupId, partnerGroupPriority: x.partnerGroupPriority }))
    return groupList.filter((group, i, arr) => arr.findIndex((g) => {
      return g.partnerGroupId === group.partnerGroupId;
    }) === i).sort((obj1, obj2) => {
      return obj1.partnerGroupPriority - obj2.partnerGroupPriority
    })
  }
  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getTopMenuDynamicComponents()
    const clientList = getServiceContainer().publicEkosetService.getPartners()

    const data = await Promise.all([clientList])
    return {
      dynamicComponentInfo,
      clientItems: data[0],
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
    this.breadCrumbList.push({ name: 'Наши клиенты', link: '' })
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
.brc-clients__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    min-width: 300px;
    margin-top: 15px;
    > ul {
      margin-left: 30px;
      > li {
        list-style-type: none;
      }
    }
  }
}
</style>
