<template>
  <section class="brc-client-type-offer-list">
    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: null, siteSection: getCurrentSiteSection, clienttype: 'business'}}"
      class="brc-client-type-offer-item"
    >
      <v-lazy-image
        src="/images/solutions-business.png"
        alt="Комлексное решение для бизнеса"
        title="Комлексное решение для бизнеса"
        itemprop="image"
      />
      <h3>Для бизнеса</h3>
    </nuxt-link>

    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: null, siteSection: getCurrentSiteSection, clienttype: 'person'}}"
      class="brc-client-type-offer-item"
    >
      <v-lazy-image
        src="/images/solutions-person.png"
        alt="Комлексное решение для дома"
        title="Комлексное решение для дома"
        itemprop="image"
      />
      <h3>Для дома</h3>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component
export default class ClientTypeOfferList extends Vue {
  @Prop(Array)
  private offerList

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

}
</script>

<style lang="scss">
.brc-client-type-offer-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 30px 0 0;
}
.brc-client-type-offer-item {
  width: calc(50% - 10px);
  min-width: 150px;
  height: 150px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    transform: scale(1.15);
    transition: 0.3s;
  }
  h3 {
    width: 50%;
    height: 100%;
    color: #ffffff;
    font-weight: 500;
    text-align: center;
    background-color: rgba(237, 2, 5, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.3s;
  }
  &:hover {
    h3 {
      background-color: rgba(237, 2, 5, 0.95);
    }
    img {
      transform: scale(1);
    }
  }
  &:last-child {
    display: flex;
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .brc-client-type-offer-item {
    width: 100%;
    &:last-child {
      margin-top: 30px;
    }
  }
}
</style>