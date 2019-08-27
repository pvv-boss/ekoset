<template>
  <section>
    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: offerItem.indOfferUrl, activity: getCurrentSiteSection, clienttype: null}}"
    >{{offerItem.indOfferName}}</nuxt-link>
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



