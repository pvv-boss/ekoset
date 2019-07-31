<template>
  <div>
    <header>Лабораторные исследования</header>
    <ResearchListItem
      v-for="researchItem in researchList"
      :key="researchItem.researchId"
      :researchItem="researchItem"
    ></ResearchListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ResearchListItem from '@/components/private/ResearchListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Research from '@/models/ekoset/Research.ts'

@Component({
  components: {
    ResearchListItem
  }
})
export default class ResearchList extends Vue {
  @Prop()
  private userId

  @Prop(String)
  private mode

  private researchList: Research[] = []

  private async asyncData (context: NuxtContext) {
    //FIXME: получение списка лабораторных исследований
    const data = await (getServiceContainer().articleService.getRootArticleList())
    if (data) {
      return {
        researchList: data
      }
    }
  }
}
</script>