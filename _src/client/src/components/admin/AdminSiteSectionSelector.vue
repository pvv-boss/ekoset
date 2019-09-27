<template>
  <div class="brc-select-wrapper">
    <select class="form-control" v-model="value" @change="$emit('input', $event.target.value)">
      <option
        v-for="siteSection in siteSectionList"
        :key="siteSection.siteSectionId"
        :value="siteSection.siteSectionId"
      >{{siteSection.siteSectionName}}</option>
    </select>
    <span v-if="nullable" @click="$emit('input', null)">&times;</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminSiteSectionSelector extends Vue {
  @Prop()
  private value

  @Prop({ default: false })
  private nullable

  private siteSectionList: SiteSection[] = []

  private async mounted () {
    this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
  }
}
</script>

<style lang="scss">
.brc-select-wrapper {
  display: inline-flex;
  width: 100%;
  select {
    flex-grow: 1;
  }
  span {
    flex-grow: 0;
    padding: 0 5px;
    cursor: pointer;
  }
}
</style>
