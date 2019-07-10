<template>
  <div class="brc-article__form" method="post">
    <div class="brc-article-card_admin">
      <div class="brc-article-card__editor">
        <AdminArticleEditor v-model="article.articleBody"></AdminArticleEditor>
      </div>
      <div class="brc-article-card__attributes">
        <AdminArticleAttributes v-model="article"></AdminArticleAttributes>
      </div>
    </div>
    <div class="brc-article-card__save">
      <button type="button" @click="saveArticle">Сохранить</button>
      <button v-if="article.articleId > 0" type="button" @click="deleteArticle">Удалить</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import AdminArticleAttributes from '@/components/admin/AdminArticleAttributes.vue'
import { returnStatement } from '@babel/types';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType.ts'

@Component({
  components: {
    AdminArticleEditor,
    AdminArticleAttributes
  }
})
export default class AdminArticleCard extends Vue {

  private layout () {
    return 'admin'
  }

  private article: Article

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
      }
      else {
        self.$router.push({ name: 'admin-news' })
      }

      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить новость?', 'Подтвердите удаление', okCallback)
  }

  private async asyncData (context: NuxtContext) {
    const articleId = Number(context.params.id)

    if (articleId > 0) {
      const data = await getServiceContainer().articleService.getArticleById(articleId)
      if (data) {
        return {
          article: data
        }
      }
    }
    else {
      return {
        article: new Article()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>