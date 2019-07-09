<template>
  <div>
    <h1 itemprop="headline name">Список новостей</h1>
    <articleList :articleList="articleItems" mode="columns"></articleList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ArticleList from '@/components/ekoset/article/ArticleList.vue'
import Pagination from '@/models/Pagination.ts'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ArticleList
  }
})
export default class Articles extends Vue {
  private pagination: Pagination = new Pagination()
  private articleItems: Article[] = []

  private async asyncData (context: NuxtContext) {
    const siteSectionId = Number(context.params.siteSectionId)

    const data = (siteSectionId > 0 ? getServiceContainer().articleService.getArticleListBySiteSection(siteSectionId) : getServiceContainer().articleService.getRootArticleList())
    if (data) {
      return {
        articleItems: data
      }
    }
  }

  private head () {
    return { title: 'Список новостей' }
  }
}
</script>
