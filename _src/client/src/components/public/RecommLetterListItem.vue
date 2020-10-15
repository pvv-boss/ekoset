<template>
  <div class="brc-letter-smallitem__wrapper">
    <figure class="brc-letter-smallitem__preview" @click="$emit('letter:clicked', brand)">
      <p>{{brand.clBrandName}}</p>
      <img
        :src="imageSrc"
        :alt="brand.clBrandName"
        :title="brand.clBrandName"
        itemprop="image"
        class="brc-letter-smallitem__preview-img"
      />
      <figcaption>{{brand.clBrandName}}</figcaption>
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand'

@Component({})
export default class RecommLetterListItem extends Vue {
  @Prop()
  private brand: ClBrand

  @Prop()
  private imageSrcForDesignMode: string


  private get imageSrc () {
    return this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.brand.clBrandImgBig
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-letter-smallitem__wrapper {
  text-align: center;
}

.brc-letter-smallitem__preview {
  text-align: center;
  padding: 15px;
  margin: 15px;
  margin-top: 0px;
  border: 1px solid #efefef;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin: 0px;
    padding: 10px;
  }

  &:hover {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
  .brc-letter-smallitem__preview-img {
    max-width: 100%;
    // min-height: 250px;
  }
}
</style>
