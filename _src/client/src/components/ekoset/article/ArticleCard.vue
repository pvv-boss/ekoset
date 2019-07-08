<template>
  <div>
    <main>
      <article>
        <h1>{{article.articleTitle}}</h1>
        <figure>
          <img
            src="https://i.vas3k.ru/full/836.jpg"
            :alt="article.articleTitle"
            class="brc-article-item__preview-img"
          />
          <figcaption>{{article.articleTitle}}</figcaption>
        </figure>
        <div class="brc-article-item__stat-info">
          <div class="brc-article-item__views">
            <i class="far fa-eye"></i>
            <span>{{article.articleViewsNumber}}</span>
          </div>
          <div class="brc-article-item__date">
            <i class="far fa-clock"></i>
            <span>{{article.articlePublishDate}}</span>
          </div>
        </div>
        <section v-html="article.articleBody"></section>
        <div>Теги</div>
        <div>Поделиться</div>
      </article>
    </main>
    <aside>Похожие новости</aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({})
export default class ArticleCard extends Vue {

  private article = new Article()

  private async asyncData (context: NuxtContext) {
    const articleId = Number(context.params.id)
    const data = await getServiceContainer().articleService.getArticleById(1, articleId)
    if (data) {
      return {
        article: data
      }
    }
  }

  private head () {
    return { title: this.article.articleTitle }
  }
}
</script>

<style lang="scss" scoped>
.brc-article-item__preview-img {
  max-width: 800px;
}
.brc-article-item__stat-info {
  display: inline;
  color: gray;
}
figcaption {
  display: none;
}
</style>
