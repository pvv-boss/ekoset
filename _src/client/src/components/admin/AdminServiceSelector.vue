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
          :key="item.businessServiceId"
          :value="item.businessServiceId"
        >
          {{ item.businessServiceName }}
        </option>
      </b-select>
      <span v-if="nullable" @click="setValueNull">
        <b-icon icon="close"></b-icon>
      </span>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService'
import { ServiceRegistry } from '@/ServiceRegistry'
import BusinessServiceService from '@/services/BusinessServiceService'

@Component
export default class AdminServiceSelector extends Vue {

  private get selectedValueId () {
    return this.selectedId
  }

  private set selectedValueId (id) {
    this.selectedId = id
  }

  @Prop()
  private value

  @Prop()
  private siteSectionId

  @Prop({ type: Boolean, default: false })
  private nullable

  @Prop({ type: Boolean, default: false })
  private disabled

  private selectedId = null

  private itemList: BusinessService[] = []

  private setValueNull () {
    this.selectedValueId = null
    this.$emit('input', null)
  }

  @Watch('siteSectionId', { immediate: true })
  private async updateServiceList () {
    if (this.siteSectionId && this.siteSectionId > 0) {
      this.itemList = await ServiceRegistry.instance.getService(BusinessServiceService).getBySiteSectionSlug('slug-' + this.siteSectionId)
    }
  }

  private async mounted () {
    this.updateServiceList()
    this.selectedId = this.value
  }
}
</script>