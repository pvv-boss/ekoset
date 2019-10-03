<template>
  <div class="brc-service-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Настройки футера</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    BreadCrumbs
  }
})
export default class AdminFooterSettings extends Vue {
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    // const serviceItems = getServiceContainer().businessServiceService.getAll()

    // const data = await Promise.all([serviceItems])
    // return {
    //   serviceItems: data[0]
    // }
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Настройки футера', link: 'admin-footer-settings' })
  }
}
</script>




