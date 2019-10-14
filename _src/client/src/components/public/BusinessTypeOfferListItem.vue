<template>
  <section class="brc-business-type-offer-item__wrapper">
    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: offerItem.indOfferUrl, siteSection: getCurrentSiteSection, clienttype: null}}"
      class="brc-business-type-offer-item"
    >
      <img
        :src="offerItem.indOfferImgSmall"
        :alt="offerItem.indOfferName"
        :title="offerItem.indOfferName"
        itemprop="image"
      />
      <h3>{{offerItem.indOfferName}}</h3>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component({})
export default class BusinessTypeOfferListItem extends Vue {
  @Prop()
  private offerItem: IndividualOffer

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
.brc-business-type-offer-item__wrapper {
  flex: 1;
  min-width: 250px;
  height: 145px;
  margin: 15px;

  .brc-business-type-offer-item {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 5px;

    overflow: hidden;
    display: block;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      object-position: center;
      transform: scale(1.15);
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
      transition: all 0.1s;
    }
    h3 {
      width: 100%;
      height: 100%;
      background-color: rgba(196, 196, 196, 0.7);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1a1a1a;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      transition: all 0.1s;
    }
    &:hover {
      img {
        filter: grayscale(0);
        -webkit-filter: grayscale(0);
        transform: scale(1);
      }
      h3 {
        color: #ffffff;
        background-color: rgba(196, 196, 196, 0);
        text-shadow: 0 1px 9px #26272d;
      }
    }
  }
}
</style>

