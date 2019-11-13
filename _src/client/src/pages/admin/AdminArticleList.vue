<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Новости</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Заголовок:" horizontal>
              <b-input
                placeholder="Заголовок"
                type="text"
                required
                validation-message="Заголовок не может быть пустым"
                v-model="newArticle.articleTitle"
              ></b-input>
            </b-field>
            <b-button @click="save" type="is-primary">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>

          <b-button
            type="is-primary"
            outlined
            @click="createNewMode = true"
            v-show="!createNewMode"
          >Создать</b-button>
        </div>
      </template>

      <template #content>
        <vue-good-table :columns="headerFields" :rows="articleItems">
          <template slot="table-row" slot-scope="props">
            <nuxt-link
              v-if="props.column.field == 'articleTitle'"
              :to="{ name: 'admin-news-article-card', params: { article: props.row.articleUrl}}"
            >{{props.row.articleTitle}}</nuxt-link>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
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
import BaseCard from '@/components/BaseCard.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'

@Component({
  components: {
    BreadCrumbs,
    BaseCard
  }
})
export default class AdminArticleList extends Vue {
  private articleItems: Article[] = []
  private newArticle = new Article()
  private createNewMode = false

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

  private async save () {
    this.newArticle.articleDescription = this.newArticle.articleTitle
    await getServiceContainer().articleService.saveArticle(
      this.newArticle
    )
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewMode = false
    await this.updateItems()
    this.newArticle = new Article()
  }

  private cancelSaveNewSiteSection () {
    this.newArticle = new Article()
    this.createNewMode = false
  }

  private async updateItems () {
    this.articleItems = await getServiceContainer().articleService.adminGetAll()
  }
}
</script>

