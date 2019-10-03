<template>
  <div class="brc-service-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Настройки футера</h1>

    <div>
      <h2>Для бизнеса</h2>
      <div class="brc-footer-service-list_wrapper">
        <vue-good-table :columns="headerFields" :rows="businessServiceItems">
          <template #table-row="props">
            <input
              v-if="props.column.field == 'businessServiceId'"
              type="checkbox"
              :value="props.row.businessServiceId"
              :checked="props.row.hasRelation"
              @change="onChecked(props.row.businessServiceId,true,$event.target.checked)"
              :disabled="disabled"
            />
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div>
      <h2>Для частных лиц</h2>
      <div class="brc-footer-service-list_wrapper">
        <vue-good-table :columns="headerFields" :rows="privateServiceItems">
          <template #table-row="props">
            <input
              v-if="props.column.field == 'businessServiceId'"
              type="checkbox"
              :value="props.row.businessServiceId"
              :checked="props.row.hasRelation"
              @change="onChecked(props.row.businessServiceId,false,$event.target.checked)"
              :disabled="disabled"
            />
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
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

  private async addRemovePrivatePersonServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(businessServiceId, 'private', isAdd)
  }

  private async addRemoveBusinessServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await getServiceContainer().businessServiceService.addRemoveService2Footer(businessServiceId, 'business', isAdd)
  }

  private onChecked (businessServiceId: number, isBusiness: boolean, hasRelation: boolean) {
    isBusiness ? this.addRemoveBusinessServiceToFooter(businessServiceId, !hasRelation) : this.addRemovePrivatePersonServiceToFooter(businessServiceId, !hasRelation)
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




