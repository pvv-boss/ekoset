<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Новости</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Заголовок:" horizontal>
              <b-input
                v-model="newArticle.articleTitle"
                placeholder="Заголовок"
                type="text"
                required
                validation-message="Заголовок не может быть пустым"
              ></b-input>
            </b-field>
            <b-button type="is-primary" @click="save">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>

          <b-button v-show="!createNewMode" type="is-primary" outlined @click="createNewMode = true">Создать</b-button>
        </div>
      </template>

      <template #content>
        <vue-good-table
          :columns="headerFields"
          :rows="articleItems"
          :search-options="{
            enabled: true,
            placeholder: 'Поиск по всем полям',
          }"
          :fixed-header="true"
          :sort-options="{
            enabled: true, //,
            // initialSortBy: {field: 'articlePublishDate', type: 'desc'}
          }"
        >
          <template #table-row="props">
            <b-switch
              v-if="props.column.field == 'articleStatus'"
              v-model="props.row.articleStatus"
              true-value="1"
              false-value="0"
              type="is-success"
              size="is-small"
              @input="changeArticleStatus(props.row)"
            ></b-switch>

            <nuxt-link
              v-else-if="props.column.field == 'articleTitle'"
              :to="{
                name: 'admin-news-article-card',
                params: { article: props.row.articleUrl },
              }"
              >{{ props.row.articleTitle }}</nuxt-link
            >

            <b-button
              v-else-if="props.column.field == 'removeNews'"
              type="is-danger"
              icon-right="delete"
              @click="deleteArticle(props.row)"
            ></b-button>

            <b-upload v-else-if="props.column.field == 'addMainImage'" @input="addMainImage(...arguments, props.row)">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>

            <b-upload v-else-if="props.column.field == 'addSmallImage'" @input="addSmallImage(...arguments, props.row)">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>

            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Article from "@/models/ekoset/Article.ts";
import { getModule } from "vuex-module-decorators";
import AdminStore from "@/store/AdminStore";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";
import { Context } from "@nuxt/types";
// import 'vue-good-table/dist/vue-good-table.css'
import { ServiceRegistry } from "@/ServiceRegistry";
import ArticleService from "@/services/ArticleService";
import MediaService from "@/services/MediaService";

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ "vue-good-table/src/components/Table.vue"),
  },
})
export default class AdminArticleList extends Vue {
  private articleItems: Article[] = [];
  private newArticle = new Article();
  private createNewMode = false;

  private headerFields = [
    {
      field: "articleStatus",
      label: "Статус",
      type: "number",
      tdClass: "brc-admin-centered-td",
    },
    {
      // field: 'articlePublishDate',
      label: "Дата",
      field: (rowObj) => {
        return rowObj.articlePublishDate ? new Date(rowObj.articlePublishDate).toLocaleDateString("ru-RU") : "";
      },
    },
    {
      field: "articleTitle",
      label: "Заголовок",
      filterOptions: {
        enabled: true,
        placeholder: "Введите часть наименования заголовка",
      },
    },
    {
      field: "siteSectionName",
      label: "Раздел",
      filterOptions: {
        enabled: true,
        placeholder: "Введите часть наименования раздела",
      },
    },
    {
      field: "addMainImage",
      label: "Фото на странце",
      tdClass: "brc-admin-centered-td",
    },
    {
      field: "addSmallImage",
      label: "Фото в карточке",
      tdClass: "brc-admin-centered-td",
    },
    {
      field: "removeNews",
      label: "Удалить",
      tdClass: "brc-admin-centered-td",
    },
    // {
    //   field: 'articleViewsNumber',
    //   label: 'Просмотры',
    //   type: 'number'
    // }
  ];

  private layout() {
    return "admin";
  }

  private async asyncData(context: Context) {
    const breadCrumbList: any[] = [];
    breadCrumbList.push({ name: "Администрирование", link: "admin" });
    breadCrumbList.push({ name: "Новости", link: "admin-news" });
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList);

    const data = await ServiceRegistry.instance.getService(ArticleService).adminGetAll();
    return {
      articleItems: data,
    };
  }

  private async save() {
    this.newArticle.articleDescription = this.newArticle.articleTitle;
    this.newArticle.articleH1 = this.newArticle.articleTitle;
    await ServiceRegistry.instance.getService(ArticleService).saveArticle(this.newArticle);
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`);
    this.createNewMode = false;
    await this.updateItems();
    this.newArticle = new Article();
  }

  private cancel() {
    this.newArticle = new Article();
    this.createNewMode = false;
  }

  private async changeArticleStatus(article: Article) {
    await ServiceRegistry.instance.getService(ArticleService).saveArticle(article);
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`);
  }

  private async deleteArticle(article: Article) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(ArticleService).deleteArticle(article.articleId);
      this.updateItems();
    };
    this.$BrcAlert(BrcDialogType.Warning, "Удалить новость ?", "Подтвердите удаление", okCallback);
  }

  private async addMainImage(imageFile: string, article: Article) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    ServiceRegistry.instance.getService(MediaService).saveNewsImage(article.articleId, formData, true);
  }

  private async addSmallImage(imageFile: string, article: Article) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    ServiceRegistry.instance.getService(MediaService).saveNewsImage(article.articleId, formData, false);
  }

  private async updateItems() {
    this.articleItems = await ServiceRegistry.instance.getService(ArticleService).adminGetAll();
  }
}
</script>
