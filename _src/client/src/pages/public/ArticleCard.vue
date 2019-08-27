<template>
  <div itemscope itemtype="http://schema.org/Article">
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
      <div class="brc-article-item__views" v-if="article.articleViewsNumber > 0">
        <img src="/images/eye-iccon.png" alt="Количество просмотров" />
        <span>{{article.articleViewsNumber}}</span>
      </div>
      <div class="brc-article-item__date">
        <img src="/images/clock-iccon.png" alt="Дата публикации" />
        <span
          itemprop="datePublished"
          :content="article.articlePublishDate ? new Date(article.articlePublishDate).toISOString().split('T')[0] : ''"
        >{{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="brc-article-wrapper">
      <section class="brc-article-item">
        <article v-html="article.articleBody" itemprop="articleBody"></article>
      </section>
      <section class="brc-article-related">
        <h2>Похожие новости</h2>
        <ArticleList :articleList="realtedArticles" mode="vertical"></ArticleList>
      </section>
    </div>
    <div class="brc-article-tags">
      <ul>
        <li>#Уборка</li>
        <li>#Клининг</li>
        <li>#Гармония</li>
        <li>#Чистота</li>
      </ul>
    </div>
    <div>Поделиться</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ArticleList from '@/components/public/ArticleList.vue'
import ApiSharedData from '@/models/ekoset/ApiSharedData'

@Component({
  components: {
    ArticleList
  }
})
export default class ArticleCard extends Vue {
  private apiSharedData: ApiSharedData = new ApiSharedData()
  private article = new Article()
  private realtedArticles: Article[] = []


  private async asyncData (context: NuxtContext) {
    const apiSharedData = await getServiceContainer().publicEkosetService.getApiSharedData(context.params.activity)

    const articleUrl = context.params.article
    const articlePr = getServiceContainer().articleService.getArticleBySlug(articleUrl)
    const relatedListPr = getServiceContainer().articleService.getRelatedArticleListBySlug(articleUrl)
    const data = await Promise.all([articlePr, relatedListPr])

    return {
      apiSharedData,
      article: data[0],
      realtedArticles: data[1]
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
.brc-article-item__stat-info {
  color: gray;
  display: flex;
  float: right;
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

article {
  height: 100%;
}

.brc-article-tags {
  ul {
    li {
      display: inline;
      list-style-type: "#";
      color: gray;
    }
  }
}
.brc-article-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .brc-article-item {
    flex: 2;
  }
  .brc-article-related {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .brc-article-wrapper {
    flex-direction: column;
  }
}
</style>
