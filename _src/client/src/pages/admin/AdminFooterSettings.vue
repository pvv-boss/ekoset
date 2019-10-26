<template>
  <div class="brc-admin_page_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Настройки футера</h1>

    <div>
      <h2>Для бизнеса</h2>
      <AdminServiceRelationList
        :serviceRelationItems="serviceListForBusiness"
        @servicechecked="onChecked(...arguments, true)"
      ></AdminServiceRelationList>
    </div>
    <div>
      <h2>Для частных лиц</h2>
      <AdminServiceRelationList
        :serviceRelationItems="serviceListForPerson"
        @servicechecked="onChecked(...arguments, false)"
      ></AdminServiceRelationList>
    </div>
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
import AdminServiceRelationList from '@/components/admin/AdminServiceRelationList.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminServiceRelationList
  }
})
export default class AdminFooterSettings extends Vue {
  private breadCrumbList: any[] = []
  private serviceListForPerson: any[] = []
  private serviceListForBusiness: any[] = []

  private layout () {
    return 'admin'
  }

  private async addRemovePrivatePersonServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(businessServiceId, 'private', isAdd)
  }

  private async addRemoveBusinessServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(businessServiceId, 'business', isAdd)
  }

  private onChecked (businessServiceId: number, hasRelation: boolean, isBusiness: boolean) {
    isBusiness ? this.addRemoveBusinessServiceToFooter(businessServiceId, hasRelation) : this.addRemovePrivatePersonServiceToFooter(businessServiceId, hasRelation)
  }

  private mounted () {
    this.configBreadCrumbs()
    this.updateData()
  }

  private async updateData () {
    const serviceListForPersonPr = getServiceContainer().businessServiceService.adminGetFooterServicesRelation(false)
    const serviceListForBusinessPr = getServiceContainer().businessServiceService.adminGetFooterServicesRelation(true)
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




