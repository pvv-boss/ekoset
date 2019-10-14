<template>
  <div class="brc-business-type-offer-list">
    <BusinessTypeOfferListItem
      v-for="offerItem in offerList"
      :key="offerItem.indOfferId"
      :offerItem="offerItem"
    ></BusinessTypeOfferListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessTypeOfferListItem from '@/components/public/BusinessTypeOfferListItem.vue'
import IndividualOffer from '@/models/ekoset/IndividualOffer'

@Component({
  components: {
    BusinessTypeOfferListItem
  }
})
export default class BusinessTypeOfferList extends Vue {
  @Prop(Array)
  private offerList
}
</script>

<style lang="scss">
.brc-business-type-offer-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 30px -15px 0;
}

@media (max-width: 768px) {
  .brc-business-type-offer-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .brc-business-type-offer-item__wrapper {
    min-width: 120px;
    height: 100px;
  }

  .brc-client-type-offer-item {
    height: 100px;
  }
}
</style>