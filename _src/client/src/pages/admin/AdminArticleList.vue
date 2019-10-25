<template>
  <div class="brc-article-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Новости</h1>
    <nuxt-link :to="{ name: 'admin-news-article'}">Создать новость</nuxt-link>
    <vue-good-table :columns="headerFields" :rows="articleItems">
      <template slot="table-row" slot-scope="props">
        <nuxt-link
          v-if="props.column.field == 'articleTitle'"
          :to="{ name: 'admin-news-article-card', params: { article: props.row.articleUrl}}"
        >{{props.row.articleTitle}}</nuxt-link>
        <span
          v-else-if="props.column.field == 'articlePublishDate'"
        >{{ props.row.articlePublishDate ? (new Date(props.row.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    BreadCrumbs
  }
})
export default class AdminArticleList extends Vue {
  private articleItems: Article[] = []
  private breadCrumbList: any[] = []

  private headerFields = [
    {
      field: 'articleTitle',
      label: 'Заголовок'
    },
    {
      field: 'articlePublishDate',
      label: 'Дата'
    },
    {
      field: 'articleStatus',
      label: 'Статус',
      type: 'number'
    },
    {
      field: 'articleViewsNumber',
      label: 'Просмотры',
      type: 'number'
    }
  ]

  private layout () {
    return 'admin'
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Новости', link: 'admin-news' })
  }

  private async asyncData (context: NuxtContext) {
    const data = await getServiceContainer().articleService.adminGetAll()
    return {
      articleItems: data
    }

  }
}
</script>

