<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Новость: {{articleItem.articleTitle}}</h2>
          <AdminStatusSelector statusCaption="Активна" v-model.number="articleItem.articleStatus"></AdminStatusSelector>

          <b-button type="is-primary" @click="save">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card_two-column">
              <div class="brc-admin-card-field-list_row brc-admin-panel__site">
                <b-field label="Фото на странице">
                  <AdminImageUploader
                    id="bigImageFile"
                    :srcImage="articleItem.articleHeaderImgSrc"
                    @uploader:newimageloaded="addImage($event,true)"
                  >
                    <template v-slot="{imageSrc}">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">{{articleItem.articleH1}}</h1>
                      </figure>
                    </template>
                  </AdminImageUploader>
                </b-field>
                <b-field label="Заголовок (на карточке новости)">
                  <b-input
                    placeholder="Заголовок"
                    type="text"
                    required
                    validation-message="Заголовок не может быть пустым"
                    v-model="articleItem.articleTitle"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                    v-model="articleItem.articleH1"
                  ></b-input>
                </b-field>

                <b-field label="Дата публикации">
                  <b-datepicker
                    v-model="articleDateDate"
                    :day-names="dayNamesRu"
                    :month-names="monthNamesRu"
                    :first-day-of-week="1"
                    placeholder="Выберите дату ..."
                  >
                    <button class="button is-primary" @click="date = new Date()">
                      <b-icon icon="calendar-today"></b-icon>
                      <span>Сегодня</span>
                    </button>
                  </b-datepicker>
                </b-field>

                <b-field label="Автор">
                  <b-input placeholder="Автор" type="text" v-model="articleItem.articleAuthor"></b-input>
                </b-field>
                <b-field label="Источник">
                  <b-input placeholder="Источник" type="text" v-model="articleItem.articleSource"></b-input>
                </b-field>
                <b-field label="Краткое описание">
                  <b-input
                    placeholder="Краткое описание"
                    type="textarea"
                    required
                    validation-message="Краткое описание не может быть пустым"
                    v-model="articleItem.articleDescription"
                  ></b-input>
                </b-field>
                <b-field label="Раздел сайта">
                  <AdminSiteSectionSelector v-model="articleItem.siteSectionId" :nullable="true"></AdminSiteSectionSelector>
                </b-field>

                <b-field label="Связанные услуги" v-if="articleItem.articleId > 0">
                  <AdminServiceRelationList
                    :serviceRelationItems="serviceRelationList"
                    @servicechecked="serviceChecked"
                  ></AdminServiceRelationList>
                </b-field>
              </div>

              <div class="brc-admin-card-field-list_row">
                <b-field label="Фото на карточке новости">
                  <AdminImageUploader
                    id="smallImageFile"
                    :srcImage="articleItem.articlePreviewImgSrc"
                    @uploader:newimageloaded="addImage($event,false)"
                  >
                    <template v-slot="{imageSrc}">
                      <ArticleListItem
                        :articleItem="articleItem"
                        :imageSrcForDesignMode="imageSrc"
                        style="width:350px;margin:0px"
                      ></ArticleListItem>
                    </template>
                  </AdminImageUploader>
                </b-field>
                <b-field label="Теги">
                  <AdminTagRelationList
                    :articleUrl="articleItem.articleUrl"
                    @tagchecked="tagChecked"
                  ></AdminTagRelationList>
                </b-field>
              </div>
            </div>
          </b-tab-item>
          <b-tab-item label="Содержание">
            <div class="brc-admin-panel__article">
              <AdminFreeContentBlockEditor v-model="articleItem.articleBody"></AdminFreeContentBlockEditor>
            </div>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import BusinessService from '@/models/ekoset/BusinessService'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminServiceSelector from '@/components/admin/AdminServiceSelector.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminServiceRelationList from '@/components/admin/AdminServiceRelationList.vue'
import AdminTagRelationList from '@/components/admin/AdminTagRelationList.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'
import ArticleListItem from '@/components/public/ArticleListItem.vue'
import { dayNamesRu, monthNamesRu } from '@/utils/DateUtil'

@Component({
  components: {
    AdminFreeContentBlockEditor,
    BreadCrumbs,
    AdminSiteSectionSelector,
    AdminServiceSelector,
    AdminStatusSelector,
    AdminServiceRelationList,
    AdminTagRelationList,
    AdminImageUploader,
    BaseCard,
    ArticleListItem
  }
})
export default class AdminArticleCard extends Vue {
  private articleItem: Article = new Article()
  private serviceRelationList: any[] = []
  private activeTab = 0

  private get articleDateDate () {
    return !!this.articleItem.articlePublishDate ? new Date(this.articleItem.articlePublishDate) : new Date(Date.now())
  }

  private set articleDateDate (selectedDate: Date) {
    this.articleItem.articlePublishDate = selectedDate.toUTCString()
  }

  private dayNamesRu = dayNamesRu
  private monthNamesRu = monthNamesRu

  private layout () {
    return 'admin'
  }

  private async save () {
    await getServiceContainer().articleService.saveArticle(this.articleItem)
    if (!this.articleItem.articleId) {
      this.$router.push({ name: 'admin-news' })
    }
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }


  private async addImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveNewsImage(
      this.articleItem.articleId,
      formData,
      isBig
    )
  }

  @Watch('articleItem.siteSectionId', { immediate: true })
  private async updateServiceList () {
    if (this.articleItem.siteSectionId && this.articleItem.siteSectionId > 0) {
      this.serviceRelationList = await getServiceContainer().articleService.adminGetServiceRelation(
        this.articleItem.siteSectionId,
        this.articleItem.articleUrl
      )
    } else {
      this.serviceRelationList = []
    }
  }

  private mounted () {
    this.updateServiceList()
  }

  private serviceChecked (businessServiceId: number, hasRelation: boolean) {
    getServiceContainer().articleService.adminAddRemoveServiceRelation(
      businessServiceId,
      this.articleItem.articleUrl,
      hasRelation
    )
  }

  private tagChecked (tagId: number, hasRelation: boolean) {
    getServiceContainer().articleService.adminAddRemoveArticleTag(
      this.articleItem.articleUrl,
      tagId,
      hasRelation
    )
  }

  private async asyncData (context: NuxtContext) {
    const articleUrl = context.params.article
    const articleItem = articleUrl
      ? await getServiceContainer().articleService.getArticleBySlug(articleUrl)
      : new Article()

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Новости', link: 'admin-news' })
    breadCrumbList.push({ name: articleItem.articleTitle, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    let serviceRelations = []
    if (articleItem.siteSectionId > 0) {
      serviceRelations = await getServiceContainer().articleService.adminGetServiceRelation(
        articleItem.siteSectionId,
        articleUrl
      )
    }

    return {
      articleItem,
      serviceRelationList: serviceRelations
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-admin-panel__article {
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  *.ql-editor {
    height: 65vh !important;
    // height: 100% !important;
  }
}
</style>  
