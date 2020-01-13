<template>
  <div class="brc-section__wrapper">
    <p>
      <a name="brcOfferForm" id="brcOfferForm"></a>
    </p>
    <template v-for="iterComponent in dynamicComponentInfo">
      <div
        :key="iterComponent.id + iterComponent.dispalyName"
        class="brc-page__dynamic_block"
        v-if="iterComponent.visible===1"
      >
        <h2
          v-if="!!iterComponent.head"
          :class="{'brc-page__dynamic_block_center': iterComponent.headCentered === true}"
        >{{iterComponent.head }}</h2>
        <component :is="iterComponent.name" v-bind="iterComponent.props"></component>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import RecommendationList from '@/components/public/RecommendationList.vue'
import RecommLetterList from '@/components/public/RecommLetterList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'
import ClientTypeOfferList from '@/components/public/ClientTypeOfferList.vue'
import BusinessTypeOfferList from '@/components/public/BusinessTypeOfferList.vue'
import FreeContentBlock from '@/components/FreeContentBlock.vue'
import ServiceList from '@/components/public/ServiceList.vue'
import ServicePriceTable from '@/components/public/ServicePriceTable.vue'


@Component({
  components: {
    ArticleList,
    RecommendationList,
    RecommLetterList,
    MessageForm,
    FreeContentBlock,
    ClientTypeOfferList,
    BusinessTypeOfferList,
    ServiceList,
    ServicePriceTable
  }
})
export default class DynamicComponentsContainer extends Vue {
  @Prop()
  private dynamicComponentInfo
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-page__dynamic_block + .brc-page__dynamic_block {
  margin-top: 60px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
}

.brc-page__dynamic_block {
  .brc-page__dynamic_block_center {
    text-align: center !important;
  }
}
</style>
