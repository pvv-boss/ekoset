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

  @Prop()
  private imageSrcForDesignMode: string

  private get imageSrc () {
    return !!this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.serviceItem.businessServiceImgSmall
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-service-smallitem {
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
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
    flex-grow: 1;
    @media (max-width: 500px) {
      font-weight: $font-regular;
      font-size: 13px;
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
    height: 100%;
    object-fit: cover;
    object-position: center;
    max-height: 122px;
    // max-width: 122px;
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

