<template>
  <div class="brc-letter-smallitem__wrapper">
    <figure class="brc-letter-smallitem__preview" @click="showBigImg = true">
      <p>{{recommLetter.recommTitle}}</p>
      <img
        :src="imageSrc"
        :alt="recommLetter.recommTitle"
        :title="recommLetter.recommTitle"
        itemprop="image"
        class="brc-letter-smallitem__preview-img"
      />
      <figcaption>{{recommLetter.recommTitle}}</figcaption>
    </figure>
    <div
      class="brc-letter-bigitem__wrapper"
      v-show="showBigImg"
      :id="`recLetterModal-${recommLetter.recommId}`"
    >
      <div class="brc-letter-bigitem">
        <div class="brc-letter-bigitem__close" @click="showBigImg = false" title="Закрыть">&times;</div>
        <p>{{recommLetter.recommTitle}}</p>
        <img
          :src="recommLetter.recommBrandImg"
          :alt="recommLetter.recommTitle"
          :title="recommLetter.recommTitle"
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

@Component({})
export default class RecommLetterListItem extends Vue {
  @Prop()
  private recommLetter: ReccomendationLetter
  @Prop()
  private imageSrcForDesignMode: string

  private get imageSrc () {
    return !!this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.recommLetter.recommBrandImg
  }

  private showBigImg: boolean = false

  private mounted () {
    const ariseElement = document.getElementById('recLetterModal-' + this.recommLetter.recommId)
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

  &:hover {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
  .brc-letter-smallitem__preview-img {
    max-width: 100%;
    min-height: 250px;
  }
}

.brc-letter-bigitem__wrapper {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.9);
  width: 100%;
  height: 100vh;
  padding: 16px;

  .brc-letter-bigitem {
    background-color: white;
    width: 100%;
    max-width: 600px;
    margin: auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    outline: 0;
  }

  img {
    max-height: 100%;
    max-width: 100%;
  }

  .brc-letter-bigitem__close {
    float: right;
    cursor: pointer;
    font-size: 36px;
    color: lightgray;
    line-height: 36px;
    padding-right: 6px;
  }
}
</style>
