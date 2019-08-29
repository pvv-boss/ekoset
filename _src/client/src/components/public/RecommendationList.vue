<template>
  <div class="brc-recommendations">
    <RecommendationListItem
      v-for="iterBrand in brandList"
      :key="iterBrand.clBrandId"
      :brand="iterBrand"
    ></RecommendationListItem>
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

@media (min-width: 330px) {
  .brc-recommendations:after {
    content: "";
    flex: auto;
  }
}
</style>
