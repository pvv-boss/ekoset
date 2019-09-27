<template>
  <div class="brc-select-wrapper">
    <select class="form-control" v-model="value" @change="$emit('input', $event.target.value)">
      <option
        v-for="partnerGroup in partnerGroupList"
        :key="partnerGroup.partnerGroupId"
        :value="partnerGroup.partnerGroupId"
      >{{partnerGroup.partnerGroupName}}</option>
    </select>
    <span v-if="nullable" @click="$emit('input', null)">&times;</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import PartnerGroup from '@/models/ekoset/PartnerGroup'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminPartnerGroupSelector extends Vue {
  @Prop()
  private value

  @Prop({ default: false })
  private nullable

  private partnerGroupList: PartnerGroup[] = []

  private async mounted () {
    this.partnerGroupList = await getServiceContainer().publicEkosetService.getPartnerGroups()
  }
}
</script>


