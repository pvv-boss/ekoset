<template>
  <section>
    <h1 itemprop="headline name">Список новостей</h1>
    <ArticleList :articleList="articleItems" mode="columns"></ArticleList>
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
import ArticleList from '@/components/public/ArticleList.vue'
import Pagination from '@/models/Pagination'
import Article from '@/models/ekoset/Article'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ApiSharedData from '@/models/ekoset/ApiSharedData'

@Component({
  components: {
    ArticleList,
    BasePagination
  }
})
export default class Articles extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private pagination: Pagination = new Pagination()
  private articleItems: Article[] = []

  private updatePagintaion () {
    // обновляем список новостей
  }

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData()

    const activitySlug = context.params.activity
    const articleList = activitySlug ? getServiceContainer().articleService.getArticleListBySiteSectionSlug(activitySlug) : getServiceContainer().articleService.getRootArticleList()

    const data = await Promise.all([articleList])
    return {
      apiSharedData,
      articleItems: data[0],
      pagination: { total: 5, limit: 3, currentPage: 1 }
    }
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
