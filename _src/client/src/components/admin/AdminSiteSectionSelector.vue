<template>
  <select class="form-control" v-model="value" @change="$emit('input', $event.target.value)">
    <option
      v-for="siteSection in siteSectionList"
      :key="siteSection.siteSectionId"
      :value="siteSection.siteSectionId"
    >{{siteSection.siteSectionName}}</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminSiteSectionSelector extends Vue {
  @Prop()
  private value

  private siteSectionList: SiteSection[] = []

  private async mounted () {
    this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
  }
}
</script>


