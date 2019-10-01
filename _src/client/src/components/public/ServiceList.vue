<template>
  <div class="brc-service-list">
    <ServiceListItem
      v-for="serviceItem in serviceList"
      :key="serviceItem.businessServiceId"
      :serviceItem="serviceItem"
    ></ServiceListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ServiceListItem from '@/components/public/ServiceListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({
  components: {
    ServiceListItem
  }
})
export default class ServiceList extends Vue {
  @Prop(Array)
  private serviceList
}
</script>

<style lang="scss">
.brc-service-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 30px -15px 0;
}
</style>