<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table
      :columns="headerFields"
      :rows="activityRelationItems"
      :sort-options="{
          enabled: true
      }"
    >
      <template #table-row="props">
        <input
          v-if="props.column.field == 'clActivityId'"
          type="checkbox"
          :value="props.row.clActivityId"
          :checked="props.row.hasRelation"
          @change="onChecked(props.row.clActivityId,$event.target.checked)"
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
import BusinessServiceService from '@/api/BusinessServiceService';

@Component({})
export default class AdminActivityRelationList extends Vue {
  @Prop()
  private activityRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled

  private headerFields = [
    {
      field: 'clActivityId',
      label: '',
      sortable: false
    },
    {
      field: 'clActivityName',
      label: 'Наименование',
      type: "text"
    }
  ]

  private layout () {
    return 'admin'
  }

  private onChecked (clActivityId: number, hasRelation: boolean) {
    this.$emit('activitychecked', clActivityId, hasRelation)
  }
}
</script>
