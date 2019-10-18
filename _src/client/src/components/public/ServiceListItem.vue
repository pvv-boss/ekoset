<template>
  <section class="brc-service-smallitem">
    <figure>
      <nuxt-link
        :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: getCurrentSiteSection}}"
        class="brc-service-smallitem__link"
      >
        <img
          :alt="serviceItem.businessServiceName"
          itemprop="image"
          :src="serviceItem.businessServiceImgSmall"
        />
      </nuxt-link>
      <figcaption>{{serviceItem.businessServiceName}}</figcaption>
    </figure>

    <h4>{{serviceItem.businessServiceName}}</h4>
    <div
      class="brc-service-smallitem__price"
    >от&nbsp;{{Number(serviceItem.businessServicePrice).toLocaleString('ru-RU')}}&nbsp;₽</div>
    <div class="brc-service-smallitem__order-wrapper">
      <button
        type="button"
        class="brc-service-smallitem__order"
        @click="navigateToOfferForm"
      >Заказать</button>
    </div>
    <div class="brc-service-smallitem__link-wrapper">
      <nuxt-link
        :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: getCurrentSiteSection}}"
        class="brc-service-smallitem__link"
      >Подробнее</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({})
export default class ServiceListItem extends Vue {
  @Prop()
  private serviceItem: BusinessService


  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private navigateToOfferForm (e) {
    const formElement = document.getElementById('btnOrderPopupForm')
    if (formElement) {
      formElement.setAttribute('style', 'display:block');
    }
    e.preventDefault()
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.brc-service-smallitem {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  margin-top: 0px;
  flex: 1;
  min-width: 220px;
  text-align: center;
  display: flex;
  flex-direction: column;

  &:hover {
    border: 1px solid $red;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }

  .brc-service-smallitem__price {
    font-weight: 500;
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
    color: $text-color;
  }
  .brc-service-smallitem__link {
    color: $text-muted;
    text-decoration: underline;
    font-size: $font-small;
    &:hover {
      color: $text-color;
    }
  }

  img {
    // width: 100%;
    object-fit: cover;
    object-position: center;
    height: 122px;
    // max-width: 122px;
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

