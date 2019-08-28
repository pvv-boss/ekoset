<template>
  <section>
    <nuxt-link
      :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, activity: getCurrentSiteSection}}"
    >{{serviceItem.businessServiceName}}</nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({})
export default class ServiceListItem extends Vue {
  @Prop()
  private serviceItem: BusinessService


  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>



