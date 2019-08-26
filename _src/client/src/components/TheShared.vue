<template>
  <section>
    <MessageForm title="Заказать услугу"></MessageForm>
    <RecommendationList :brandList="apiSharedData.brandItems"></RecommendationList>
    <ArticleList :articleList="apiSharedData.articleItems" mode="columns"></ArticleList>
    <MessageForm title="Задать вопрос эксперту"></MessageForm>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import ApiSharedData from '@/models/ekoset/ApiSharedData';
import RecommendationList from '@/components/public/RecommendationList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'

@Component({
  components: {
    ArticleList,
    RecommendationList,
    MessageForm
  }
})
export default class TheShared extends Vue {
  @Prop()
  private apiSharedData

}
</script>

<style lang="scss">
</style>