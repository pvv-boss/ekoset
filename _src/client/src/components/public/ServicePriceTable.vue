<template>
  <table>
    <thead>
      <th>Услуга</th>
      <th>Едница измерения</th>
      <th>Цена</th>
    </thead>
    <tbody>
      <tr v-for="servicePrice in servicePriceList" :key="servicePrice.priceId">
        <td>{{servicePrice.Name}}</td>
        <td>{{servicePrice.Unit}}</td>
        <td>{{servicePrice.Cost}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({})
export default class ServicePriceTable extends Vue {
  @Prop(Array)
  private servicePriceList
}
</script>