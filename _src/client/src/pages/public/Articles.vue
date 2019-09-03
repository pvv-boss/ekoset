<template>
  <section>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
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
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    ArticleList,
    BasePagination,
    BreadCrumbs
  }
})
export default class Articles extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private pagination: Pagination = new Pagination()
  private articleItems: Article[] = []
  private breadCrumbList: Object[] = []
  private siteSection: string = ''

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
    const siteSection = context.params.siteSection
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)
    const startPagination = new Pagination()
    const siteSectionSlug = context.params.siteSection
    const articleList = siteSectionSlug ? getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSectionSlug, startPagination) : getServiceContainer().articleService.getRootArticleList(startPagination)

    const data = await Promise.all([articleList])
    return {
      apiSharedData,
      pagination: startPagination,
      articleItems: data[0],
      siteSection
    }
  }

  private async mounted () {
    getModule(AppStore, this.$store).changeCurrentSiteSection(this.siteSection)
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (this.siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: 'Новости', link: '' })
      });
    }
    else {
      this.breadCrumbList.push({ name: 'Новости', link: '' })
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
