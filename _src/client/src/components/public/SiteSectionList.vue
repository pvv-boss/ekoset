<template>
  <div class="brc-site-section-list">
    <LazySiteSectionListItem
      v-for="siteSectionItem in siteSectionList"
      :key="siteSectionItem.siteSectionId"
      :site-section-item="siteSectionItem"
    ></LazySiteSectionListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class SiteSectionList extends Vue {
  @Prop(Array)
  private siteSectionList
}
</script>

<style lang="scss">
.brc-site-section-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 30px -15px 0;
}
</style>