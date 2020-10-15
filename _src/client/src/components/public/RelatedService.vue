<template>
  <div class="brc-related-service-list">
    <LazyServiceListItem
      v-for="serviceItem in serviceList"
      :key="serviceItem.businessServiceId"
      :service-item="serviceItem"
    ></LazyServiceListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class RelatedService extends Vue {
  @Prop(Array)
  private serviceList
}
</script>

<style lang="scss">
.brc-related-service-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 30px 0 0 0;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>