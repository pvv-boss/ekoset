<template>
  <article class="brc-article-smallitem">
    <figure class="brc-article-smallitem__preview">
      <nuxt-link
        :to="{ name: 'news-card', params: {  article: articleItem.articleUrl, siteSection: getCurrentSiteSection}}"
      >
        <img
          :src="articleItem.articlePreviewImgSrc"
          :alt="articleItem.articleTitle"
          itemprop="image"
          class="brc-article-smallitem__preview-img"
        />
      </nuxt-link>

      <figcaption>{{articleItem.articleTitle}}</figcaption>
    </figure>
    <header class="brc-article-smallitem__header">
      <nuxt-link
        :to="{ name: 'news-card', params: { article: articleItem.articleUrl, siteSection: getCurrentSiteSection}}"
        class="brc-article-smallitem__header-link"
      >{{articleItem.articleTitle}}</nuxt-link>
    </header>
    <div class="clearfix"></div>
    <div class="brc-article-smallitem__stat-info">
      <div class="brc-article-smallitem__date">
        <span
          itemprop="datePublished"
          :content="articleItem.articlePublishDate ? new Date(articleItem.articlePublishDate).toISOString().split('T')[0] : ''"
        >{{ articleItem.articlePublishDate ? (new Date(articleItem.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
      </div>
      <div class="brc-article-smallitem__views" v-if="articleItem.articleViewsNumber > 0">
        <img src="/images/eye.svg" alt="Количество просмотров" title="Количество просмотров" />
        <span>{{articleItem.articleViewsNumber}}</span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component({})
export default class ArticleListItem extends Vue {
  @Prop()
  private articleItem

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
.brc-article-smallitem {
  border: 1px solid #efefef;
  padding: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }
}
.brc-article-smallitem__preview-img {
  max-width: 100%;
  width: 100%;
  // height: 200px;
  object-fit: cover;
  object-position: center;
  border-radius: 3px;
}
figcaption {
  display: none;
}
.brc-article-smallitem__header {
  flex-grow: 1;
}
.brc-article-smallitem__header-link {
  color: #222;
  text-decoration: none;
}
.brc-article-smallitem__stat-info {
  color: gray;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #efefef;
  padding-top: 10px;
  margin-top: 10px;
  font-size: 13px;

  .brc-article-smallitem__views {
    text-align: right;
    width: 50%;
  }
  .brc-article-smallitem__date {
    float: left;
    width: 50%;
  }
}
</style>



