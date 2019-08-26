<template>
  <div class="brc-article-list" :class="{ 'brc-article-list_vertical': mode === 'vertical' }">
    <ArticleListItem
      v-for="articleItem in articleList"
      :key="articleItem.articleId"
      :articleItem="articleItem"
    ></ArticleListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ArticleListItem from '@/components/public/ArticleListItem.vue'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { importDeclaration } from '@babel/types'

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

<style lang="scss">
.brc-article-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-around;
  flex-wrap: wrap;

  .brc-article-smallitem {
    flex: 1;
    min-width: 300px;
  }
}

.brc-article-list_vertical {
  .brc-article-smallitem {
    width: 100%;
  }
}

@media (min-width: 600px) {
  .brc-article-list:after {
    content: "";
    flex: auto;
  }
}
</style>


