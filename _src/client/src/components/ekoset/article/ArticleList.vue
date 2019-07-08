<template>
  <div class="brc-article-list" :class="{ 'brc-article-list_vertical': mode === 'vertical' }">
    <ArticleListItem
      v-for="articleItem in articleList"
      :key="articleItem.articleId"
      :article-item="articleItem"
    ></ArticleListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ArticleListItem from '@/components/ekoset/article/ArticleListItem.vue'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ArticleListItem
  }
})
export default class ArticleList extends Vue {
  @Prop(Array)
  private articleList

  @Prop(String)
  private mode

}
</script>

<style lang="scss" scoped>
.brc-article-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-around;

  .brc-article-smallitem {
    width: 30%;
    margin-bottom: 50px;
  }
}

.brc-article-list_vertical {
  .brc-article-smallitem {
    width: 100%;
  }
}
</style>


