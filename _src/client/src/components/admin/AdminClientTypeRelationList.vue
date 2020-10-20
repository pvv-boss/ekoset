<template>
  <vue-good-table
    :columns="headerFields"
    :rows="clientTypeRelationItems"
    :sort-options="{
      enabled: true,
      initialSortBy: { field: 'clClientName', type: 'asc' },
    }"
  >
    <template #table-row="props">
      <input
        v-if="props.column.field == 'clClientId'"
        type="checkbox"
        :value="props.row.clClientId"
        :checked="props.row.hasRelation"
        :disabled="disabled"
        @change="onChecked(props.row.clClientId, $event.target.checked)"
      />
      <span v-else>{{ props.formattedRow[props.column.field] }}</span>
    </template>
  </vue-good-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand.ts'
import BusinessServiceService from '@/api/BusinessServiceService';

import 'vue-good-table/dist/vue-good-table.css'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table')
  }
})
export default class AdminClientTypeRelationList extends Vue {
  @Prop()
  private clientTypeRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled


  private headerFields = [
    {
      field: 'clClientId',
      label: '',
      sortable: false
    },
    {
      field: 'clClientName',
      label: 'Наименование'
    }
  ]

  private layout () {
    return 'admin'
  }

  private onChecked (clClientId: number, hasRelation: boolean) {
    this.$emit('clienttypechecked', clClientId, hasRelation)
  }
}
</script>
