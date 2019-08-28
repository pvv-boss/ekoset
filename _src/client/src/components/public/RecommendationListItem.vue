<template>
  <figure class="brc-recommend-smallitem__preview">
    <img
      :src="brand.clBrandImgSmall"
      :alt="brand.clBrandName"
      itemprop="image"
      class="brc-recommend-smallitem__preview-img"
    />
    <figcaption>{{brand.clBrandName}}</figcaption>
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand'

@Component({})
export default class RecommendationListItem extends Vue {
  @Prop()
  private brand: ClBrand
}
</script>


