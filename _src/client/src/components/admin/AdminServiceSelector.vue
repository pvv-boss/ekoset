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
          :key="item.businessServiceId"
          :value="item.businessServiceId"
        >{{item.businessServiceName}}</option>
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
        :key="item.businessServiceId"
        :value="item.businessServiceId"
      >{{item.businessServiceName}}</option>
    </select>
    <span v-if="nullable" @click="setValueNull">&times;</span>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService'

@Component
export default class AdminServiceSelector extends Vue {
  @Prop()
  private value
  @Prop()
  private siteSectionId

  @Prop({ type: Boolean, default: false })
  private nullable

  @Prop({ type: Boolean, default: false })
  private disabled

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

  private itemList: BusinessService[] = []

  @Watch('siteSectionId', { immediate: true })
  private async updateServiceList () {
    if (this.siteSectionId && this.siteSectionId > 0) {
      this.itemList = await getServiceContainer().businessServiceService.getBySiteSectionSlug('slug-' + this.siteSectionId)
    }
  }

  private async mounted () {
    this.updateServiceList()
    this.selectedId = this.value
  }
}
</script>