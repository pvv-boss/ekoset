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
  // grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  // margin: 30px -15px 0;
  margin: 30px 0 0 0;
  grid-gap: 1rem;

  @media (max-width: 951px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  @media (max-width: 831px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 545px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 10px;
  }

  @media (max-width: 483px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  @media (max-width: 423px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }

  @media (max-width: 393px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  @media (max-width: 363px) {
    grid-template-columns: repeat(auto-fill, minmax(98px, 1fr));
  }

  @media (max-width: 358px) {
    grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
  }

  @media (max-width: 336px) {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }
}
</style>