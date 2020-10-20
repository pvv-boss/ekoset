<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table
      :columns="headerFields"
      :rows="serviceRelationItems"
      :sort-options="{
        enabled: true,
      }"
    >
      <template #table-row="props">
        <input
          v-if="props.column.field == 'businessServiceId'"
          type="checkbox"
          :value="props.row.businessServiceId"
          :checked="props.row.hasRelation"
          :disabled="disabled"
          @change="
            onChecked(props.row.businessServiceId, $event.target.checked)
          "
        />
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessServiceService from '@/api/BusinessServiceService'

import 'vue-good-table/dist/vue-good-table.css'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table')
  }
})
export default class AdminServiceRelationList extends Vue {
  @Prop()
  private serviceRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled

  private headerFields = [
    {
      field: 'businessServiceId',
      label: '',
      sortable: false
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
