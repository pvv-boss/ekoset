<template>
  <div class="brc-section__wrapper">
    <p>
      <a id="brcOfferForm" name="brcOfferForm"></a>
    </p>
    <template v-for="iterComponent in dynamicComponentInfo">
      <div
        v-if="iterComponent.visible === 1"
        :key="iterComponent.id + iterComponent.dispalyName"
        class="brc-page__dynamic_block"
      >
        <h2
          v-if="!!iterComponent.head"
          class="brc-page__dynamic_block_header"
          :class="{
            'brc-page__dynamic_block_center':
              iterComponent.headCentered === true,
          }"
        >
          {{ iterComponent.head }}
        </h2>
        <component
          :is="iterComponent.name"
          v-bind="iterComponent.props"
        ></component>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    RecommendationList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/RecommendationList.vue'),
    ServicePrice: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/ServicePrice.vue'),
    FreeContentBlock: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/FreeContentBlock.vue'),
    ClientList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/ClientList.vue'),
    ClientTypeOfferList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/ClientTypeOfferList.vue'),
    ArticleList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/ArticleList.vue'),
    BusinessTypeOfferList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/BusinessTypeOfferList.vue'),
    RecommLetterList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/RecommLetterList.vue'),
    RelatedService: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/RelatedService.vue'),
    ServiceList: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/ServiceList.vue'),
    TheMessagesAriseBlock: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/TheMessagesAriseBlock.vue'),
    MessageForm: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/MessageForm.vue'),
    MessageFormSimple: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/MessageFormSimple.vue'),
    MessageFormMobile: () => import(/* webpackChunkName: "ekoset-common-dyn-components" */  '@/components/public/MessageFormMobile.vue')
  }
})
export default class DynamicComponentsContainer extends Vue {
  @Prop()
  private dynamicComponentInfo
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.brc-page__dynamic_block + .brc-page__dynamic_block {
  margin-top: 60px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
}

.brc-page__dynamic_block_header {
  margin-bottom: 30px;
  text-align: center;
  @media (max-width: 768px) {
    text-align: left;
    margin-bottom: 20px;
  }
}

.brc-page__dynamic_block {
  .brc-page__dynamic_block_center {
    text-align: center !important;
  }
}
</style>
