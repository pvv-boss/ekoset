<template>
  <div itemscope itemtype="http://schema.org/Article">
    <header>
      <h1 itemprop="headline name">{{article.articleTitle}}</h1>
    </header>
    <figure>
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
        <img src="/images/eye-iccon.png" alt="Просмотры: {{article.articleViewsNumber}}" />
        <span>{{article.articleViewsNumber}}</span>
      </div>
      <div class="brc-article-item__date">
        <img
          src="/images/clock-iccon.png"
          alt="Дата публикации: {{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}"
        />
        <span
          itemprop="datePublished"
          :content="article.articlePublishDate ? new Date(article.articlePublishDate).toISOString().split('T')[0] : ''"
        >{{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
      </div>
    </div>
    <div class="brc-article-wrapper">
      <section class="brc-article-item">
        <article v-html="article.articleBody" itemprop="articleBody"></article>
        <div>Теги</div>
        <div>Поделиться</div>
      </section>
      <section class="brc-article-related">
        <h2>Похожие новости</h2>
        <ArticleList :articleList="realtedArticles" mode="vertical"></ArticleList>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ArticleList from '@/components/public/ArticleList.vue'

@Component({
  components: {
    ArticleList
  }
})
export default class ArticleCard extends Vue {

  private article = new Article()
  private realtedArticles: Article[] = []


  private async asyncData (context: NuxtContext) {
    const articleUrl = context.params.articleUrl

    const articlePr = getServiceContainer().articleService.getArticleBySlugUrl(articleUrl)
    const articleId = getServiceContainer().articleService.getArticleIdBySlugUrl(articleUrl)

    const relatedListPr = getServiceContainer().articleService.getRelatedArticleListById(articleId)
    const data = await Promise.all([articlePr, relatedListPr])
    return {
      article: data[0],
      realtedArticles: data[1]
    }
  }

  private head () {
    return { title: this.article.articleTitle }
  }
}
</script>

<style lang="scss">
.brc-article-item__header-img {
  width: 100%;
  height: 300px;
}
img {
  max-width: 100% !important;
}
.brc-article-item__stat-info {
  color: gray;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div {
    padding: 10px;
  }
}
figure {
  margin: 0 !important;

  figcaption {
    display: none;
  }
}

.brc-article-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .brc-article-item {
    flex: 2;
    max-width: 700px;
    min-width: 400px;
  }
  .brc-article-related {
    flex: 1;
    min-width: 300px;
  }
}
</style>
