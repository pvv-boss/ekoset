<template>
  <div>{{contractItem}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ContractListItem extends Vue {
  @Prop()
  private contractItem

  @Prop()
  private mode
}
</script>
