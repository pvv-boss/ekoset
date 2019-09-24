<template>
  <select class="form-control" v-model="value" @change="$emit('input', $event.target.value)">
    <option value="1">статус 1</option>
    <option value="2">статус 2</option>
    <option value="3">статус 3</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminStatusSelector extends Vue {
  @Prop()
  private value
  // private siteSectionList: SiteSection[] = []

  // private async mounted () {
  //   this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
  // }
}
</script>


