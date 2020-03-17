<template>
  <div itemscope itemtype="http://schema.org/Article">
    <TheBanner
      :h1="article.articleH1"
      :alt="article.articleTitle"
      :imageSrc="article.articleHeaderImgSrc"
    ></TheBanner>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>

    <div class="brc-article-item__stat-info">
      <div class="brc-article-item__date">
        <span
          itemprop="datePublished"
          :content="article.articlePublishDate ? new Date(article.articlePublishDate).toISOString().split('T')[0] : ''"
        >{{ article.articlePublishDate ? (new Date(article.articlePublishDate)).toLocaleDateString('ru-RU') : '' }}</span>
      </div>
      <div class="brc-article-item__views" v-if="article.articleViewsNumber > 0">
        <img src="/images/eye.svg" alt="Количество просмотров" title="Количество просмотров" />
        <span>{{article.articleViewsNumber}}</span>
      </div>
    </div>
    <div class="clearfix"></div>
    <div class="brc-article-wrapper">
      <section
        class="brc-article-item"
        :class="{'brc-article-item_full-width': realtedArticles.length===0}"
      >
        <article v-html="article.articleBody" itemprop="articleBody"></article>
        <ArticleMetaTags :articleUrl="article.articleUrl"></ArticleMetaTags>
        <div class="brc-article-item__yandex-share">
          <yandex-share
            :services="['vkontakte','facebook','odnoklassniki','twitter','skype']"
            counter
          />
        </div>
      </section>
      <section class="brc-article-related" v-if="realtedArticles.length>0">
        <h2>Похожие новости</h2>
        <ArticleList :articleList="realtedArticles.slice(0, 3)" mode="vertical"></ArticleList>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Article from '@/models/ekoset/Article.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import ArticleList from '@/components/public/ArticleList.vue'
import ArticleMetaTags from '@/components/public/ArticleMetaTags.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import DynamicComponentsContainer from '@/components/DynamicComponentsContainer.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import { SitePageType } from '@/models/SitePage'
import TheBanner from '@/components/header/TheBanner.vue'

@Component({
  components: {
    ArticleList,
    BreadCrumbs,
    ArticleMetaTags,
    DynamicComponentsContainer,
    TheBanner
  }
})
export default class ArticleCard extends Vue {
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private article = new Article()
  private realtedArticles: Article[] = []
  private breadCrumbList: any[] = []

  private async asyncData (context: NuxtContext) {
    const dynamicComponentInfo = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(SitePageType.NEWS)

    const articleUrl = context.params.article
    const articlePr = getServiceContainer().articleService.getArticleBySlug(articleUrl)
    const relatedListPr = getServiceContainer().articleService.getRelatedArticleListBySlug(articleUrl)
    const data = await Promise.all([articlePr, relatedListPr])

    return {
      dynamicComponentInfo,
      article: data[0],
      realtedArticles: data[1]
    }

  }

  // private head () {
  //   return {
  //     title: this.dynamicComponentInfo.seoMeta.pageTitle,
  //     meta: this.dynamicComponentInfo.seoMeta.metaTags
  //   }
  // }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSectionName
  }

  @Watch('getCurrentSiteSection', { immediate: true })
  private async buildBreadCrumbList () {
    this.breadCrumbList = []

    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName
    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection

    this.breadCrumbList.push({ name: 'Главная', link: 'main' })
    if (siteSectionSlug) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'activity-card', params: { siteSection: siteSectionSlug } })
    }
    this.breadCrumbList.push({ name: 'Новости', link: 'news', params: { siteSection: siteSectionSlug } })
    this.breadCrumbList.push({ name: this.article.articleTitle, link: '' })
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-article-list_vertical {
  margin-top: 0;
}
.brc-article-item__stat-info {
  color: gray;
  display: flex;
  font-size: 13px;

  .brc-article-item__views {
    margin-left: 15px;
    .img {
      display:inline;
    }
  }
}
.brc-article-item__header-img {
  max-width: 100%;
  width: 100%;
  // img {
  //   min-height: 160px;
  //   max-width: 100% !important;
  // }

  figcaption {
    display: none;
  }
}

.brc-article-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;

  & * {
    overflow-wrap: break-word;
    white-space: normal;
  }
  .brc-article-item {
    flex: 5;
    max-width: 75%;
    h1,
    h2,
    h3 {
      text-align: unset !important;
    }
    &.brc-article-item_full-width {
      max-width: 100% !important;
    }
    img {
      max-width: 100%;
    }
  }
  .brc-article-related {
    flex: 2;
    padding-left: 30px;
    > h2 {
      text-align: left;
    }
  }
}
.brc-article-item__yandex-share {
  margin-top: 30px;
  ul {
    margin-left: 0 !important;
  }
}
@media (max-width: 768px) {
  .brc-article-wrapper {
    flex-direction: column;
  }
  .brc-article-item {
    max-width: 100% !important;
  }
  .brc-article-related {
    padding-left: 0 !important;
    margin-top: 30px;
  }
  blockquote {
    margin: 0 !important;
    color: #231e28 !important;
    margin: 15px 0 15px 0 !important;
    padding: 30px !important;
    border: 1px solid $red !important;
    font-weight: $font-medium;
    font-size: 17px;
    position: relative;
  }
}
</style>
