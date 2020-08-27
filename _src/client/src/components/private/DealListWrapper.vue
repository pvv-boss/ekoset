<template>
  <section class="brc-deal-list_wrapper">
    <div class="brc-deal-list__item" v-for="iterItem of dealList" :key="iterItem.id">
      <div class="brc-deal-list__item__header">
        <slot name="header" :dealListItem="iterItem"></slot>
      </div>
      <div class="brc-deal-list__item__body">
        <slot name="body" :dealListItem="iterItem"></slot>
      </div>
      <div class="brc-deal-list__item__action">
        <slot name="action" :dealListItem="iterItem"></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Contract from '@/models/deal/Contract'

@Component
export default class DealListWrapper extends Vue {

  @Prop()
  private dealList

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-deal-list_wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

.brc-deal-list__item {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $delimiter-strong-color;
  border-radius: 2px;

  .brc-deal-list__item__header {
    background-color: #f4f4f5;
    border-bottom: 1px solid $delimiter-strong-color;
    padding-top: 20px !important;
  }

  .brc-deal-list__item_strong {
    font-weight: 500;
    font-size: 1rem !important;
  }

  .muted_label {
    color: $text-muted;
  }

  label {
    color: $text-muted;
    font-size: 0.75rem;
  }

  .label_row {
    margin-top: 8px;
    label,
    span {
      display: block;
      font-size: 0.8rem;
    }
  }

  .brc-deal-list__item__header_id {
    position: absolute;
    top: 4px;
    right: 5px;
    font-size: 0.8rem;
  }

  .brc-deal-list__item__header,
  .brc-deal-list__item__body,
  .brc-deal-list__item__action {
    padding: 15px;
  }

  .brc-deal-list__item__action {
    margin-top: auto;
    padding-top: 0px !important;

    .brc-deal-list__item__action_button {
      border: 1px solid red;
      color: red;
      text-decoration: none;
      width: 100%;
      max-width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      margin: auto;
      font-size: 0.8rem;

      &:hover {
        background-color: red;
        color: white;
      }

      &.notactive {
        border: 1px solid $delimiter-strong-color;
        color: $delimiter-strong-color;
        cursor: default;
        &:hover {
          background-color: white;
          color: $delimiter-strong-color;
        }
      }
    }
  }
}
</style>