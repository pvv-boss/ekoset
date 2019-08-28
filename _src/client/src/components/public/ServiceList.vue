<template>
  <div>
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