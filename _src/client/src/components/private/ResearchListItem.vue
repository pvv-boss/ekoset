<template>
  <div>{{researchItem}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ResearchListItem extends Vue {
  @Prop()
  private researchItem

  @Prop()
  private mode
}
</script>
