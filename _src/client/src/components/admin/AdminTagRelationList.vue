<template>
  <div class="brc-brand-relation-list_wrapper">
    <vue-good-table :columns="headerFields" :rows="tagRelationItems">
      <template #table-row="props">
        <input
          v-if="props.column.field == 'tagId'"
          type="checkbox"
          :value="props.row.tagId"
          :checked="props.row.hasRelation"
          @change="onChecked(props.row.tagId,$event.target.checked)"
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
export default class AdminTagRelationList extends Vue {
  @Prop()
  private tagRelationItems

  private headerFields = [
    {
      field: 'tagId',
      label: ''
    },
    {
      field: 'tagName',
      label: 'Наименование'
    }
  ]

  private layout () {
    return 'admin'
  }

  private onChecked (tagId: number, hasRelation: boolean) {
    this.$emit('tagchecked', tagId, hasRelation)
  }
}
</script>
