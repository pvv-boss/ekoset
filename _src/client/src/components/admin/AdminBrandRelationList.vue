<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table :columns="headerFields" :rows="brandRelationItems">
      <template #table-row="props">
        <input
          v-if="props.column.field == 'clBrandId'"
          type="checkbox"
          :value="props.row.clBrandId"
          :checked="props.row.hasRelation"
          @change="onBrandChecked(props.row.clBrandId,$event.target.checked)"
        />
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

  private headerFields = [
    {
      field: 'clBrandId',
      label: ''
    },
    {
      field: 'clBrandName',
      label: 'Наименование'
    }
  ]

  private layout () {
    return 'admin'
  }

  private onBrandChecked (clBrandId: number, hasRelation: boolean) {
    this.$emit('brandchecked', clBrandId, hasRelation)
  }
}
</script>
