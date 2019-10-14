<template>
  <section>
    <p>
      <a name="brcOfferForm" id="brcOfferForm"></a>
    </p>
    <template v-for="iterComponent in dynamicComponentInfo">
      <h2 :key="iterComponent.id">{{iterComponent.head }}</h2>
      <component :key="iterComponent.id" :is="iterComponent.name" v-bind="iterComponent.props"></component>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import RecommendationList from '@/components/public/RecommendationList.vue'
import RecommLetterList from '@/components/public/RecommLetterList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'
import BottomDynamicBlock from '@/components/public/BottomDynamicBlock.vue'
@Component({
  components: {
    ArticleList,
    RecommendationList,
    RecommLetterList,
    MessageForm,
    BottomDynamicBlock
  }
})
export default class DynamicComponentsContainer extends Vue {
  @Prop()
  private dynamicComponentInfo
}
</script>
