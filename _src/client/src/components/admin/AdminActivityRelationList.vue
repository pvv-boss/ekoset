<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table
      :columns="headerFields"
      :rows="activityRelationItems"
      :sort-options="{
        enabled: true,
        initialSortBy: { field: 'clActivityName', type: 'asc' },
      }"
    >
      <template #table-row="props">
        <input
          v-if="props.column.field == 'clActivityId'"
          type="checkbox"
          :value="props.row.clActivityId"
          :checked="props.row.hasRelation"
          :disabled="disabled"
          @change="onChecked(props.row.clActivityId, $event.target.checked)"
        />
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessServiceService from '@/api/BusinessServiceService';
import 'vue-good-table/dist/vue-good-table.css'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table')
  }
})
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
      label: 'Наименование'
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
