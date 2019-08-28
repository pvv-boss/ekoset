<template>
  <div>Клиент</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClClient from '@/models/ekoset/ClClient'

@Component({})
export default class ClientListItem extends Vue {
  @Prop()
  private clientItem: ClClient
}
</script>



