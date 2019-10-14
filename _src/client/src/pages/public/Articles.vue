<template>
  <section>
    <h1 itemprop="headline name">Список новостей</h1>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
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
  private breadCrumbList: any[] = []

  private updatePagintaion () {
    this.updateArticleList()
  }

  private async updateArticleList () {
    const activitySlug = getModule(AppStore, this.$store).currentSiteSection
    const articleList = activitySlug ? await getServiceContainer().articleService.getArticleListBySiteSectionSlug(activitySlug, this.pagination) : await getServiceContainer().articleService.getRootArticleList(this.pagination)
    this.articleItems = articleList
  }

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(siteSection)
    const startPagination = new Pagination()
    const articleList = siteSection ? getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSection, startPagination) : getServiceContainer().articleService.getRootArticleList(startPagination)

    const data = await Promise.all([articleList])
    return {
      apiSharedData,
      pagination: startPagination,
      articleItems: data[0]
    }
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection

    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSectionSlug) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'activity-card', params: { siteSection: siteSectionSlug } })
    }
    this.breadCrumbList.push({ name: 'Новости', link: '' })
  }

  private head () {
    return {
      title: this.apiSharedData.seoMeta.pageTitle,
      meta: this.apiSharedData.seoMeta.metaTags
    }
  }
}
</script>
