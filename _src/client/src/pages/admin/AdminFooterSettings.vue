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
            <LazyAdminServiceRelationListBySection
              :service-relation-items="serviceListForBusiness"
              style="margin-top: 25px"
              @servicechecked="onChecked(...arguments, true)"
            ></LazyAdminServiceRelationListBySection>
          </div>
          <div class="col-2">
            <h3>Для дома</h3>
            <LazyAdminServiceRelationListBySection
              :service-relation-items="serviceListForPerson"
              style="margin-top: 25px"
              @servicechecked="onChecked(...arguments, false)"
            ></LazyAdminServiceRelationListBySection>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import { ServiceRegistry } from '@/ServiceRegistry';
import BusinessServiceService from '@/services/BusinessServiceService';

@Component
export default class AdminFooterSettings extends Vue {
  private serviceListForPerson: any[] = []
  private serviceListForBusiness: any[] = []

  private layout () {
    return 'admin'
  }

  private async addRemovePrivatePersonServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await ServiceRegistry.instance.getService(BusinessServiceService).addRemoveService2Footer(businessServiceId, 'private', isAdd)
  }

  private async addRemoveBusinessServiceToFooter (businessServiceId: number, isAdd: boolean) {
    await ServiceRegistry.instance.getService(BusinessServiceService).addRemoveService2Footer(businessServiceId, 'business', isAdd)
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
    const serviceListForPersonPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetFooterServicesRelation(false)
    const serviceListForBusinessPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetFooterServicesRelation(true)
    const data = await Promise.all([serviceListForPersonPr, serviceListForBusinessPr])
    this.serviceListForPerson = data[0];
    this.serviceListForBusiness = data[1];
  }

}
</script>




