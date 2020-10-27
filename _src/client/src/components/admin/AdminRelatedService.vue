<template>
  <div
    class="brc-admin-card_two-column"
    style="flex-wrap: nowrap; align-items: flex-start"
  >
    <draggable
      v-model="relatedServiceList"
      class="admin_brc-related-service-list brc-admin-panel__site"
      style="margin-top: 0px"
      @change="handleChangePriority"
    >
      <ServiceListItem
        v-for="serviceItem in relatedServiceList"
        :key="serviceItem.businessServiceId"
        :service-item="serviceItem"
      ></ServiceListItem>
    </draggable>

    <LazyAdminServiceRelationListBySection
      :service-relation-items="serviceRelationList"
      class="brc_related_service__service_list"
      @servicechecked="serviceChecked"
    ></LazyAdminServiceRelationListBySection>
  </div>
</template>
        


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    draggable: () => import(/* webpackChunkName: "vuedraggable" */ 'vuedraggable')
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
.brc_related_service__service_list {
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  font-size: 14px !important;
  margin-left: 20px;
}

.admin_brc-related-service-list {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 30px 0 0 0;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>  