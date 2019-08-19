<template>
  <div>{{disinfectionWorkItem}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DisinfectionWorkListItem extends Vue {
  @Prop()
  private disinfectionWorkItem

  @Prop()
  private mode
}
</script>
