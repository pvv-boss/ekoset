<template>
  <div class="brc-recommendations">
    <h4>Нас рекомендуют</h4>
    <RecommendationListItem
      v-for="recommendationItem in recommendationList"
      :key="recommendationItem.recommendationId"
      :recommendationItem="recommendationItem"
    ></RecommendationListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RecommendationListItem from '@/components/public/RecommendationListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { importDeclaration } from '@babel/types'

@Component({
  components: {
    RecommendationListItem
  }
})
export default class RecommendationList extends Vue {
  @Prop(Array)
  private recommendationList
}
</script>

<style lang="scss">
.brc-recommendations {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-around;
  flex-wrap: wrap;

  &:after {
    content: "";
    flex: auto;
  }

  .brc-recommend-smallitem__preview {
    width: 90px;
  }
}
</style>
