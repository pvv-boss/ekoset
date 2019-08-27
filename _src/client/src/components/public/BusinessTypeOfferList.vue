<template>
  <div>
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