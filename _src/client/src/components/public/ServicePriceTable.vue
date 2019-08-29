<template>
  <div class="brc-service-price-table__wrapper">
    <table class="brc-service-price-table" cellspacing="0">
      <thead>
        <th>Услуга</th>
        <th>Единица измерения</th>
        <th>Цена</th>
      </thead>
      <tbody>
        <tr v-for="servicePrice in servicePriceList" :key="servicePrice.businessServiceId">
          <td>{{servicePrice.businessServiceName}}</td>
          <td>час</td>
          <td>от 100 ₽</td>
        </tr>
      </tbody>
    </table>
    <div class="brc-all-prices-link__wrapper">
      <nuxt-link :to="{ name: 'main'}" class="brc-all-prices-link">Все цены</nuxt-link>
    </div>
  </div>
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

<style lang="scss">
.brc-service-price-table__wrapper {
  margin: 30px 0 60px;
  .brc-service-price-table {
    width: 100%;
    border: 1px solid #f4f4f5;
    border-radius: 3px;
    thead {
      background-color: #f4f4f5;
    }
    tr {
      &:hover {
        background-color: #f4f4f5;
      }
    }
    td,
    th {
      text-align: center;
      padding: 10px;
    }
    td:first-child {
      text-align: left;
    }
    td:last-child {
      text-align: right;
      white-space: nowrap;
    }
  }
  .brc-all-prices-link__wrapper {
    margin-top: 30px;

    .brc-all-prices-link {
      border: 1px solid red;
      color: red;
      text-decoration: none;
      width: 200px;
      max-width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      margin: auto;

      &:hover {
        background-color: red;
        color: white;
      }
    }
  }
}

@media (max-width: 450px) {
  .brc-service-price-table__wrapper {
    max-width: 100%;
    overflow-x: scroll;
  }
}
</style>