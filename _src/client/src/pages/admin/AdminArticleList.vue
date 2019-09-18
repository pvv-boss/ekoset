<template>
  <div class="brc-article-list_wrapper">
    <h1>Новости раздела {{siteSectionSlug}}</h1>
    <nuxt-link :to="{ name: 'admin-news-article'}">Создать новость</nuxt-link>
    <table class="brc-article-table_admin">
      <thead>
        <th>Заголовок</th>
        <th>Дата</th>
        <th>Статус</th>
        <th>Просмотры</th>
      </thead>
      <tbody>
        <tr v-for="articleItem in articleItems" :key="articleItem.articleId">
          <td>
            <nuxt-link
              :to="{ name: 'admin-news-article-card', params: { article: articleItem.articleUrl}}"
            >{{articleItem.articleTitle}}</nuxt-link>
          </td>
          <td>{{ articleItem.articlePublishDate ? (new Date(articleItem.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</td>
          <td>{{articleItem.articleStatus}}</td>
          <td>{{articleItem.articleViewsNumber}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({})
export default class AdminArticleList extends Vue {
  private articleItems: Article[] = []
  private siteSectionSlug = ''

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const siteSectionSlug = context.params.siteSection

    const data = await siteSectionSlug ? getServiceContainer().articleService.getArticleListBySiteSectionSlug(siteSectionSlug) : await getServiceContainer().articleService.getRootArticleList()
    return {
      articleItems: data,
      siteSectionSlug
    }

  }
}
</script>

<style lang="scss" scoped>
.brc-article-list_wrapper {
  width: 100%;
  padding: 20px;
}

.brc-article-table_admin {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    &:hover {
      background-color: lightgoldenrodyellow;
    }

    td {
      border: 1px solid lightgray;
      margin: 0;
      padding: 5px;
      text-align: center;
    }
    td:first-child {
      text-align: left;
    }
    td:last-child {
      text-align: right;
    }
  }
}
</style>


