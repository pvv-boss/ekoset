<template>
  <div>
    <BusinessTypeOfferListItem
      v-for="offerItem in offerList"
      :key="offerItem.activityId"
      :offerItem="offerItem"
    ></BusinessTypeOfferListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessTypeOfferListItem from '@/components/public/BusinessTypeOfferListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { importDeclaration } from '@babel/types'

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