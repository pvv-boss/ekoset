<template>
  <div class="brc-select-wrapper">
    <select class="form-control" v-model="value" @change="$emit('input', $event.target.value)">
      <option
        v-for="item in itemList"
        :key="item.businessServiceId"
        :value="item.businessServiceId"
      >{{item.businessServiceName}}</option>
    </select>
    <span v-if="nullable" @click="$emit('input', null)">&times;</span>
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

  @Prop({ default: false })
  private nullable

  private itemList: BusinessService[] = []

  @Watch('siteSectionId', { immediate: true })
  private async updateServiceList () {
    if (this.siteSectionId && this.siteSectionId > 0) {
      this.itemList = await getServiceContainer().businessServiceService.getBySiteSectionSlug('slug-' + this.siteSectionId)
    }
  }

  private async mounted () {
    this.updateServiceList()
  }
}
</script>