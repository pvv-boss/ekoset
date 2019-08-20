<template>
  <section>
    <h1 itemprop="headline name">Экосеть: главная страница</h1>

    <ArticleList :articleList="articleItems" mode="columns"></ArticleList>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Article from '@/models/ekoset/Article.ts'
import MessageForm from '@/components/public/MessageForm.vue'
import ArticleList from '@/components/public/ArticleList.vue'

@Component({
  components: {
    MessageForm,
    ArticleList
  }
})
export default class Main extends Vue {
  private articleItems: Article[] = []

  private head () {
    return { title: 'Экосеть' }
  }

  private async asyncData (context: NuxtContext) {
    const articleList = getServiceContainer().articleService.getRootArticleList()

    const data = await Promise.all([articleList])
    return {
      articleItems: data[0]
    }
  }
}
</script>
