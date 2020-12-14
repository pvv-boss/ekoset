<template >
  <div
    class="brc-article-list"
    :class="{ 'brc-article-list_vertical': mode === 'vertical' }"
  >
    <ArticleListItem
      v-for="articleItem in articleList"
      :key="articleItem.articleId"
      :article-item="articleItem"
    ></ArticleListItem>
    <!-- <BasePagination
      :total="pagination.total"
      :currentPage.sync="pagination.currentPage"
      :limit="pagination.limit"
      @update:pagination="updatePagintaion"
    ></BasePagination>-->
  </div>
</template>

 <script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
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


