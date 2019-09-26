<template>
  <div class="brc-admin-client-type-selector">
    <input
      type="radio"
      id="clientTypeSelector-1"
      value="1"
      v-model="value"
      @change="$emit('input', $event.target.value)"
    />
    <label for="clientTypeSelector-1">Бизнес</label>
    <input
      type="radio"
      id="clientTypeSelector-3"
      value="3"
      v-model="value"
      @change="$emit('input', $event.target.value)"
    />
    <label for="clientTypeSelector-3">Частные лица</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminClientTypeSelector extends Vue {
  @Prop()
  private value
}
</script>

<style lang="scss">
.brc-admin-client-type-selector {
  display: flex;
  flex-direction: row;

  input {
    width: auto !important;
  }
}
</style>


