<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table
      :columns="headerFields"
      :rows="brandRelationItems"
      :sort-options="{
        enabled: true,
      }"
    >
      <template #table-row="props">
        <b-switch
          v-if="props.column.field == 'isShowOnPage'"
          :value="props.row.hasRelation"
          type="is-success"
          size="is-small"
          :disabled="disabled"
          @input="onBrandChecked(...arguments, props.row.clBrandId)"
        ></b-switch>
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>
  </div>
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
export default class AdminBrandRelationList extends Vue {
  @Prop()
  private brandRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled

  private headerFields = [
    {
      field: 'isShowOnPage',
      label: 'Выводить на странице',
      tdClass: 'brc-admin-centered-td',
      width: '230px',
      type: 'boolean',
      sortable: false
    },
    {
      field: 'clActivityName',
      label: 'Вид деятельности',
      filterOptions: {
        enabled: true,
        placeholder: 'Введите часть наименования'
      }
    },
    {
      field: 'clBrandName',
      label: 'Наименование бренда',
      filterOptions: {
        enabled: true,
        placeholder: 'Введите часть наименования'
      }
    }
  ]

  private layout () {
    return 'admin'
  }

  private onBrandChecked (hasRelation: boolean, clBrandId: number) {
    this.$emit('brandchecked', clBrandId, hasRelation)
  }
}
</script>
