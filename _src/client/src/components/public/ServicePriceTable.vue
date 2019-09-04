<template>
  <div class="brc-service-price-table__wrapper" v-if="servicePriceList.length>0">
    <table class="brc-service-price-table" cellspacing="0">
      <thead>
        <th>Услуга</th>
        <th>Единица измерения</th>
        <th>Цена</th>
      </thead>
      <tbody>
        <tr v-for="servicePrice in serviceResultList" :key="servicePrice.businessServiceId">
          <td
            v-if="servicePrice.businessServicePrice > 0"
            :class="{'brc-service-price-td_child':servicePrice.businessServiceParentId>0}"
          >
            <nuxt-link
              :to="{ name: 'service-card', params: { service: servicePrice.businessServiceUrl, siteSection: servicePrice.siteSectionUrl}}"
              class="brc-service-price-table-link"
            >{{servicePrice.businessServiceName}}</nuxt-link>
          </td>
          <td v-else colspan="3" class="brc-service-price-td_bold">
            <nuxt-link
              :to="{ name: 'service-card', params: { service: servicePrice.businessServiceUrl, siteSection: servicePrice.siteSectionUrl}}"
              class="brc-service-price-table-link"
            >{{servicePrice.businessServiceName}}</nuxt-link>
          </td>
          <td v-if="servicePrice.businessServicePrice > 0">{{servicePrice.businessServiceUnit}}</td>
          <td
            v-if="servicePrice.businessServicePrice > 0"
          >{{Number(servicePrice.businessServicePrice).toLocaleString('ru-RU')}} ₽</td>
        </tr>
      </tbody>
    </table>
    <div class="brc-all-prices-link__wrapper" v-if="!allPricesPage">
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
export default class ServicePriceTable extends Vue {
  @Prop(Array)
  private servicePriceList

  @Prop({ default: false })
  private allPricesPage

  private get serviceTopList () {
    return this.servicePriceList.filter(obj => obj.businessServiceParentId == null).sort(function (obj1, obj2) {
      return obj1.businessServicePriority - obj2.businessServicePriority;
    })
  }

  private get serviceResultList () {
    let list: BusinessService[] = []
    if (this.serviceTopList.length > 0) {
      this.serviceTopList.forEach(item => {
        list.push(item)
        list.push(...this.servicePriceList.filter(obj => obj.businessServiceParentId == item.businessServiceId).sort(function (obj1, obj2) {
          return obj1.businessServicePriority - obj2.businessServicePriority;
        }))
      });
    }
    else {
      list = this.servicePriceList.sort(function (obj1, obj2) {
        return obj1.businessServicePriority - obj2.businessServicePriority;
      })
    }
    return list
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
.brc-service-price-table__wrapper {
  margin: 30px 0 0;
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
    }
    .brc-service-price-table-link {
      text-decoration: none;
      color: #292929;
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