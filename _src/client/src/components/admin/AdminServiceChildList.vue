<template>
  <vue-good-table :columns="headerFields" :rows="serviceItems">
    <template slot="table-row" slot-scope="props">
      <nuxt-link
        v-if="props.column.field == 'businessServiceName'"
        :to="{ name: 'admin-service-card', params: { siteSection: siteSection, service: props.row.businessServiceUrl}}"
      >{{props.row.businessServiceName}}</nuxt-link>
      <span v-else>{{props.formattedRow[props.column.field]}}</span>
    </template>
  </vue-good-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AdminServiceChildList extends Vue {
  @Prop()
  private serviceItems

  @Prop()
  private siteSection

  private headerFields = [
    {
      field: 'businessServiceName',
      label: 'Наименование'
    },
    {
      field: 'businessServicePriority',
      label: 'Приоритет'
    },
    {
      field: 'businessServiceStatus',
      label: 'Статус'
    }
  ]

  private layout () {
    return 'admin'
  }


}
</script>




