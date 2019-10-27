<template>
  <div class="brc-admin_page_wrapper">
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
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'

@Component({
  components: {
    BreadCrumbs
  }
})
export default class AdminArticleList extends Vue {
  private articleItems: Article[] = []

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

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Новости', link: 'admin-news' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await getServiceContainer().articleService.adminGetAll()
    return {
      articleItems: data
    }

  }
}
</script>

