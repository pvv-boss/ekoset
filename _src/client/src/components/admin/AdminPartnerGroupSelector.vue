<template>
  <div class="brc-select-wrapper">
    <b-field>
      <b-select
        placeholder
        v-model="selectedValueId"
        @input="$emit('input', selectedId)"
        :disabled="disabled"
        expanded
      >
        <option
          v-for="partnerGroup in partnerGroupList"
          :key="partnerGroup.partnerGroupId"
          :value="partnerGroup.partnerGroupId"
        >{{partnerGroup.partnerGroupName}}</option>
      </b-select>
      <span v-if="nullable" @click="setValueNull">
        <b-icon icon="close"></b-icon>
      </span>
    </b-field>
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

  @Prop({ type: Boolean, default: false })
  private nullable

  @Prop({ type: Boolean, default: false })
  private disabled

  private selectedId = null

  private partnerGroupList: PartnerGroup[] = []

  private get selectedValueId () {
    return this.selectedId
  }

  private set selectedValueId (id) {
    this.selectedId = id
  }

  private setValueNull () {
    this.selectedValueId = null
    this.$emit('input', null)
  }


  private async mounted () {
    this.partnerGroupList = await getServiceContainer().publicEkosetService.getPartnerGroups()
    this.selectedId = this.value
  }
}
</script>


