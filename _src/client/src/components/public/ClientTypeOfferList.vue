<template>
  <div>
    <ClientTypeOfferListItem
      v-for="offerItem in offerList"
      :key="offerItem.activityId"
      :offerItem="offerItem"
    ></ClientTypeOfferListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClientTypeOfferListItem from '@/components/public/ClientTypeOfferListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { importDeclaration } from '@babel/types'

@Component({
  components: {
    ClientTypeOfferListItem
  }
})
export default class ClientTypeOfferList extends Vue {
  @Prop(Array)
  private offerList
}
</script>