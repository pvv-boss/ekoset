<template>
  <tr>
    <td>
      <nuxt-link
        :to="{ name: 'admin-site-section-card', params: { siteSection: siteSectionItem.siteSectionSlug+'-'+siteSectionItem.siteSectionId}}"
      >{{siteSectionItem.siteSectionName}}</nuxt-link>
    </td>
    <td>{{siteSectionItem.siteSectionSlug}}</td>
    <td>{{siteSectionItem.siteSectionPriority}}</td>
    <td>{{siteSectionItem.siteSectionStatus}}</td>
    <td>
      <button @click="deleteSiteSection">Удалить</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({})
export default class AdminSiteSectionListItem extends Vue {
  @Prop()
  private siteSectionItem
}
</script>

