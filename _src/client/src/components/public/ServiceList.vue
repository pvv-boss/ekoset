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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 30px 0 0 0;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
}
</style>