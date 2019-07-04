<template>
  <div class="brc-news-item">
    <div class="brc-news-item__preview">
      <img :src="newsItem.newsPreviewImg" class="brc-news-item__preview-img" width="300px" />
    </div>
    <div class="brc-news-item__header">
      <nuxt-link :to="{ name: 'news-card', params: { id: newsItem.newsId}}">{{newsItem.newsTitle}}</nuxt-link>
    </div>
    <div class="clearfix"></div>
    <div class="brc-news-item__footer">
      <div class="brc-news-item__footer-views">
        <i class="far fa-eye"></i>
        <span>{{newsItem.newsCountViews}}</span>
      </div>
      <div class="brc-news-item__footer-date">
        <i class="far fa-clock"></i>
        <span>{{newsItem.newsDate}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class NewsListItem extends Vue {
  @Prop()
  private newsItem
}
</script>


