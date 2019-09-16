<template>
  <div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Наименование</div>
      <input type="text" v-model="value.siteSectionName" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Префикс</div>
      <input type="text" v-model="value.siteSectionSlug" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Приоритет</div>
      <input type="number" v-model.number="value.siteSectionPriority" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Статус</div>
      <input type="number" v-model.number="value.siteSectionStatus" />
    </div>

    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Превью изображение</div>
      <input type="text" v-model="value.siteSectionImgSmall" />
    </div>
    <div class="brc-article-attribute">
      <div class="brc-article-attribute__caption">Основное изображение</div>
      <input type="text" v-model="value.siteSectionImgBig" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection'

@Component
export default class AdminSiteSectionAttributes extends Vue {
  @Prop()
  private value

}
</script>

