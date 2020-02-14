<template>
  <li class="brc-price-menu-wrapper" @click="onClick" v-click-outside="()=>{isMenuOpened=false}">
    <span>Услуги</span>
    <ul class="brc-price-menu" :class="{ 'active': isMenuOpened === true }">
      <li
        v-for="iterService in serviceList"
        :key="iterService.businessServiceId"
        class="brc-price-menu__item"
      >
        <nuxt-link
          :to="{ name: 'service-card', params: { service: iterService.businessServiceUrl, siteSection: getCurrentSiteSection}}"
        >{{iterService.businessServiceName}}</nuxt-link>
      </li>
    </ul>
  </li>
</template>



<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import { getServiceContainer } from '../../api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({
  components: {
  }
})
export default class ThePriceMenuItem extends Vue {
  private isMenuOpened = false
  private serviceList: BusinessService[] = []

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private onClick () {
    this.isMenuOpened = !this.isMenuOpened
  }


  @Watch('getCurrentSiteSection', { immediate: true })
  private async updatePriceList () {
    const siteSectionSlug = this.getCurrentSiteSection;
    this.serviceList = !!siteSectionSlug ? await getServiceContainer().businessServiceService.getBySiteSectionSlug(siteSectionSlug, true) : await getServiceContainer().businessServiceService.getMainList()

  }

  private async created () {
    this.updatePriceList()
  }

}

</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-price-menu-wrapper {
  font-size: 0.938rem;
  &:hover {
    color: $red;
    cursor: pointer;
  }
}

.brc-price-menu {
  display: none;
  position: absolute;
  z-index: 2000;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-top: 1px solid lightgray;
  transform-style: flat;
  transition: transform 0.3s ease-in-out;
  max-height: 60vh;
  overflow-y: auto;
  list-style: none;
  list-style-type: none;
  text-transform: none;
  min-width: max-content;
  max-width: 90vw;
  &.active {
    display: block;
  }
}

.brc-price-menu__item {
  font-size: $font-small;
  list-style-type: none;
  > a {
    color: $text-color;
    font-size: $font-small;
    display: block;
    margin: 10px;
    margin-right: 30px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }
}
.brc-price-menu__item + .brc-price-menu__item {
  border-top: 1px solid lightgray;
}
</style>