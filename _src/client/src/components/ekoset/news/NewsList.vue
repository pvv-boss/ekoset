<template>
  <div>
    <h1>Новости!!!</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NewsListItem from '@/components/ekoset/news/NewsListItem.vue'

@Component({
  components: {
    NewsListItem
  }
})
export default class NewsList extends Vue { }
</script>

