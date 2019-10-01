<template>
  <ul class="brc-article-tags">
    <li v-for="tag in tagList" :key="tag.clArticleId">#{{tag.clArticleName}}</li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({})
export default class ArticleMetaTags extends Vue {
  @Prop()
  private articleUrl

  private tagList: any[] = []

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  public async mounted () {
    this.tagList = await getServiceContainer().articleService.getArticleTags(this.articleUrl)
  }
}
</script>

<style lang="scss">
.brc-article-tags {
  margin: 30px 0 0;

  li {
    display: inline;
    margin-right: 15px;
    background-color: #f4f4f5;
    padding: 5px 15px;
    color: gray;
    border-radius: 3px;
    font-size: 14px;
  }
}
</style>



