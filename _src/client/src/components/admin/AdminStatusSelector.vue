<template>
  <div class="brc-admin-status-selector">
    <b-radio
      v-model="selectedValueId"
      @input="$emit('input', selectedId)"
      :disabled="disabled"
      name="name"
      native-value="0"
    >Неактивно</b-radio>
    <b-radio
      v-model="selectedValueId"
      @input="$emit('input', selectedId)"
      :disabled="disabled"
      name="name"
      native-value="1"
    >Активно</b-radio>
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

  private selectedId = null

  private get selectedValueId () {
    return this.selectedId
  }

  private set selectedValueId (id) {
    this.selectedId = id
  }

  private async mounted () {
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


