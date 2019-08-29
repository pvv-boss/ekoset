<template>
  <div
    class="brc-site-section-list"
    :class="{ 'brc-site-section-list_empty' : siteSectionList.length % 3 !== 0 }"
  >
    <SiteSectionListItem
      v-for="siteSectionItem in siteSectionList"
      :key="siteSectionItem.siteSectionId"
      :siteSectionItem="siteSectionItem"
    ></SiteSectionListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSectionListItem from '@/components/public/SiteSectionListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    SiteSectionListItem
  }
})
export default class SiteSectionList extends Vue {
  @Prop(Array)
  private siteSectionList
}
</script>

<style lang="scss">
.brc-site-section-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  align-content: space-around;
  flex-wrap: wrap;
  margin: 0 -15px;

  .brc-site-section-smallitem__wrapper {
    flex: 1;
    min-width: 300px;
    padding-bottom: 30px;
  }
}

@media (min-width: 630px) {
  .brc-site-section-list_empty:after {
    content: "";
    flex: auto;
  }
}
</style>