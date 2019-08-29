<template>
  <div class="brc-recommendations__wrapper">
    <h2>Нас рекомендуют</h2>
    <div class="brc-recommendations">
      <RecommendationListItem
        v-for="iterBrand in brandList"
        :key="iterBrand.clBrandId"
        :brand="iterBrand"
      ></RecommendationListItem>
    </div>
    <div class="brc-all-recomndation-link__wrapper">
      <nuxt-link :to="{ name: 'main'}" class="brc-all-recomndation-link">Все рекомендации</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RecommendationListItem from '@/components/public/RecommendationListItem.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    RecommendationListItem
  }
})
export default class RecommendationList extends Vue {
  @Prop(Array)
  private brandList

  //TODO: убрать, когда появятся в базе
  private mounted () {
    this.brandList = []
    for (let i = 0; i < 10; i++) {
      let item = new ClBrand()
      item.clBrandId = i
      if (i % 2 === 0) {
        item.clBrandName = "AirLines"
        item.clBrandImgSmall = "/images/recommend/airlines.png"
      }
      else {
        item.clBrandName = "Газпром Нефть"
        item.clBrandImgSmall = "/images/recommend/gasprom.png"
      }
      this.brandList.push(item)
    }
  }
}
</script>

<style lang="scss">
.brc-recommendations__wrapper {
  margin: 30px 0 60px;
  h3 {
    text-align: center;
  }
  .brc-recommendations {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .brc-all-recomndation-link__wrapper {
    margin-top: 15px;

    .brc-all-recomndation-link {
      border: 1px solid red;
      color: red;
      text-decoration: none;
      width: 200px;
      max-width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      margin: auto;

      &:hover {
        background-color: red;
        color: white;
      }
    }
  }
}
</style>
