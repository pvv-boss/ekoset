<template>
  <li>{{clientItem.partnerName}}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Partner from '@/models/ekoset/Partner'

@Component({})
export default class ClientListItem extends Vue {
  @Prop()
  private clientItem: Partner
}
</script>



