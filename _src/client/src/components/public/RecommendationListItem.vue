<template>
  <div class="brc-recommend-smallitem__wrapper">
    <figure class="brc-recommend-smallitem__preview">
      <img
        src="/images/recommend/airlines.png"
        :alt="brand.clBrandName"
        :title="brand.clBrandName"
        itemprop="image"
        class="brc-recommend-smallitem__preview-img"
      />
      <figcaption>{{brand.clBrandName}}</figcaption>
    </figure>
  </div>
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

<style lang="scss">
.brc-recommend-smallitem__wrapper {
  padding: 15px 15px;
  flex: 1;
  min-width: 200px;
  display: flex;
  justify-content: center;
}
.brc-recommend-smallitem__preview {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background-color: #f4f4f5;
  width: 100%;
  padding: 15px 0;
  .brc-recommend-smallitem__preview-img {
    max-width: 110px;
    margin: auto;
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray; /* IE 6-9 */
    opacity: 0.5;

    -webkit-transition: all 0.1s;
    -moz-transition: all 0.1s;
    -o-transition: all 0.1s;
    transition: all 0.1s;
  }
  &:hover {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
    .brc-recommend-smallitem__preview-img {
      -webkit-filter: none;
      -moz-filter: none;
      -ms-filter: none;
      -o-filter: none;
      opacity: 1;
      filter: none;
      filter: none; /* IE 6-9 */
      cursor: pointer;
    }
  }
}
</style>
