<template>
  <section>
    <div>Направление деятельности</div>
    <nuxt-link :to="{ name: 'activity-card', params: { activity: siteSectionItem.siteSectionUrl}}">
      <h2>{{siteSectionItem.siteSectionName}}</h2>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class SiteSectionListItem extends Vue {
  @Prop()
  private siteSectionItem
}
</script>



