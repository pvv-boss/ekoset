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
    <div class="brc-article-wrapper">
      <section class="brc-article-item">
        <div class="brc-article-item__stat-info">
          <div class="brc-article-item__views" v-if="article.articleViewsNumber > 0">
            <i class="far fa-eye"></i>
            <span>{{article.articleViewsNumber}}</span>
          </div>
          <div class="brc-article-item__date">
            <i class="far fa-clock"></i>
            <span
              itemprop="datePublished"
              :content="article.articlePublishDate"
            >{{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
          </div>
        </div>
        <article v-html="article.articleBody" itemprop="articleBody"></article>
        <div>Теги</div>
        <div>Поделиться</div>
      </section>
      <aside class="brc-article-related">
        <h2>Похожие новости</h2>
        <ArticleList :articleList="realtedArticles" mode="vertical"></ArticleList>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ArticleList from '@/components/ekoset/article/ArticleList.vue'

@Component({
  components: {
    ArticleList
  }
})
export default class ArticleCard extends Vue {

  private article = new Article()
  private realtedArticles: Article[] = []

  private async asyncData (context: NuxtContext) {
    const articleId = Number(context.params.id)

    const data = await getServiceContainer().articleService.getArticleById(articleId)
    if (data) {
      const relatedListPr = await getServiceContainer().articleService.getArticleListBySiteSection(data.siteSectionId)
      return {
        article: data,
        realtedArticles: relatedListPr
      }
    }
  }

  private head () {
    return { title: this.article.articleTitle }
  }
}
</script>

<style lang="scss" scoped>
.brc-article-item__header-img {
  max-width: 100%;
}
.brc-article-item__stat-info {
  color: gray;
  display: flex;
  float: right;

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

  .brc-article-item {
    width: 70%;
  }
  .brc-article-related {
    width: 30%;
    margin-left: 30px;
  }
}
</style>
