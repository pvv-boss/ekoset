<template>
  <div
    class="brc-business-type-offer-list"
    :class="{ 'brc-business-type-offer-list_empty' : offerList.length % 4 !== 0 }"
  >
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
  //@Prop(Array)
  private offerList: IndividualOffer[] = []

  //TODO: убрать, когда появятся в базе
  private mounted () {
    this.offerList = []
    for (let i = 0; i < 8; i++) {
      let item = new IndividualOffer()
      item.indOfferId = i
      item.indOfferUrl = "uslugi_avtosalonov-1"
      if (i % 2 === 0) {
        item.indOfferName = "Больницам"
        item.indOfferImgSmall = "/images/individual-offer/individual-offer-3.png"
      }
      else {
        item.indOfferName = "Автосалонам"
        item.indOfferImgSmall = "/images/individual-offer/individual-offer-1.png"
      }
      this.offerList.push(item)
    }
  }
}
</script>

<style lang="scss">
.brc-business-type-offer-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  align-content: space-around;
  flex-wrap: wrap;
  margin: 30px -15px 60px;
}

@media (min-width: 800px) {
  .brc-business-type-offer-list_empty:after {
    content: "";
    flex: auto;
  }
}
</style>