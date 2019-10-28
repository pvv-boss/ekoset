<template>
  <div class="brc-admin-status-selector">
    <div class="field">
      <b-switch
        v-model="selectedValueId"
        @input="$emit('input', selectedId)"
        :disabled="disabled"
        true-value="1"
        false-value="0"
        type="is-success"
      >{{caption}}</b-switch>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminStatusSelector extends Vue {
  @Prop()
  private value

  @Prop({ type: Boolean, default: false })
  private disabled

  @Prop()
  private statusCaption

  private selectedId = 1

  private get selectedValueId() {
    return this.selectedId
  }

  private set selectedValueId(id) {
    this.selectedId = id
  }
  private get caption() {
    return this.statusCaption ? this.statusCaption : 'Активно'
  }
  private async mounted() {
    this.selectedId = this.value
  }
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


