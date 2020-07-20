<template>
  <section class="brc-service-smallitem">
    <nuxt-link
      :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: serviceItem.siteSectionUrl}}"
      class="brc-service-smallitem__link"
    >
      <figure>
        <img :alt="serviceItem.businessServiceName" itemprop="image" :src="imageSrc" />
        <figcaption>{{serviceItem.businessServiceName}}</figcaption>
      </figure>

      <h4>{{serviceItem.businessServiceName}}</h4>
      <div class="brc-service-smallitem__price">{{serviceItem.businessServicePrice}}</div>
    </nuxt-link>

    <a class="brc-buscet__icon_mobile" @click="addServiceToBuscet">
      <span>{{basketImageInfoMobile.alt}}</span>
      <img
        :src="basketImageInfoMobile.src"
        :alt="basketImageInfoMobile.alt"
        :title="basketImageInfoMobile.alt"
      />
    </a>

    <a class="brc-buscet__icon_desktop" @click="addServiceToBuscet">
      <img :src="basketImageInfo.src" :alt="basketImageInfo.alt" :title="basketImageInfo.alt" />
    </a>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import BuscetStore from '@/store/BuscetStore'
import { findAddedServiceIndex } from '@/store/BuscetStore'
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem'

@Component({})
export default class ServiceListItem extends Vue {
  @Prop()
  private serviceItem: BusinessService

  @Prop()
  private imageSrcForDesignMode: string

  private basketImageInfo: any = { src: '/images/addBusketBlack.svg', alt: 'Добавить в корзину' }
  private basketImageInfoMobile: any = { src: '/images/addBusketWhite.svg', alt: 'В корзину' }

  private get imageSrc () {
    return !!this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.serviceItem.businessServiceImgSmall
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)


  @Watch('buscetStore.addedServiceList')
  public onBasketChanged () {
    this.updateBasketImage()
    this.updateBasketImageMobile()
  }

  public addServiceToBuscet () {
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, BusinessServiceLocalStorageItem.createFromBusinessService(this.serviceItem))
    if (ind === -1) {
      this.buscetStore.addService(BusinessServiceLocalStorageItem.createFromBusinessService(this.serviceItem))
    } else {
      this.buscetStore.removeService(BusinessServiceLocalStorageItem.createFromBusinessService(this.serviceItem))
    }
    this.updateBasketImage()
    this.updateBasketImageMobile()
  }

  public updateBasketImage () {
    const wrapper = BusinessServiceLocalStorageItem.createFromBusinessService(this.serviceItem)
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, wrapper)
    const info = ind === -1 ? { src: '/images/addBusketBlack.svg', alt: 'Добавить в корзину' } : { src: '/images/checkBasket.svg', alt: 'Убрать из корзины' }
    this.basketImageInfo.src = info.src
    this.basketImageInfo.alt = info.alt
  }

  public updateBasketImageMobile () {
    const wrapper = BusinessServiceLocalStorageItem.createFromBusinessService(this.serviceItem)
    const ind = findAddedServiceIndex(this.buscetStore.addedServiceList, wrapper)
    const info = ind === -1 ? { src: '/images/addBusketWhite.svg', alt: 'В корзину' } : { src: '/images/checkBasketWhite.svg', alt: 'В корзине' }
    this.basketImageInfoMobile.src = info.src
    this.basketImageInfoMobile.alt = info.alt
  }

  public mounted () {
    this.updateBasketImage()
    this.updateBasketImageMobile()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-service-smallitem {
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 5px;
  margin-top: 0px;
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 423px) {
    padding: 8px;
  }

  &:hover {
    border: 1px solid $red;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }

  .brc-buscet__icon_desktop {
    position: absolute;
    right: 10px;
    bottom: 10px;
    // border: 2px solid #ccc;
    // border-radius: 50%;
    padding: 4px;

    img {
      width: 30px !important;
      height: 30px !important;
      margin: 0px !important;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .brc-buscet__icon_mobile {
    display: none;
    background-color: #b2b2b2;
    padding: 5px;
    padding-left: 8px;
    padding-top: 1px;
    padding-bottom: 2px;
    margin-left: -10px;
    margin-right: -10px;
    margin-bottom: -10px;

    img {
      width: 24px !important;
      height: 24px !important;
      margin: 0px !important;
    }
    span {
      font-size: 13px;
      color: white;
    }
    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .brc-service-smallitem__price {
    font-weight: 500;
    margin-bottom: 15px;
    @media (max-width: 768px) {
      margin-bottom: 5px;
    }
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }
  .brc-service-smallitem__price,
  .brc-service-smallitem__order-wrapper,
  .brc-service-smallitem__link-wrapper {
    margin-top: 15px;
    align-self: flex-end;
    width: 100%;
    text-align: center;
  }

  h4 {
    margin: auto;
    margin-top: 15px;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    flex-grow: 1;
    @media (max-width: 500px) {
      font-weight: $font-regular;
      font-size: 13px;
      margin-top: 5px;
    }
  }
  .brc-service-smallitem__link {
    color: $text-color;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
  }

  img {
    width: 122px;
    height: 122px;
    object-fit: contain;
    object-position: center;
    margin-top: 15px;

    @media (max-width: 768px) {
      margin-top: 0px;
    }
  }

  .brc-service-smallitem__order {
    border: 1px solid red;
    background-color: white;
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
      cursor: pointer;
    }
  }
}
</style>

