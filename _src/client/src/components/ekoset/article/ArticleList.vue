<template>
  <div>
    <h1>Новости!!!</h1>
    <div class="brc-article-list">
      <ArticleListItem
        v-for="articleItem in articleList"
        :key="articleItem.articleId"
        :article-item="articleItem"
      ></ArticleListItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ArticleListItem from '@/components/ekoset/article/ArticleListItem.vue'

@Component({
  components: {
    ArticleListItem
  }
})
export default class ArticleList extends Vue {
  @Prop(Array)
  public articleList
}
</script>

