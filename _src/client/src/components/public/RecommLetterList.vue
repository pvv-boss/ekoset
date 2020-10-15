<template>
  <!-- <div class="brc-letters"> -->
  <section>
    <b-carousel-list
      v-model="test"
      :data="brandsList"
      :items-to-show="4"
      :arrow="true"
      :arrow-hover="false"
      :repeat="true"
      :refresh="true"
      class="brc-letters_carousel_desctop"
    >
      <template slot="item" slot-scope="props">
        <RecommLetterListItem
          :brand="props.list"
          @letter:clicked="showBigLetter($event)"
        ></RecommLetterListItem>
      </template>
    </b-carousel-list>

    <b-carousel-list
      v-model="test"
      :data="brandsList"
      :items-to-show="2"
      :arrow="true"
      :arrow-hover="false"
      :repeat="true"
      :refresh="true"
      class="brc-letters_carousel_mobile"
    >
      <template slot="item" slot-scope="props">
        <RecommLetterListItem
          :brand="props.list"
          @letter:clicked="showBigLetter($event)"
        ></RecommLetterListItem>
      </template>
    </b-carousel-list>

    <div v-show="showBigImg" class="brc-letter-bigitem__wrapper">
      <div class="brc-letter-bigitem">
        <div
          class="brc-letter-bigitem__close"
          title="Закрыть"
          @click="closeShowBigLetter()"
        >
          &times;
        </div>
        <h4>{{ brandForShow.clBrandName }}</h4>
        <img
          :src="brandForShow.clBrandImgBig"
          :alt="brandForShow.clBrandName"
          :title="brandForShow.clBrandName"
          itemprop="image"
          class="brc-letter-smallitem__preview-img"
        />
      </div>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand'

@Component
export default class RecommLetterList extends Vue {
  @Prop(Array)
  private brandsList

  private showBigImg = false
  private brandForShow: ClBrand = new ClBrand()
  private test = 0

  private carouselItems2Show = 4

  public showBigLetter (brand: ClBrand) {
    this.showBigImg = true
    this.brandForShow = brand
  }

  public closeShowBigLetter () {
    this.showBigImg = false
    this.brandForShow = new ClBrand()
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.brc-letters {
  display: grid;
  // grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 30px;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    // grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 20px;
    padding-top: 20px;
    grid-gap: 10px;
  }
}

.brc-letters_carousel_desctop {
  @media (max-width: 1024px) {
    display: none;
  }
}

.brc-letters_carousel_mobile {
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
}

.carousel-list {
  &.has-shadow {
    box-shadow: none !important;
  }
}

.carousel-arrow {
  .icon {
    color: $red;
    border: 1px solid #ed0205;
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

