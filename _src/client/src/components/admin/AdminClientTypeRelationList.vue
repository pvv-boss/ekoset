<template>
  <vue-good-table :columns="headerFields" :rows="clientTypeRelationItems">
    <template #table-row="props">
      <input
        v-if="props.column.field == 'clClientId'"
        type="checkbox"
        :value="props.row.clClientId"
        :checked="props.row.hasRelation"
        @change="onChecked(props.row.clClientId,$event.target.checked)"
        :disabled="disabled"
      />
      <span v-else>{{props.formattedRow[props.column.field]}}</span>
    </template>
  </vue-good-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService';

@Component({})
export default class AdminClientTypeRelationList extends Vue {
  @Prop()
  private clientTypeRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled

  private headerFields = [
    {
      field: 'clClientId',
      label: ''
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
