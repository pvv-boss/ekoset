<template>
  <div class="brc-deal-status">
    <div class="brc-deal-status__color" :style="{ color: statusColor }">•</div>
    <div class="brc-deal-status__name">{{ statusName }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class DealStatus extends Vue {
  @Prop()
  private statusCode

  private get statusName () {
    return this.statusCode === 0
      ? 'Действует'
      : this.statusCode === 1
        ? 'Скоро заканчивается'
        : 'Закончился'
  }

  private get statusColor () {
    return this.statusCode === 0
      ? 'green'
      : this.statusCode === 1
        ? '#f4f414'
        : '#ed0205'
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-deal-status {
  display: flex;
  margin-top: 10px;
  .brc-deal-status__color {
    // padding-right: 20px;
    //  width: 10px;
    line-height: 22px;
    font-size: 48px;
  }

  .brc-deal-status__name {
    margin-left: 6px;
    font-size: 0.8rem;
    font-weight: 500;
  }
}
</style>
