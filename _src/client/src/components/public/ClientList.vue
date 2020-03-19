<template>
  <div class="brc-clients-list">
    <ClientListItem
      v-for="clientItem in clientList"
      :key="clientItem.clActivityId"
      :clientItem="clientItem"
    ></ClientListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClientListItem from '@/components/public/ClientListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ClientListItem
  }
})
export default class ClientList extends Vue {
  @Prop(Array)
  private clientList
}
</script>

<style lang="scss">
.brc-clients-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: -30px;
  grid-gap: 1rem;
  padding-top: 30px;
  border-top: 1px solid lightgrey;

  @media (max-width: 768px) {
    margin-top: -20px;
    padding-top: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}
</style>