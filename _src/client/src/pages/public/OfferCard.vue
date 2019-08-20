<template>
  <section>
    <h1 itemprop="headline name">Индивидуальное предложение</h1>
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
export default class OfferCard extends Vue {
  private articleItems: Article[] = []

  private async asyncData (context: NuxtContext) {
    const siteSectionId = 1 // FIXME: получать ид раздела
    const articleList = getServiceContainer().articleService.getArticleListBySiteSection(siteSectionId)

    const data = await Promise.all([articleList])
    return {
      articleItems: data[0]
    }
  }

  private head () {
    return { title: 'Экосеть: Индивидуальное предложение' }
  }
}
</script>
