<template>
  <div class="brc-select-wrapper">
    <b-field>
      <b-select
        v-model="selectedValueId"
        placeholder
        :disabled="disabled"
        expanded
        @input="$emit('input', selectedId)"
      >
        <option
          v-for="item in itemList"
          :key="item.clActivityId"
          :value="item.clActivityId"
        >{{item.clActivityName}}</option>
      </b-select>
      <span v-if="nullable" @click="setValueNull">
        <b-icon icon="close"></b-icon>
      </span>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClActivity from '@/models/ekoset/ClActivity'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminClActivitySelector extends Vue {
  @Prop()
  private value

  @Prop({ type: Boolean, default: false })
  private nullable

  @Prop({ type: Boolean, default: false })
  private disabled

  @Prop()
  private clActivityList

  private itemList: ClActivity[] = []

  private selectedId = null

  private get selectedValueId () {
    return this.selectedId
  }

  private set selectedValueId (id) {
    this.selectedId = id
  }

  private setValueNull () {
    this.selectedValueId = null
    this.$emit('input', null)
  }

  private async mounted () {
    this.itemList = this.clActivityList ? this.clActivityList : await getServiceContainer().publicEkosetService.getClActivityList()
    this.selectedId = this.value
  }


}
</script>


