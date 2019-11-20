<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table
      :columns="headerFields"
      :rows="brandRelationItems"
      :sort-options="{
          enabled: true,
          initialSortBy: {field: 'clBrandName', type: 'asc'}
      }"
    >
      <template #table-row="props">
        <b-switch
          @input="onBrandChecked(...arguments,props.row.clBrandId)"
          :value="props.row.hasRelation"
          type="is-success"
          size="is-small"
          :disabled="disabled"
          v-if="props.column.field == 'isShowOnPage'"
        ></b-switch>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService';

@Component({})
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
      type: "boolean",
      sortable: false
    },
    {
      field: 'clBrandName',
      label: 'Наименование бренда',
      filterOptions: {
        enabled: true,
        placeholder: 'Введите часть наименования',
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
