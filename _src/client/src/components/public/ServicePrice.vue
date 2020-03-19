<template>
  <div class="brc-service-price-table__wrapper">
    <table class="brc-service-price-table" cellspacing="0">
      <thead>
        <th>Услуга</th>
        <th width="15%">Ед.изм.</th>
        <th width="30%">Цена</th>
      </thead>
      <tbody>
        <template v-for="iterPriceListItem in servicePriceList">
          <template
            v-if="!!iterPriceListItem.pricelist && iterPriceListItem.pricelist.length > 0 && iterPriceListItem.pricelist[0] !== null"
          >
            <tr
              :key="iterPriceListItem.id"
              v-if="!isForRootService || (isForRootService && iterPriceListItem.pricelist.length === 0)"
            >
              <td
                :class="{'brc-price-list__item_red':isForChildService || isForRootService, 'brc-service-price-td_bold':!isForChildService && !isForRootService}"
              >
                <nuxt-link
                  v-if="!!iterPriceListItem.businesserviceurl"
                  :to="{ name: 'service-card', params: { service: iterPriceListItem.businesserviceurl, siteSection: iterPriceListItem.sitesectionurl}}"
                  class="brc-service-price-table-link"
                >{{iterPriceListItem.name}}</nuxt-link>
                <nuxt-link
                  v-else
                  :to="{ name: 'activity-card', params: {siteSection: iterPriceListItem.sitesectionurl}}"
                  class="brc-service-price-table-link brc-service-price-td_bold"
                >{{iterPriceListItem.name}}</nuxt-link>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr
              v-for="iterPriceItem in iterPriceListItem.pricelist"
              :key="iterPriceItem.businesserviceid"
            >
              <td class="brc-price-list__item_red">
                <nuxt-link
                  :to="{ name: 'service-card', params: { service: iterPriceItem.businesserviceurl, siteSection: iterPriceItem.sitesectionurl}}"
                  class="brc-service-price-table-link"
                >{{iterPriceItem.businesservicename}}</nuxt-link>
              </td>
              <td>{{iterPriceItem.businesserviceunit}}</td>
              <td class>{{iterPriceItem.businesserviceprice}}</td>
            </tr>
          </template>
          <template v-else>
            <tr :key="iterPriceListItem.id">
              <td
                :class="{'brc-price-list__item_red':isForChildService || isForRootService, 'brc-service-price-td_bold':!isForChildService && !isForRootService}"
              >
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

  @Prop({ default: false })
  private isForRootService

  @Prop({ default: false })
  private isForChildService

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
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #f4f4f5;
    }
    th:last-child {
      text-align: right;
      padding-right: 40px;
      @media (max-width: 768px) {
        padding-right: 10px;
      }
    }
    th:first-child {
      padding-left: 40px;
      @media (max-width: 768px) {
        padding-left: 10px;
      }
    }
    td:first-child {
      text-align: left;
      padding-left: 40px;
      display: flex;
      flex-direction: row;
      @media (max-width: 768px) {
        padding-left: 10px;
      }
    }
    td:last-child {
      text-align: right;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-all;
      padding-right: 40px;
      @media (max-width: 768px) {
        padding-right: 10px;
      }
    }
    .brc-service-price-td_bold {
      font-weight: 500;
      text-align: left !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-all;
    }
    .brc-service-price-td_child {
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-all;
    }
    .brc-service-price-table-link {
      text-decoration: none;
      color: $text-color;
      &:hover {
        color: red;
      }
    }

    .brc-price-list__item_red:before {
      color: $red;
      content: '•';
      padding-right: 15px;
      width: 10px;
      line-height: 0px;
      font-size: 30px;
      margin-top: calc(0.5em - 3px);
      @media (max-width: 768px) {
        margin-top: calc(0.5em - 6px);
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

@media (max-width: 768px) {
  .brc-service-price-table__wrapper {
    max-width: 100%;
    overflow-x: scroll;
    font-size: 12px;
  }
}
</style>