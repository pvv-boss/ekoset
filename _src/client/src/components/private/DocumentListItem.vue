<template>
  <div>{{documentItem}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DocumentListItem extends Vue {
  @Prop()
  private documentItem

  @Prop()
  private mode
}
</script>
