<template>
  <div
    class="brc-article-list"
    :class="{ 'brc-article-list_vertical': mode === 'vertical', 'brc-article-list_empty' : articleList.length % 3 !== 0 }"
  >
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  align-content: space-around;
  flex-wrap: wrap;
  margin: 0 -15px;

  .brc-article-smallitem__wrapper {
    flex: 1;
    min-width: 300px;
    padding-bottom: 30px;
  }
}

.brc-article-list_vertical {
  .brc-article-smallitem__wrapper {
    width: 100%;
  }
}

@media (min-width: 600px) {
  .brc-article-list_empty:after {
    content: "";
    flex: auto;
  }
}
</style>


