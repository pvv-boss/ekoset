<template>
  <section>
    <h1 itemprop="headline name">Услуги раздела</h1>
    <ArticleList :articleList="articleItems" mode="columns"></ArticleList>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import MessageForm from '@/components/public/MessageForm.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import Article from '@/models/ekoset/Article'

@Component({
  components: {
    MessageForm,
    ArticleList
  }
})
export default class Services extends Vue {
  private serviceItems: [] = []
  private articleItems: Article[] = []

  private async asyncData (context: NuxtContext) {
    const siteSectionId = 1 //FIXME: получать ид раздела

    //FIXME: получение списка сервисов
    const serviceList = getServiceContainer().articleService.getRootArticleList()
    const articleList = getServiceContainer().articleService.getArticleListBySiteSection(siteSectionId)

    const data = await Promise.all([serviceList, articleList])
    return {
      serviceItems: data[0],
      articleItems: data[1]
    }
  }

  private head () {
    return { title: 'Экосеть: Услуги раздела' }
  }
}
</script>
