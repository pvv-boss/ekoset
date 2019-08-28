<template>
  <div>
    <ClientListItem
      v-for="clientItem in clientList"
      :key="clientItem.clClientId"
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