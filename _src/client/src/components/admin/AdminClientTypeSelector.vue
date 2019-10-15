<template>
  <div class="brc-admin-client-type-selector">
    <b-radio
      v-model="selectedValueId"
      @change="$emit('input', selectedId)"
      :disabled="disabled"
      name="name"
      native-value="1"
    >Бизнес</b-radio>
    <b-radio
      v-model="selectedValueId"
      @change="$emit('input', selectedId)"
      :disabled="disabled"
      name="name"
      native-value="3"
    >Частные лица</b-radio>

    <!-- <input
      type="radio"
      id="clientTypeSelector-1"
      value="1"
      v-model="selectedValueId"
      @change="$emit('input', selectedId)"
      :disabled="disabled"
    />
    <label for="clientTypeSelector-1">Бизнес</label>
    <input
      type="radio"
      id="clientTypeSelector-3"
      value="3"
      v-model="selectedValueId"
      @change="$emit('input', selectedId)"
      :disabled="disabled"
    />
    <label for="clientTypeSelector-3">Частные лица</label>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminClientTypeSelector extends Vue {
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
.brc-admin-client-type-selector {
  display: flex;
  flex-direction: row;

  input {
    width: auto !important;
  }
}
</style>


