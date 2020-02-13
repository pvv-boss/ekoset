<template>
  <div class="brc-service-relation-by-section_wrapper">
    <div
      v-for="iterItem in serviceRelationItems"
      :key="iterItem.siteSectionId"
      class="brc-service-relation-by-section"
    >
      <h4>{{iterItem.siteSectionName}}</h4>
      <vue-good-table :columns="headerFields" :rows="iterItem.services">
        <template #table-row="props">
          <input
            v-if="props.column.field == 'businessServiceId'"
            type="checkbox"
            :value="props.row.businessServiceId"
            :checked="props.row.hasRelation"
            @change="onChecked(props.row.businessServiceId,$event.target.checked)"
            :disabled="disabled"
          />
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'

@Component({})
export default class AdminServiceRelationListBySection extends Vue {
  @Prop()
  private serviceRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled


  private headerFields = [
    {
      field: 'businessServiceId',
      label: ''
    },
    {
      field: 'businessServiceName',
      label: 'Наименование'
    }
  ]

  private serviceListBySection (sectionPart) {
    return sectionPart.services
  }

  private layout () {
    return 'admin'
  }

  private onChecked (businessServiceId: number, hasRelation: boolean) {
    this.$emit('servicechecked', businessServiceId, hasRelation)
  }
}
</script>

<style lang="scss">
.brc-service-relation-by-section_wrapper {
  > div + div {
    margin-top: 20px;
  }
}
</style>

