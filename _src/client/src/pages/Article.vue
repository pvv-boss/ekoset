<template>
  <articleList :articleList="articleItems"></articleList>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import articleList from '@/components/ekoset/article/articleList.vue'
import articleShortDetail from '@/models/ekoset/articleShortDetail.ts'

@Component({
  components: {
    articleList
  }
})
export default class Article extends Vue {
  private articleItems: articleShortDetail[] = []

  private async mounted () {
    for (let i = 0; i < 10; i++) {
      this.articleItems.push(new articleShortDetail())
    }
  }
}
</script>
