<template>
  <section class="brc-body">
    <NewsList :newsList="newsItems"></NewsList>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NewsList from '@/components/ekoset/news/NewsList.vue'
import NewsShortDetail from '@/models/ekoset/NewsShortDetail.ts'

@Component({
  components: {
    NewsList
  }
})
export default class News extends Vue {
  private newsItems: NewsShortDetail[] = []

  private async mounted () {
    for (let i = 0; i < 10; i++) {
      this.newsItems.push(new NewsShortDetail())
    }
  }
}
</script>
