<template>
  <section>
    <MessageForm title="Заказать услугу"></MessageForm>
    <RecommendationList v-if="apiSharedData.brandItems > 0" :brandList="apiSharedData.brandItems"></RecommendationList>
    <h2 v-if="apiSharedData.articleItems.length > 0">Новости</h2>
    <ArticleList
      v-if="apiSharedData.articleItems.length > 0"
      :articleList="apiSharedData.articleItems.slice(0, 3)"
      mode="columns"
    ></ArticleList>
    <MessageForm title="Задать вопрос эксперту"></MessageForm>
    <BottomDynamicBlock></BottomDynamicBlock>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import ApiSharedData from '@/models/ekoset/ApiSharedData';
import RecommendationList from '@/components/public/RecommendationList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'
import BottomDynamicBlock from '@/components/public/BottomDynamicBlock.vue'
@Component({
  components: {
    ArticleList,
    RecommendationList,
    MessageForm,
    BottomDynamicBlock
  }
})
export default class TheShared extends Vue {
  @Prop()
  private apiSharedData

}
</script>
