<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table :columns="headerFields" :rows="serviceRelationItems">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'

@Component({})
export default class AdminServiceRelationList extends Vue {
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

  private layout () {
    return 'admin'
  }

  private onChecked (businessServiceId: number, hasRelation: boolean) {
    this.$emit('servicechecked', businessServiceId, hasRelation)
  }
}
</script>
