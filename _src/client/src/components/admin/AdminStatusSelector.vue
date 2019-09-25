<template>
  <div class="brc-admin-status-selector">
    <input
      type="radio"
      id="statusSelector-0"
      value="0"
      v-model="value"
      @change="$emit('input', $event.target.value)"
    />
    <label for="statusSelector-0">Неактивно</label>
    <input
      type="radio"
      id="statusSelector-1"
      value="1"
      v-model="value"
      @change="$emit('input', $event.target.value)"
    />
    <label for="statusSelector-1">Активно</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminStatusSelector extends Vue {
  @Prop()
  private value
}
</script>

<style lang="scss">
.brc-admin-status-selector {
  display: flex;
  flex-direction: row;

  input {
    width: auto !important;
  }
}
</style>


