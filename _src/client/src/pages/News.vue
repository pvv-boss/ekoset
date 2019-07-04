<template>
  <section class="brc-body">
    <NewsList></NewsList>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NewsList from '@/components/ekoset/news/NewsList.vue'

@Component({
  components: {
    NewsList
  }
})
export default class News extends Vue { }
</script>
