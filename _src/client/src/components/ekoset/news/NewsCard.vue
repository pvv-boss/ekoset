<template>
  <div class="brc-news-card">
    <h1>Заголовок статьи или новости</h1>
    <div class="brc-news-card__main-img"></div>
    <div class="brc-news-card__body"></div>
    <div class="brc-news-card__related-block"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class NewsCard extends Vue { }
</script>
