<template>
  <section>
    <TheBanner
      v-if="isSingleBanner"
      :h1="getFirstBanerInfo.bannerTitle"
      :alt="getFirstBanerInfo.bannerTitle"
      :image-src="getFirstBanerInfo.businessServiceImgBig"
    ></TheBanner>
    <b-carousel
      v-if="!isSingleBanner"
      v-model="bannersNmb"
      :animated="animated"
      :has-drag="drag"
      :autoplay="autoPlay"
      :pause-hover="pauseHover"
      :pause-info="pauseInfo"
      :pause-info-type="pauseType"
      :interval="interval"
      :repeat="repeat"
      class="brc-page-image__wrapper"
      @change="bannerChanged($event)"
    >
      <b-carousel-item
        v-for="iterBaner in bannersInfo"
        :key="iterBaner.businessServiceImgBig"
      >
        <nuxt-link :to="linkParams2Page">
          <figure
            v-if="!!iterBaner.businessServiceImgBig"
            style="position: relative; display: flex"
          >
            <img
              itemprop="image"
              :src="iterBaner.businessServiceImgBig"
              class="brc-page-image"
            />
            <h1
              v-if="!!iterBaner.bannerTitle"
              itemprop="headline name"
              class="brc-page-title"
            >
              {{ iterBaner.bannerTitle }}
            </h1>
          </figure>
        </nuxt-link>
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import BannersInfo from '@/models/ekoset/BannersInfo'
import TheBanner from '@/components/header/TheBanner.vue'

@Component({
  components: {
    TheBanner
  }
})
export default class TheDynamicBanner extends Vue {

  @Prop()
  private bannersInfo: BannersInfo[]

  private currentBanner: BannersInfo = new BannersInfo()

  private bannersNmb = 0
  private animated = 'slide'
  private drag = true
  private autoPlay = true
  private pauseHover = false
  private pauseInfo = false
  private repeat = true
  private pauseType = 'is-primary'
  private interval = 4000

  private bannerChanged (args: any) {
    this.currentBanner = this.bannersInfo[args]
  }

  private get isSingleBanner () {
    return this.bannersInfo.length === 1
  }

  private get getFirstBanerInfo () {
    return this.bannersInfo[0]
  }

  private get linkParams2Page () {

    if (!!this.currentBanner && this.currentBanner.businessServiceId > 0) {
      const params: any = {}
      params.name = 'service-card'
      params.params = {}
      params.params.siteSection = this.currentBanner.siteSectionUrl
      params.params.service = this.currentBanner.businessServiceUrl

      return params
    } else {
      return {}
    }
  }
}

</script>

