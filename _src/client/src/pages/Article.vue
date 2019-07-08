<template>
  <articleList :articleList="articleItems"></articleList>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import articleList from '@/components/ekoset/article/articleList.vue'

@Component({
  components: {
    articleList
  }
})
export default class Article extends Vue {


}
</script>
