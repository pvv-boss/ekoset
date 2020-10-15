<template>
  <div class="brc-select-wrapper">
    <b-field style="align-items:center">
      <b-select
        v-model="selectedSiteSectionId"
        placeholder="Раздел сайта"
        :disabled="disabled"
        expanded
        @input="$emit('input', selectedId)"
      >
        <option
          v-for="siteSection in siteSectionList"
          :key="siteSection.siteSectionId"
          :value="siteSection.siteSectionId"
        >{{siteSection.siteSectionName}}</option>
      </b-select>
      <span v-if="nullable" @click="setSiteSectionNull">
        <b-icon icon="close"></b-icon>
      </span>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminSiteSectionSelector extends Vue {
  @Prop()
  private value

  @Prop({ type: Boolean, default: false })
  private nullable

  @Prop({ type: Boolean, default: false })
  private disabled

  private selectedId = null

  private get selectedSiteSectionId () {
    return this.selectedId
  }

  private set selectedSiteSectionId (id) {
    this.selectedId = id
  }

  private siteSectionList: SiteSection[] = []

  private async mounted () {
    this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
    this.selectedId = this.value
  }

  private setSiteSectionNull () {
    this.selectedSiteSectionId = null
    this.$emit('input', null)
  }
}
</script>

<style lang="scss">
.brc-select-wrapper {
  display: inline-flex;
  width: 100%;
  .field {
    width: 100%;
  }
  select {
    flex-grow: 1;
  }
  span {
    flex-grow: 0;
    padding: 0 5px;
    cursor: pointer;
  }
}
</style>
