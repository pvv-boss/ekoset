<template>
  <ul class="brc-article-tags">
    <li v-for="tag in tagList" :key="tag.clArticleId">
      #{{ tag.clArticleName }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { ServiceRegistry } from '@/ServiceRegistry'
import ArticleService from '@/services/ArticleService'

@Component({})
export default class ArticleMetaTags extends Vue {
  @Prop()
  private articleUrl

  private tagList: any[] = []

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  public async mounted () {
    this.tagList = await ServiceRegistry.instance.getService(ArticleService).getArticleTags(this.articleUrl)
  }
}
</script>

<style lang="scss">
.brc-article-tags {
  margin: 30px 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 0 !important;
  li {
    margin-right: 15px;
    margin-top: 15px;
    background-color: #f4f4f5;
    padding: 5px 15px;
    color: grey;
    border-radius: 5px;
    font-size: 14px;
    list-style: none;
    width: min-content;
  }
}
</style>



