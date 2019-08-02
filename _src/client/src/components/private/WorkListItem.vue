<template>
  <div>{{workItem}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class WorkListItem extends Vue {
  @Prop()
  private workItem

  @Prop()
  private mode
}
</script>
