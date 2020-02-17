<template>
  <client-only>
    <div class="brc-service-price-table__wrapper">
      <table class="brc-service-price-table" cellspacing="0">
        <thead>
          <th>Услуга</th>
          <th width="10%">Ед.изм.</th>
          <th width="20%">Цена</th>
        </thead>
        <tbody>
          <template v-for="iterPriceListItem in servicePriceList">
            <template
              v-if="!!iterPriceListItem.pricelist && iterPriceListItem.pricelist.length > 0 && iterPriceListItem.pricelist[0] !== null"
            >
              <tr :key="iterPriceListItem.id">
                <td class="brc-service-price-td_bold">{{iterPriceListItem.name}}</td>
                <td></td>
                <td></td>
              </tr>
              <tr
                v-for="iterPriceItem in iterPriceListItem.pricelist"
                :key="iterPriceItem.businesserviceid"
              >
                <td>
                  <nuxt-link
                    :to="{ name: 'service-card', params: { service: iterPriceItem.businesserviceurl, siteSection: iterPriceItem.sitesectionurl}}"
                    class="brc-service-price-table-link"
                  >{{iterPriceItem.businesservicename}}</nuxt-link>
                </td>
                <td>{{iterPriceItem.businesserviceunit}}</td>
                <td>{{iterPriceItem.businesserviceprice}}</td>
              </tr>
            </template>
            <template v-else>
              <tr :key="iterPriceListItem.id">
                <td>
                  <nuxt-link
                    :to="{ name: 'service-card', params: { service: iterPriceListItem.businesserviceurl, siteSection: iterPriceListItem.sitesectionurl}}"
                    class="brc-service-price-table-link"
                  >{{iterPriceListItem.name}}</nuxt-link>
                </td>
                <td>{{iterPriceListItem.businesserviceunit}}</td>
                <td>{{iterPriceListItem.businesserviceprice}}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <div class="brc-all-prices-link__wrapper" v-show="!allPricesPage">
        <nuxt-link
          :to="{name: 'prices', params: {siteSection: getCurrentSiteSection}}"
          class="brc-all-prices-link"
        >Все цены</nuxt-link>
      </div>
    </div>
  </client-only>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({})
export default class ServicePrice extends Vue {
  @Prop(Array)
  private servicePriceList

  @Prop({ default: false })
  private allPricesPage


  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-service-price-table__wrapper {
  margin: 30px 0 0;
  .brc-service-price-table {
    width: 100%;
    border: 1px solid #f4f4f5;
    border-radius: 5px;
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
      border-bottom: 1px solid #f4f4f5;
    }
    td:first-child {
      text-align: left;
    }
    td:last-child {
      text-align: right;
      white-space: nowrap;
    }
    .brc-service-price-td_bold {
      font-weight: 500;
      text-align: left !important;
      white-space: pre-wrap !important;
    }
    .brc-service-price-td_child {
      white-space: pre-wrap !important;
    }
    .brc-service-price-table-link {
      text-decoration: none;
      color: $text-color;
      &:hover {
        color: red;
      }
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
      border-radius: 5px;
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