<template>
  <section class="brc-card-wrapper">
    <header class="brc-card__header">
      <slot name="header"></slot>
    </header>
    <section class="brc-card__content">
      <slot name="content"></slot>
    </section>
    <footer class="brc-card__footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
export default class BaseCard extends Vue { }
</script>

<style lang="scss">
.brc-card-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: $box-shadow;
  background-color: white;

  .brc-card__header {
    border-bottom: 1px solid #ccc;
    padding: 0.9rem;

    @media (max-width: 768px) {
      padding: 5px;
    }
  }

  .brc-card__content {
    flex-grow: 1;
    padding: 1rem;
    @media (max-width: 768px) {
      padding: 5px;
    }
  }
}
</style>