<template>
  <div class="brc_admin-service-list-item">
    <nuxt-link
      :to="{ name: 'admin-service-card', params: { siteSection: siteSectionUrl, service: businessServiceState.businessServiceUrl}}"
    >{{businessServiceState.businessServiceName}}</nuxt-link>

    <b-field label="Ед. измерения" horizontal style="margin-left: auto">
      <b-input placeholder="Единица измерения" v-model="businessService.businessServiceUnit"></b-input>
    </b-field>

    <b-field label="Цена, руб." horizontal>
      <b-input
        placeholder="Цена, руб."
        type="number"
        v-model.number="businessService.businessServicePrice"
      ></b-input>
    </b-field>

    <b-switch
      v-model="businessServiceState.businessServiceStatus"
      true-value="1"
      false-value="0"
      type="is-success"
      size="is-small"
      style="margin-left: 30px"
    ></b-switch>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService'

@Component
export default class AdminServiceListItem extends Vue {

  @Prop()
  private siteSectionUrl

  @Prop()
  private businessService: BusinessService

  private businessServiceState = this.businessService

}
</script>


<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-service-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  line-height: 2em;

  * {
    margin-bottom: 0px !important;
    font-weight: $font-regular !important;
    font-size: 15px !important;
  }

  cursor: move;
}
</style>  