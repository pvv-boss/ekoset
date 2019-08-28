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
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

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
    this.updateArticleList()
  }

  private async updateArticleList () {
    const activitySlug = getModule(AppStore, this.$store).currentSiteSection
    const articleList = activitySlug ? await getServiceContainer().articleService.getArticleListBySiteSectionSlug(activitySlug, this.pagination) : await getServiceContainer().articleService.getRootArticleList(this.pagination)

    if (articleList) {
      this.articleItems = articleList
      Object.freeze(this.articleItems)
    }
  }

  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)
    const startPagination = new Pagination()
    const activitySlug = context.params.activity
    const articleList = activitySlug ? getServiceContainer().articleService.getArticleListBySiteSectionSlug(activitySlug, startPagination) : getServiceContainer().articleService.getRootArticleList(startPagination)

    const data = await Promise.all([articleList])
    return {
      apiSharedData,
      pagination: startPagination,
      articleItems: data[0]
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
