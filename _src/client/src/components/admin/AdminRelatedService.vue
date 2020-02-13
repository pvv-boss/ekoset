<template>
  <div class="brc-admin-card_two-column" style="flex-wrap:nowrap; align-items:flex-start;">
    <draggable
      v-model="relatedServiceList"
      @change="handleChangePriority"
      class="brc-service-list brc-admin-panel__site"
      style="margin-top:0px;"
    >
      <div v-for="serviceItem in relatedServiceList" :key="serviceItem.businessServiceId">
        <ServiceListItem :serviceItem="serviceItem"></ServiceListItem>
      </div>
    </draggable>

    <AdminServiceRelationListBySection
      :serviceRelationItems="serviceRelationList"
      @servicechecked="serviceChecked"
      class="brc_related_service__service_list"
    ></AdminServiceRelationListBySection>
  </div>
</template>
        

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import AdminServiceRelationListBySection from '@/components/admin/AdminServiceRelationListBySection.vue'
import { NuxtContext } from 'vue/types/options'
import { getServiceContainer } from '@/api/ServiceContainer'
import ServiceListItem from '@/components/public/ServiceListItem.vue'

@Component({
  components: {
    AdminServiceRelationListBySection,
    ServiceListItem
  }
})
export default class AdminRelatedService extends Vue {
  @Prop()
  private serviceRelationList: any[]

  @Prop()
  private relatedServiceList: any[]

  private serviceChecked (businessServiceId: number, hasRelation: boolean) {
    this.$emit('service:checked', businessServiceId, hasRelation)
  }

  private handleChangePriority () {
    for (let i = 0; i < this.relatedServiceList.length; i++) {
      this.relatedServiceList[i].businessServicePriority = this.relatedServiceList.length - i;
    }
    this.$emit('service:priortity:changed', this.relatedServiceList)
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_related_service__service_list {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 14px !important;
  margin-left: 20px;
}
</style>  