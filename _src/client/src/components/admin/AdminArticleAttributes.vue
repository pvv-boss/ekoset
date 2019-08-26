<template>
  <div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Статус</div>
      <input type="number" v-model.number="value.articleStatus" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Раздел</div>
      <input type="number" v-model.number="value.siteSectionId" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Краткое описание</div>
      <input type="text" v-model="value.articleDescription" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Заголовок</div>
      <input type="text" v-model="value.articleTitle" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Превью изображение</div>
      <input type="text" v-model="value.articlePreviewImgSrc" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Основное изображение</div>
      <input type="text" v-model="value.articleHeaderImgSrc" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Источник</div>
      <input type="text" v-model="value.articleSource" />
    </div>

    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Автор</div>
      <input type="text" v-model="value.articleAuthor" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Дата</div>
      <input type="datetime" v-model="value.articlePublishDate" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Article from '../../models/ekoset/Article';

@Component
export default class AdminArticleAttributes extends Vue {
  @Prop()
  private value: Article

}
</script>
<style lang="scss" scoped>
.brc-article-attribute {
  margin-top: 10px;

  .brc-article-attribute__caption {
    font-size: smaller;
    color: #666;
  }
}
input {
  width: 100%;
}
</style>
