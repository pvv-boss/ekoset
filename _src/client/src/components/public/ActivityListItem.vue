<template>
  <div>Направление деятельности</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ActivityListItem extends Vue {
  @Prop()
  private activityItem
}
</script>



