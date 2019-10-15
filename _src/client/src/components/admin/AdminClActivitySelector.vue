<template>
  <div class="brc-select-wrapper">
    <b-field>
      <b-select
        placeholder
        v-model="selectedValueId"
        @change="$emit('input', selectedId)"
        :disabled="disabled"
        expanded
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

    <!-- <select
      class="form-control"
      v-model="selectedValueId"
      @change="$emit('input', selectedId)"
      :disabled="disabled"
    >
      <option
        v-for="item in itemList"
        :key="item.clActivityId"
        :value="item.clActivityId"
      >{{item.clActivityName}}</option>
    </select>
    <span v-if="nullable" @click="setValueNull">&times;</span>-->
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
    this.itemList = await getServiceContainer().publicEkosetService.getClActivityList()
    this.selectedId = this.value
  }


}
</script>


