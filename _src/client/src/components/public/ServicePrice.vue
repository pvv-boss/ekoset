<template>
  <div class="brc-service-price-table__wrapper">
    <table class="brc-service-price-table" cellspacing="0">
      <thead>
        <th>Услуга</th>
        <th width="15%" class="brc-service-price__unit">Ед.изм.</th>
        <th class="brc-service-price__price">Цена</th>
        <th class="brc-service-price__buscet">В корзину</th>
      </thead>
      <tbody>
        <template v-for="iterPriceListItem in servicePriceList">
          <template
            v-if="
              !!iterPriceListItem.pricelist &&
              iterPriceListItem.pricelist.length > 0 &&
              iterPriceListItem.pricelist[0] !== null
            "
          >
            <tr
              v-if="
                !isForRootService ||
                (isForRootService && iterPriceListItem.pricelist.length === 0)
              "
              :key="iterPriceListItem.id"
            >
              <td
                :class="{
                  'brc-price-list__item_red':
                    isForChildService || isForRootService,
                  'brc-service-price-td_bold':
                    !isForChildService && !isForRootService,
                }"
              >
                <nuxt-link
                  v-if="!!iterPriceListItem.businesserviceurl"
                  :to="{
                    name: 'service-card',
                    params: {
                      service: iterPriceListItem.businesserviceurl,
                      siteSection: iterPriceListItem.sitesectionurl,
                    },
                  }"
                  class="brc-service-price-table-link"
                  >{{ iterPriceListItem.name }}</nuxt-link
                >
                <nuxt-link
                  v-else
                  :to="{
                    name: 'activity-card',
                    params: { siteSection: iterPriceListItem.sitesectionurl },
                  }"
                  class="brc-service-price-table-link brc-service-price-td_bold"
                  >{{ iterPriceListItem.name }}</nuxt-link
                >
              </td>
              <td class="brc-service-price__unit"></td>
              <td></td>
              <td></td>
            </tr>
            <tr
              v-for="iterPriceItem in iterPriceListItem.pricelist"
              :key="iterPriceItem.businesserviceid"
            >
              <td class="brc-price-list__item_red">
                <nuxt-link
                  :to="{
                    name: 'service-card',
                    params: {
                      service: iterPriceItem.businesserviceurl,
                      siteSection: iterPriceItem.sitesectionurl,
                    },
                  }"
                  class="brc-service-price-table-link"
                  >{{ iterPriceItem.businesservicename }}</nuxt-link
                >
              </td>
              <td class="brc-service-price__unit">
                {{ iterPriceItem.businesserviceunit }}
              </td>
              <td class>{{ iterPriceItem.businesserviceprice }}</td>
              <td class="brc-price-buscet__icon">
                <a @click="addServiceToBuscet(iterPriceItem)">
                  <img
                    :src="basketImage(iterPriceItem).src"
                    :alt="basketImage(iterPriceItem).alt"
                    :title="basketImage(iterPriceItem).alt"
                  />
                </a>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr :key="iterPriceListItem.id">
              <td
                :class="{
                  'brc-price-list__item_red':
                    isForChildService || isForRootService,
                  'brc-service-price-td_bold':
                    !isForChildService && !isForRootService,
                }"
              >
                <nuxt-link
                  :to="{
                    name: 'service-card',
                    params: {
                      service: iterPriceListItem.businesserviceurl,
                      siteSection: iterPriceListItem.sitesectionurl,
                    },
                  }"
                  class="brc-service-price-table-link"
                  >{{ iterPriceListItem.name }}</nuxt-link
                >
              </td>
              <td class="brc-service-price__unit">
                {{ iterPriceListItem.businesserviceunit }}
              </td>
              <td>{{ iterPriceListItem.businesserviceprice }}</td>
              <td class="brc-price-buscet__icon">
                <a @click="addServiceToBuscet(iterPriceListItem)">
                  <img
                    :src="basketImage(iterPriceListItem).src"
                    :alt="basketImage(iterPriceListItem).alt"
                    :title="basketImage(iterPriceListItem).alt"
                  />
                </a>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
    <div v-show="!allPricesPage" class="brc-all-prices-link__wrapper">
      <nuxt-link
        :to="{ name: 'prices', params: { siteSection: getCurrentSiteSection } }"
        class="brc-all-prices-link"
        >Все цены</nuxt-link
      >
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import BuscetStore, { findAddedServiceIndex } from '@/store/BuscetStore'
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem'

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

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  public addServiceToBuscet (serviceItem: any) {
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, BusinessServiceLocalStorageItem.createFromServicePrice(serviceItem))
    if (ind === -1) {
      this.buscetStore.addService(BusinessServiceLocalStorageItem.createFromServicePrice(serviceItem))
    } else {
      this.buscetStore.removeService(BusinessServiceLocalStorageItem.createFromServicePrice(serviceItem))
    }
  }

  public basketImage (serviceItem: any) {
    const wrapper = BusinessServiceLocalStorageItem.createFromServicePrice(serviceItem)
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, wrapper)
    return ind === -1 ? { src: '/images/addBusketBlack.svg', alt: 'Добавить в корзину' } : { src: '/images/checkBasket.svg', alt: 'Убрать из корзины' }
  }
}
</script>

<style lang="scss">
.brc-service-price-table__wrapper {
  margin: 30px 0 0;

  .brc-service-price__price {
    width: 15%;
    @media (max-width: 768px) {
      width: 30%;
    }
  }

  .brc-service-price__buscet {
    width: 10%;
    @media (max-width: 768px) {
      width: 25%;
    }
  }

  .brc-service-price__unit {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .brc-price-buscet__icon {
    padding: 0px !important;
    // padding-right: 30px;
    @media (max-width: 768px) {
      // padding-right: 5px;
    }
    img {
      display: inline;
      width: 32px;
      height: 32px;
      margin: 0px;
      margin-top: 5px;
      @media (max-width: 768px) {
        width: 24px;
        height: 24px;
      }
    }
  }
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
      text-align: center;
      // padding-right: 40px;
      // @media (max-width: 768px) {
      //   padding-right: 5px;
      // }
    }
    th:first-child {
      padding-left: 40px;
      @media (max-width: 768px) {
        padding-left: 5px;
      }
    }
    td:first-child {
      text-align: left;
      padding-left: 40px;
      display: flex;
      flex-direction: row;
      @media (max-width: 768px) {
        padding-left: 5px;
      }
    }
    td:last-child {
      text-align: center;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      padding-right: 20px;
      @media (max-width: 768px) {
        padding-right: 5px;
      }
    }
    .brc-service-price-td_bold {
      font-weight: 500;
      text-align: left !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    .brc-service-price-td_child {
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    .brc-service-price-table-link {
      text-decoration: none;
      color: $text-color;
      &:hover {
        color: red;
      }
    }

    .brc-price-list__item_red {
      margin-left: 15px;

      @media (max-width: 768px) {
        margin-left: 10px;
      }
    }
    // .brc-price-list__item_red:before {
    // color: $red;
    // content: '•';
    padding-right: 15px;
    // width: 10px;
    // line-height: 0px;
    // font-size: 30px;
    // margin-top: calc(0.5em - 3px);
    // @media (max-width: 768px) {
    //   margin-top: calc(0.5em - 6px);
    // }
    // }
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