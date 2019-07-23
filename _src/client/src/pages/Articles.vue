<template>
  <section>
    <h1 itemprop="headline name">Список новостей</h1>
    <ArticleList :articleList="articleItems" mode="columns"></ArticleList>
    <div>{{pagination}}</div>
    <BasePagination
      :total="pagination.total"
      :currentPage.sync="pagination.currentPage"
      :limit="pagination.limit"
      @update:pagination="updatePagintaion"
    ></BasePagination>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BasePagination from '@/components/base/BasePagination.vue'
import ArticleList from '@/components/ekoset/article/ArticleList.vue'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ArticleList,
    BasePagination
  }
})
export default class Articles extends Vue {
  private pagination: Pagination = new Pagination()
  private articleItems: Article[] = []

  private updatePagintaion () {
    //обновляем список новостей
    console.debug("update")
  }
  private async asyncData (context: NuxtContext) {
    const siteSectionId = Number(context.params.siteSectionId)
    const data = await (!!siteSectionId && siteSectionId > 0 ? getServiceContainer().articleService.getArticleListBySiteSection(siteSectionId) : getServiceContainer().articleService.getRootArticleList())
    if (data) {
      return {
        articleItems: data,
        pagination: { total: 20, limit: 10, currentPage: 1 }
      }
    }
  }

  private head () {
    return { title: 'Список новостей' }
  }
}
</script>
