<template>
  <div class="brc-article-list" :class="{ 'brc-article-list_vertical': mode === 'vertical'}">
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
import Article from '@/models/ekoset/Article'
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

<style lang="scss">
.brc-article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 30px -15px 0;
}

.brc-article-list_vertical {
  .brc-article-smallitem__wrapper {
    width: 100%;
  }
}
</style>


