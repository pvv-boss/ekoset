<template>
  <div itemscope itemtype="http://schema.org/Article">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <header>
      <h1 itemprop="headline name">{{article.articleTitle}}</h1>
    </header>
    <figure class="brc-article-item__header-img">
      <img
        :src="article.articleHeaderImgSrc"
        :alt="article.articleTitle"
        itemprop="image"
        class="brc-article-item__header-img"
      />
      <figcaption>{{article.articleTitle}}</figcaption>
    </figure>
    <div class="brc-article-item__stat-info">
      <div class="brc-article-item__date">
        <span
          itemprop="datePublished"
          :content="article.articlePublishDate ? new Date(article.articlePublishDate).toISOString().split('T')[0] : ''"
        >{{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
      </div>
      <div class="brc-article-item__views" v-if="article.articleViewsNumber > 0">
        <img src="/images/eye.svg" alt="Количество просмотров" title="Количество просмотров" />
        <span>{{article.articleViewsNumber}}</span>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="brc-article-wrapper">
      <section
        class="brc-article-item"
        :class="{'brc-article-item_full-width': realtedArticles.length===0}"
      >
        <article v-html="article.articleBody" itemprop="articleBody"></article>
      </section>
      <section class="brc-article-related" v-if="realtedArticles.length>0">
        <h2>Похожие новости</h2>
        <ArticleList :articleList="realtedArticles" mode="vertical"></ArticleList>
      </section>
    </div>
    <TheShareSocial></TheShareSocial>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ArticleList from '@/components/public/ArticleList.vue'
import TheShareSocial from '@/components/TheShareSocial.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    ArticleList,
    TheShareSocial,
    BreadCrumbs
  }
})
export default class ArticleCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private article = new Article()
  private realtedArticles: Article[] = []
  private breadCrumbList: Object[] = []
  private siteSection: string = ''

  private async asyncData (context: NuxtContext) {
    const siteSection = context.params.siteSection
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.siteSection)

    const articleUrl = context.params.article
    const articlePr = getServiceContainer().articleService.getArticleBySlug(articleUrl)
    const relatedListPr = getServiceContainer().articleService.getRelatedArticleListBySlug(articleUrl)
    const data = await Promise.all([articlePr, relatedListPr])

    return {
      apiSharedData,
      article: data[0],
      realtedArticles: data[1],
      siteSection
    }
  }

  private async mounted () {
    getModule(AppStore, this.$store).changeCurrentSiteSection(this.siteSection)
    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (this.siteSection) {
      await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.siteSection).then(value => {
        this.breadCrumbList.push({ name: value.siteSectionName, link: 'activity-card', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: 'Новости', link: 'news', params: { siteSection: this.siteSection } })
        this.breadCrumbList.push({ name: this.article.articleTitle, link: '' })
      });
    }
    else {
      this.breadCrumbList.push({ name: 'Новости', link: 'news', params: { siteSection: this.siteSection } })
      this.breadCrumbList.push({ name: this.article.articleTitle, link: '' })
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

<style lang="scss">
.brc-article-list_vertical {
  margin-top: 0;
}
.brc-article-item__stat-info {
  color: gray;
  display: flex;
  font-size: 13px;

  .brc-article-item__views {
    margin-left: 15px;
  }
}
.brc-article-item__header-img {
  max-width: 100%;
  img {
    max-width: 100% !important;
  }

  figcaption {
    display: none;
  }
}

.brc-article-tags {
  padding: 15px 0;
  ul {
    li {
      display: inline;
      list-style-type: "#";
      color: lightgrey;
    }
  }
}
.brc-article-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;

  & * {
    overflow-wrap: break-word;
    white-space: normal;
  }
  .brc-article-item {
    flex: 5;
    max-width: 75%;

    ul,
    ol {
      margin-left: 20px;
    }
    h1,
    h2,
    h3 {
      text-align: unset !important;
    }
    &.brc-article-item_full-width {
      max-width: 100% !important;
    }
    img {
      max-width: 100%;
    }
  }
  .brc-article-related {
    flex: 2;
    padding-left: 30px;
    > h2 {
      text-align: left;
    }
  }
}

@media (max-width: 768px) {
  .brc-article-wrapper {
    flex-direction: column;
  }
  .brc-article-item {
    max-width: 100% !important;
  }
  .brc-article-related {
    padding-left: 0 !important;
  }
}
</style>
