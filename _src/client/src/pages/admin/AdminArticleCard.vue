<template>
  <div class="brc-admin_page_wrapper">
    <LazyBaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Новость: {{ articleItem.articleTitle }}</h2>
          <LazyAdminStatusSelector v-model.number="articleItem.articleStatus" status-caption="Активна"></LazyAdminStatusSelector>

          <b-button type="is-primary" @click="save">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card_two-column">
              <div class="brc-admin-card-field-list_row brc-admin-panel__site">
                <b-field label="Фото на странице">
                  <LazyAdminImageUploader
                    id="bigImageFile"
                    :src-image="articleItem.articleHeaderImgSrc"
                    @uploader:newimageloaded="addImage($event, true)"
                  >
                    <template #default="{ imageSrc }">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">
                          {{ articleItem.articleH1 }}
                        </h1>
                      </figure>
                    </template>
                  </LazyAdminImageUploader>
                </b-field>
                <b-field label="Заголовок (на карточке новости)">
                  <b-input
                    v-model="articleItem.articleTitle"
                    placeholder="Заголовок"
                    type="text"
                    required
                    validation-message="Заголовок не может быть пустым"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    v-model="articleItem.articleH1"
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                  ></b-input>
                </b-field>

                <b-field label="URL (ЧПУ) на страницу">
                  <b-input v-model="articleItem.articleSlug" type="text"></b-input>
                </b-field>

                <b-field label="Дата публикации">
                  <b-datepicker
                    v-model="articleDateDate"
                    :day-names="dayNamesRu"
                    :month-names="monthNamesRu"
                    :first-day-of-week="1"
                    placeholder="Выберите дату ..."
                  >
                    <button class="button is-primary" @click="articleDateDate = new Date()">
                      <b-icon icon="calendar-today"></b-icon>
                      <span>Сегодня</span>
                    </button>
                  </b-datepicker>
                </b-field>

                <b-field label="Автор">
                  <b-input v-model="articleItem.articleAuthor" placeholder="Автор" type="text"></b-input>
                </b-field>
                <b-field label="Источник">
                  <b-input v-model="articleItem.articleSource" placeholder="Источник" type="text"></b-input>
                </b-field>
                <b-field label="Краткое описание">
                  <b-input
                    v-model="articleItem.articleDescription"
                    placeholder="Краткое описание"
                    type="textarea"
                    required
                    validation-message="Краткое описание не может быть пустым"
                  ></b-input>
                </b-field>

                <LazyAdminSeoTags
                  :seo-title.sync="articleItem.seoTitle"
                  :seo-description.sync="articleItem.seoDescription"
                  :seo-keywords.sync="articleItem.seoKeywords"
                ></LazyAdminSeoTags>

                <b-field label="Раздел сайта">
                  <LazyAdminSiteSectionSelector
                    v-model="articleItem.siteSectionId"
                    :nullable="true"
                  ></LazyAdminSiteSectionSelector>
                </b-field>
                <b-field v-if="articleItem.articleId > 0" label="Связанные услуги">
                  <LazyAdminServiceRelationList
                    :service-relation-items="serviceRelationList"
                    @servicechecked="serviceChecked"
                  ></LazyAdminServiceRelationList>
                </b-field>
              </div>

              <div class="brc-admin-card-field-list_row">
                <b-field label="Фото на карточке новости">
                  <LazyAdminImageUploader
                    id="smallImageFile"
                    :src-image="articleItem.articlePreviewImgSrc"
                    @uploader:newimageloaded="addImage($event, false)"
                  >
                    <template #default="{ imageSrc }">
                      <LazyArticleListItem
                        :article-item="articleItem"
                        :image-src-for-design-mode="imageSrc"
                        style="width: 350px; margin: 0px"
                      ></LazyArticleListItem>
                    </template>
                  </LazyAdminImageUploader>
                </b-field>
                <b-field label="Теги">
                  <LazyAdminTagRelationList
                    :article-url="articleItem.articleUrl"
                    @tagchecked="tagChecked"
                  ></LazyAdminTagRelationList>
                </b-field>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="Содержание">
            <div class="brc-admin-panel__article">
              <LazyBaseCkEditor v-model="articleItem.articleBody"></LazyBaseCkEditor>
            </div>
          </b-tab-item>
        </b-tabs>
      </template>
    </LazyBaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "nuxt-property-decorator";
import Article from "@/models/ekoset/Article";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";
import { getModule } from "vuex-module-decorators";
import AdminStore from "@/store/AdminStore";
import { dayNamesRu, monthNamesRu } from "@/utils/DateUtil";
import ArticleService from "@/services/ArticleService";
import { ServiceRegistry } from "@/ServiceRegistry";
import MediaService from "@/services/MediaService";
import { Context } from "@nuxt/types";

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ "vue-good-table/src/components/Table.vue"),
  },
})
export default class AdminArticleCard extends Vue {
  private articleItem: Article = new Article();
  private serviceRelationList: any[] = [];
  private activeTab = 0;

  private get articleDateDate() {
    return this.articleItem.articlePublishDate ? new Date(this.articleItem.articlePublishDate) : new Date(Date.now());
  }

  private set articleDateDate(selectedDate: Date) {
    this.articleItem.articlePublishDate = selectedDate.toUTCString();
  }

  private dayNamesRu = dayNamesRu;
  private monthNamesRu = monthNamesRu;

  private layout() {
    return "admin";
  }

  private async save() {
    await ServiceRegistry.instance.getService(ArticleService).saveArticle(this.articleItem);
    if (!this.articleItem.articleId) {
      this.$router.push({ name: "admin-news" });
    }
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`);
  }

  private async addImage(imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    ServiceRegistry.instance.getService(MediaService).saveNewsImage(this.articleItem.articleId, formData, isBig);
  }

  @Watch("articleItem.siteSectionId", { immediate: true })
  private async updateServiceList() {
    if (this.articleItem.siteSectionId && this.articleItem.siteSectionId > 0) {
      this.serviceRelationList = await ServiceRegistry.instance
        .getService(ArticleService)
        .adminGetServiceRelation(this.articleItem.siteSectionId, this.articleItem.articleUrl);
    } else {
      this.serviceRelationList = [];
    }
  }

  private mounted() {
    this.updateServiceList();
  }

  private serviceChecked(businessServiceId: number, hasRelation: boolean) {
    ServiceRegistry.instance
      .getService(ArticleService)
      .adminAddRemoveServiceRelation(businessServiceId, this.articleItem.articleUrl, hasRelation);
  }

  private tagChecked(tagId: number, hasRelation: boolean) {
    ServiceRegistry.instance.getService(ArticleService).adminAddRemoveArticleTag(this.articleItem.articleUrl, tagId, hasRelation);
  }

  private async asyncData(context: Context) {
    const articleUrl = context.params.article;
    const articleItem = articleUrl
      ? await ServiceRegistry.instance.getService(ArticleService).getArticleBySlug(articleUrl)
      : new Article();

    const breadCrumbList: any[] = [];
    breadCrumbList.push({ name: "Администрирование", link: "admin" });
    breadCrumbList.push({ name: "Новости", link: "admin-news" });
    breadCrumbList.push({ name: articleItem.articleTitle, link: "" });
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList);

    let serviceRelations = [];
    if (articleItem.siteSectionId > 0) {
      serviceRelations = await ServiceRegistry.instance
        .getService(ArticleService)
        .adminGetServiceRelation(articleItem.siteSectionId, articleUrl);
    }

    return {
      articleItem,
      serviceRelationList: serviceRelations,
    };
  }
}
</script>

<style lang="scss">
.brc-admin-panel__article {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  *.ql-editor {
    height: 65vh !important;
    // height: 100% !important;
  }

  *.ck-editor__main {
    height: 65vh !important;
    min-height: 200px;
    overflow-y: auto;
  }

  .ck-editor__editable {
    height: 100%;
  }
}
</style>
