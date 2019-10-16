<template>
  <vue-good-table :columns="headerFields" :rows="indOfferItems">
    <template slot="table-row" slot-scope="props">
      <nuxt-link
        v-if="props.column.field == 'indOfferName'"
        :to="{ name: 'admin-individual-offer-card-client-type', params: { siteSection: siteSection, clienttype: props.row.clientType}}"
      >{{props.row.indOfferName}}</nuxt-link>
      <span v-else>{{props.formattedRow[props.column.field]}}</span>
    </template>
  </vue-good-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AdminClientTypeOfferList extends Vue {

  @Prop()
  private siteSection

  private headerFields = [
    {
      field: 'indOfferName',
      label: 'Наименование'
    }
  ]

  private indOfferItems = [
    {
      indOfferName: 'Для бизнеса',
      clientType: 'business'
    },
    {
      indOfferName: 'Для частных лиц',
      clientType: 'person'
    }
  ]

  private layout () {
    return 'admin'
  }


}
</script>




