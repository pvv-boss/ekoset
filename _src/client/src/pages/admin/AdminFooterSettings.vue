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
  private serviceListForPerson: any
  private serviceListForBusiness: any

  private layout () {
    return 'admin'
  }

  private async addRemovePrivatePersonServiceToFooter (serviceUrl: string, isRemove: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(serviceUrl, 'private', isRemove)
  }

  private async addRemoveBusinessServiceToFooter (serviceUrl: string, isRemove: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(serviceUrl, 'business', isRemove)
  }

  private mounted () {
    this.configBreadCrumbs()
    this.updateData()
  }

  private async updateData () {
    const serviceListForPersonPr = getServiceContainer().businessServiceService.getServicesForFooter('private')
    const serviceListForBusinessPr = getServiceContainer().businessServiceService.getServicesForFooter('business')
    const data = await Promise.all([serviceListForPersonPr, serviceListForBusinessPr])
    this.serviceListForPerson = data[0];
    this.serviceListForBusiness = data[1];
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Настройки футера', link: 'admin-footer-settings' })
  }
}
</script>




