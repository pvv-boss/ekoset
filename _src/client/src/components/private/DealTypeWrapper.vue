<template>
  <section class="brc-deal-type-wrapper">
    <h1 class="brc-deal-type-wrapper__header">
      <slot name="header"></slot>
    </h1>
    <div class="brc-deal-type-wrapper__filter">
      <slot name="filter"></slot>
    </div>
    <div class="brc-deal-type-wrapper__cards">
      <slot name="cards"></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DealTypeWrapper extends Vue {
}
</script>

<style lang="scss">
.brc-deal-type-wrapper {
  .brc-deal-type-wrapper__header,
  .brc-deal-type-wrapper__filter {
    margin-top: 20px;
  }

  .brc-deal-type-wrapper__filter {
    background-color: #f4f4f5;
    border: 1px solid $delimiter-strong-color;
  }

  .brc-deal-type-wrapper__cards {
    margin-top: 60px;
    @media (max-width: 768px) {
      margin-top: 30px;
    }
  }
}
</style>