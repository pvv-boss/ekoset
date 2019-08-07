<template>
  <figure class="brc-recommend-smallitem__preview">
    <img
      :src="recommendationItem.recommendationPreviewImgSrc"
      :alt="recommendationItem.recommendationTitle"
      itemprop="image"
      class="brc-recommend-smallitem__preview-img"
    />
    <figcaption>{{recommendationItem.recommendationTitle}}</figcaption>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class RecommendationListItem extends Vue {
  @Prop()
  private recommendationItem
}
</script>



