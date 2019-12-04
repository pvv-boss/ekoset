<template>
  <section>
    <p>
      <a name="brcOfferForm" id="brcOfferForm"></a>
    </p>
    <template v-for="iterComponent in dynamicComponentInfo">
      <div
        :key="iterComponent.id"
        class="brc-page__dynamic_block"
        v-show="iterComponent.visible===1"
      >
        <h2 v-show="!!iterComponent.head">{{iterComponent.head }}</h2>
        <component :is="iterComponent.name" v-bind="iterComponent.props"></component>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import RecommendationList from '@/components/public/RecommendationList.vue'
import RecommLetterList from '@/components/public/RecommLetterList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'
import FreeContentBlock from '@/components/FreeContentBlock.vue'

@Component({
  components: {
    ArticleList,
    RecommendationList,
    RecommLetterList,
    MessageForm,
    FreeContentBlock
  }
})
export default class DynamicComponentsContainer extends Vue {
  @Prop()
  private dynamicComponentInfo
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-page__dynamic_block {
  margin-top: 60px;
}
</style>
