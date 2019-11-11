<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Настройки футера (список услуг)</h2>
        </div>
      </template>

      <template #content>
        <div class="brc-admin-card-field-list_column">
          <div class="col-2">
            <h3>Для бизнеса</h3>
            <AdminServiceRelationList
              :serviceRelationItems="serviceListForBusiness"
              @servicechecked="onChecked(...arguments, true)"
            ></AdminServiceRelationList>
          </div>
          <div class="col-2">
            <h3>Для частных лиц</h3>
            <AdminServiceRelationList
              :serviceRelationItems="serviceListForPerson"
              @servicechecked="onChecked(...arguments, false)"
            ></AdminServiceRelationList>
          </div>
        </div>
      </template>
    </BaseCard>
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
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminServiceRelationList,
    BaseCard
  }
})
export default class AdminFooterSettings extends Vue {
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
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Настройки футера', link: 'admin-footer-settings' })
    getModule(AdminStore, this.$store).changeBreadCrumbList(breadCrumbList)

    this.updateData()
  }

  private async updateData () {
    const serviceListForPersonPr = getServiceContainer().businessServiceService.adminGetFooterServicesRelation(false)
    const serviceListForBusinessPr = getServiceContainer().businessServiceService.adminGetFooterServicesRelation(true)
    const data = await Promise.all([serviceListForPersonPr, serviceListForBusinessPr])
    this.serviceListForPerson = data[0];
    this.serviceListForBusiness = data[1];
  }

}
</script>




