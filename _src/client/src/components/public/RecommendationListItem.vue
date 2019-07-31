<template>
  <div>Рекомендация</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class RecommendationListItem extends Vue {
  @Prop()
  private recommendationItem
}
</script>



