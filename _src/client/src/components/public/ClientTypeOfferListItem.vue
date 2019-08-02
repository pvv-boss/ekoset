<template>
  <div>Индивидуальное предложение</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ClientTypeOfferListItem extends Vue {
  @Prop()
  private offerItem
}
</script>



