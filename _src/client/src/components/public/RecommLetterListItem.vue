<template>
  <div class="brc-letter-smallitem__wrapper">
    <figure class="brc-letter-smallitem__preview" @click="showBigImg = true">
      <p>{{brand.clBrandName}}</p>
      <v-lazy-image
        :src="imageSrc"
        :alt="brand.clBrandName"
        :title="brand.clBrandName"
        itemprop="image"
        class="brc-letter-smallitem__preview-img"
      />
      <figcaption>{{brand.clBrandName}}</figcaption>
    </figure>
    <div
      class="brc-letter-bigitem__wrapper"
      v-show="showBigImg"
      :id="`recLetterModal-${brand.clBrandId}`"
    >
      <div class="brc-letter-bigitem">
        <div class="brc-letter-bigitem__close" @click="showBigImg = false" title="Закрыть">&times;</div>
        <h4>{{brand.clBrandName}}</h4>
        <img
          :src="brand.clBrandImgBig"
          :alt="brand.clBrandName"
          :title="brand.clBrandName"
          itemprop="image"
          class="brc-letter-smallitem__preview-img"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter'
import ClBrand from '@/models/ekoset/ClBrand'

@Component({})
export default class RecommLetterListItem extends Vue {
  @Prop()
  private brand: ClBrand
  @Prop()
  private imageSrcForDesignMode: string

  private get imageSrc () {
    return !!this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.brand.clBrandImgBig
  }

  private showBigImg: boolean = false

  private mounted () {
    const ariseElement = document.getElementById('recLetterModal-' + this.brand.clBrandId)
    if (ariseElement) {
      ariseElement.addEventListener('click', (e) => {
        if (!ariseElement.children[0].contains(e.target as HTMLElement)) {
          // ariseElement.setAttribute('style', 'display:none')
          this.showBigImg = false
        }
      })
    }

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

.brc-letter-bigitem__wrapper {
  position: fixed;
  z-index: 900000;
  top: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.9);
  width: 100vw;
  height: 100vh;
  padding: 16px;

  .brc-letter-bigitem {
    position: fixed;
    background-color: white;
    width: 90%;
    max-width: 600px;
    height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    outline: 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 15px 15px 10px 15px;

    img {
      margin-top: 15px;
      // height: 100%;
      height: calc(100% - 60px);
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
  }

  h4 {
    text-align: center;
    padding-bottom: 15px;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    border-bottom: 1px solid $red;
  }

  .brc-letter-bigitem__close {
    position: absolute;
    cursor: pointer;
    font-size: 32px !important;
    cursor: pointer;
    color: $red;
    right: 10px;
    top: 10px;
    line-height: 20px;
    margin-top: 0 !important;
  }
}
</style>
