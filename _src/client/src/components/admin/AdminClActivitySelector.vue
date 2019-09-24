<template>
  <select class="form-control" v-model="value">
    <option
      v-for="item in itemList"
      :key="item.clActivityId"
      :value="item.clActivityId"
    >{{item.clActivityName}}</option>
  </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClActivity from '@/models/ekoset/ClActivity'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminClActivitySelector extends Vue {
  @Prop()
  private value
  private itemList: ClActivity[] = []

  private async mounted () {
    this.itemList = await getServiceContainer().publicEkosetService.getClActivityList()
  }
}
</script>


