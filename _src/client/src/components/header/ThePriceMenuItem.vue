<template>
  <li
    v-click-outside="
      () => {
        isMenuOpened = false;
      }
    "
    class="brc-price-menu-wrapper"
    @click="onClick"
  >
    <span id="dont_outside">Услуги</span>
    <ul
      v-if="isMenuOpened"
      class="brc-price-menu"
      :class="{ active: isMenuOpened === true }"
    >
      <div class="brc-price-menu__close dont_outside">&times;</div>
      <template v-if="getCurrentSiteSection !== null">
        <li
          v-for="iterService in serviceList"
          :key="iterService.businessServiceId"
          class="brc-price-menu__item"
          style="padding: 10px !important"
        >
          <nuxt-link
            :to="{
              name: 'service-card',
              params: {
                service: iterService.businessServiceUrl,
                siteSection: iterService.siteSectionUrl,
              },
            }"
            style="padding: -5px !important"
            >{{ iterService.businessServiceName }}</nuxt-link
          >
        </li>
      </template>

      <template v-for="iterPriceListItem in servicePriceList" v-else>
        <li
          :key="iterPriceListItem.id"
          class="brc-price-menu__item_bold"
          style="padding: 10px !important"
        >
          <nuxt-link
            :to="{
              name: 'activity-card',
              params: { siteSection: iterPriceListItem.sitesectionurl },
            }"
            style="padding: -5px !important"
            >{{ iterPriceListItem.name }}</nuxt-link
          >
        </li>
        <template v-for="iterPriceItem in iterPriceListItem.pricelist">
          <li
            :key="iterPriceItem.businesserviceid"
            class="brc-price-menu__item"
            style="padding: 10px !important"
          >
            <nuxt-link
              :to="{
                name: 'service-card',
                params: {
                  service: iterPriceItem.businesserviceurl,
                  siteSection: iterPriceItem.sitesectionurl,
                },
              }"
              style="padding: -5px !important"
              >{{ iterPriceItem.businesservicename }}</nuxt-link
            >
          </li>
        </template>
      </template>

      <li
        v-if="getCurrentSiteSection !== null"
        class="brc-price-menu__item"
        style="padding: 10px !important"
      >
        <!-- <nuxt-link
          v-if="getCurrentSiteSection !== null"
          :to="{ name: 'activity-card', params: {siteSection: getCurrentSiteSection}}"
          style="padding:-5px !important; color:red; font-weight:500;"
        >Все услуги...</nuxt-link>-->
        <nuxt-link
          :to="{ name: 'main' }"
          style="padding: -5px !important; color: red; font-weight: 500"
          >Все услуги...</nuxt-link
        >
      </li>
    </ul>
  </li>
</template>



<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BusinessService from '@/models/ekoset/BusinessService'
import BusinessServiceService from '@/services/BusinessServiceService'
import { ServiceRegistry } from '@/ServiceRegistry'

@Component({
  components: {
  }
})
export default class ThePriceMenuItem extends Vue {
  private isMenuOpened = false
  private serviceList: BusinessService[] = []
  private servicePriceList = []

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private onClick () {
    this.isMenuOpened = !this.isMenuOpened
  }


  @Watch('getCurrentSiteSection', { immediate: true })
  private async updatePriceList () {
    const siteSectionSlug = this.getCurrentSiteSection;
    this.serviceList = siteSectionSlug ? await ServiceRegistry.instance.getService(BusinessServiceService).getBySiteSectionSlug(siteSectionSlug, true) : []
    this.servicePriceList = !siteSectionSlug ? await ServiceRegistry.instance.getService(BusinessServiceService).getMainList() : []
  }

  private async created () {
    this.updatePriceList()
  }

}

</script>

<style lang="scss">
.brc-price-menu-wrapper {
  font-size: 0.938rem;
  position: relative;
  &:hover {
    color: $red;
    cursor: pointer;
  }
}

.brc-price-menu {
  display: none !important;
  // position: fixed;
  position: absolute;
  top: 20px;
  left: 0px;

  z-index: 2000;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-top: 1px solid lightgray;
  overflow-y: auto;
  list-style: none;
  list-style-type: none;
  text-transform: none;
  max-width: 90vw;
  max-height: 70vh;
  &.active {
    display: block !important;
  }

  @media (max-width: 900px) {
    position: fixed;
    width: 85vw;
    top: 80px;
    left: auto !important;
    margin: auto;
    max-height: calc(95vh - 140px);
  }
}

.brc-price-menu__close {
  display: none;
  position: sticky;
  float: right;
  font-size: 36px !important;
  background: rgba(255, 255, 255, 0);
  color: $text-color;
  cursor: pointer;
  right: 15px;
  top: 10px;
  line-height: 30px;
  margin-top: 0 !important;

  @media (max-width: 900px) {
    display: block;
  }
}

.brc-price-menu__item,
.brc-price-menu__item_bold {
  font-size: 16px !important;
  list-style-type: none;
  display: flex !important;
  align-items: center;
  padding: 10px;
  > a {
    color: $text-color;
    font-size: $font-small !important;
    display: block;
    margin-right: 30px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  @media (max-width: 900px) {
    > a {
      margin-right: 20px;
    }
    padding: 5px !important;
  }
}

.brc-price-menu__item:before {
  color: $red;
  content: "•";
  padding-right: 20px;
  width: 10px;
  line-height: 0px;
  font-size: 30px;
}

.brc-price-menu__item_bold {
  font-weight: 500;
  background-color: #f5f5f5;
  > a {
    font-size: 15px !important;
    text-align: left !important;
  }
}

// .brc-price-menu__item + .brc-price-menu__item {
//   border-top: 1px solid lightgray;
// }

.brc-price-menu__item,
.brc-price-menu__item_bold {
  border-top: 1px solid lightgray;
}
</style>