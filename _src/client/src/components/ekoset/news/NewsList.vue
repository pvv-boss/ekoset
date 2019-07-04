<template>
  <div>
    <h1>Новости!!!</h1>
    <div class="brc-news-list">
      <NewsListItem v-for="newsItem in newsList" :key="newsItem.newsId" :news-item="newsItem"></NewsListItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import NewsListItem from '@/components/ekoset/news/NewsListItem.vue'

@Component({
  components: {
    NewsListItem
  }
})
export default class NewsList extends Vue {
  @Prop(Array)
  public newsList
}
</script>

