<template>
  <div class="brc-recommendations__wrapper">
    <div class="brc-recommendations">
      <RecommendationListItem
        v-for="iterBrand in brandList"
        :key="iterBrand.clBrandId"
        :brand="iterBrand"
      ></RecommendationListItem>
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
}
</script>

<style lang="scss">
.brc-recommendations__wrapper {
  margin: 30px 0 0;
  .brc-recommendations {
    margin: 0px -15px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 768px) {
    .brc-recommendations {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
}
</style>
