<template>
  <vue-good-table :columns="headerFields" :rows="offerList">
    <template slot="table-row" slot-scope="props">
      <nuxt-link
        v-if="props.column.field == 'indOfferName'"
        :to="{ name: 'admin-individual-offer-card', params: { siteSection: siteSection, offer: props.row.indOfferUrl}}"
      >{{props.row.indOfferName}}</nuxt-link>
      <span v-else>{{props.formattedRow[props.column.field]}}</span>
    </template>
  </vue-good-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AdminBusinessTypeOfferList extends Vue {

  @Prop()
  private siteSection

  @Prop()
  private offerList

  private headerFields = [
    {
      field: "indOfferName",
      label: "Наименование"
    }
  ]



  private layout () {
    return 'admin'
  }


}
</script>




