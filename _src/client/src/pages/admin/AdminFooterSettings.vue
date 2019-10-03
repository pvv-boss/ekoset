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
  private privateServiceItems: any[] = []
  private businessServiceItems: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    //получаем список услуг
    // const businessServiceItems = getServiceContainer().businessServiceService.getAll()
    // const privateServiceItems = getServiceContainer().businessServiceService.getAll()

    // const data = await Promise.all([serviceItems])
    // return {
    //   serviceItems: data[0]
    // }
  }

  private onChecked (businessServiceId: number, isBusiness: boolean, hasRelation: boolean) {
    //сохраняем связь
    //getServiceContainer().businessServiceService.addRemoveActivityType2Service(this.serviceItem.businessServiceUrl, clActivityId, hasRelation)
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




