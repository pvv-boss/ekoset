<template>
  <div>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <div class="brc-article__form">
      <div class="brc-article-card_admin">
        <div class="brc-article-card__editor">
          <AdminArticleEditor v-model="article.articleBody"></AdminArticleEditor>
        </div>
        <div class="brc-article-card__attributes">
          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Статус</div>
            <input type="number" v-model.number="article.articleStatus" />
          </div>
          <div class="brc-admin-card-attribute" v-if="siteSectionList.length > 0">
            <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
            <select class="form-control" v-model="article.siteSectionId">
              <option
                v-for="siteSection in siteSectionList"
                :key="siteSection.siteSectionId"
                :value="siteSection.siteSectionId"
              >{{siteSection.siteSectionName}}</option>
            </select>
          </div>

          <div class="brc-admin-card-attribute" v-if="article.siteSectionId > 0">
            <div class="brc-admin-card-attribute__caption">Услуга</div>
            <select class="form-control" v-model="article.businessServiceId">
              <option
                v-for="service in serviceList"
                :key="service.businessServiceId"
                :value="service.businessServiceId"
              >{{service.businessServiceName}}</option>
            </select>
          </div>

          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Краткое описание</div>
            <input type="text" v-model="article.articleDescription" />
          </div>
          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Заголовок</div>
            <input type="text" v-model="article.articleTitle" />
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Превью изображение</div>
            <AdminFileUploader v-model="article.articlePreviewImgSrc"></AdminFileUploader>
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Основное изображение</div>
            <AdminFileUploader v-model="article.articleHeaderImgSrc"></AdminFileUploader>
          </div>

          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Источник</div>
            <input type="text" v-model="article.articleSource" />
          </div>

          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Автор</div>
            <input type="text" v-model="article.articleAuthor" />
          </div>
          <div class="brc-article-attribute">
            <div class="brc-article-attribute__caption">Дата</div>
            <input type="datetime" v-model="article.articlePublishDate" />
          </div>
        </div>
      </div>
      <div class="brc-article-card__save">
        <button type="button" @click="saveArticle">Сохранить</button>
        <button v-if="article.articleId > 0" type="button" @click="deleteArticle">Удалить</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({
  components: {
    AdminArticleEditor,
    AdminFileUploader,
    BreadCrumbs
  }
})
export default class AdminArticleCard extends Vue {

  private article: Article = new Article()
  private breadCrumbList: any[] = []
  private siteSectionList: SiteSection[] = []
  private serviceList: BusinessService[] = []

  private layout () {
    return 'admin'
  }

  private saveArticle () {
    getServiceContainer().articleService.saveArticle(this.article)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteArticle () {
    const self = this
    const okCallback = async () => {
      const sectionId = self.article.siteSectionId
      await getServiceContainer().articleService.deleteArticle(this.article.articleId)
      if (sectionId && sectionId > 0) {
        self.$router.push({ name: 'admin-news-section', params: { siteSectionId: String(sectionId) } })
      } else {
        self.$router.push({ name: 'admin-news' })
      }

      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить новость?', 'Подтвердите удаление', okCallback)
  }

  @Watch('article.siteSectionId', { immediate: true })
  private async updateServiceList () {
    if (this.article.siteSectionId && this.article.siteSectionId > 0) {
      this.serviceList = await getServiceContainer().businessServiceService.getBySiteSectionSlug('slig-' + this.article.siteSectionId)
    }
  }

  private mounted () {
    this.configBreadCrumbs()
    this.updateServiceList()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Новости', link: 'admin-news' })
    this.breadCrumbList.push({ name: 'Карточка новости', link: '' })
  }

  private async asyncData (context: NuxtContext) {
    const articleSlug = context.params.article
    const article = articleSlug ? await getServiceContainer().articleService.getArticleBySlug(articleSlug) : new Article()
    const siteSectionList = getServiceContainer().publicEkosetService.getSiteSections()
    const data = await Promise.all([siteSectionList])
    return {
      article,
      siteSectionList: data[0]
    }
    return {
      article
    }
  }
}
</script>

<style lang="scss">
.brc-article__form {
  width: 100%;
  .brc-article-card__save {
    padding: 20px;
  }
}
.brc-article-card_admin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  flex: 2;

  .brc-article-card__editor,
  .brc-article-card__attributes {
    padding: 10px;
    flex: 1;
  }
}
.ql-container {
  height: 600px !important;
}

input {
  width: 100%;
}
</style>