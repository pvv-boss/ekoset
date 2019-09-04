<template>
  <section>
    <p>
      <a name="brcOfferForm" id="brcOfferForm"></a>
    </p>
    <MessageForm title="Заказать услугу"></MessageForm>
    <RecommendationList
      v-if="apiSharedData.brandItems.length > 0"
      :brandList="apiSharedData.brandItems"
    ></RecommendationList>
    <div class="brc-section__wrapper" v-if="apiSharedData.articleItems.length > 0">
      <h2>Новости</h2>
      <ArticleList :articleList="apiSharedData.articleItems.slice(0, 3)" mode="columns"></ArticleList>
    </div>
    <p>
      <a name="brcQuestionForm" id="brcQuestionForm"></a>
    </p>
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
