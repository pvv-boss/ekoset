<template>
  <div class="brc-article-item">
    <div class="brc-article-item__preview">
      <img :src="articleItem.articlePreviewImg" class="brc-article-item__preview-img" />
    </div>
    <div class="brc-article-item__header">
      <nuxt-link
        :to="{ name: 'article-card', params: { id: articleItem.articleId}}"
      >{{articleItem.articleTitle}}</nuxt-link>
    </div>
    <div class="clearfix"></div>
    <div class="brc-article-item__footer">
      <div class="brc-article-item__footer-views">
        <i class="far fa-eye"></i>
        <span>{{articleItem.articleCountViews}}</span>
      </div>
      <div class="brc-article-item__footer-date">
        <i class="far fa-clock"></i>
        <span>{{articleItem.articleDate}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ArticleListItem extends Vue {
  @Prop()
  private articleItem
}
</script>


