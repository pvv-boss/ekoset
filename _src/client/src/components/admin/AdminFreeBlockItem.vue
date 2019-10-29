<template>
  <div class="brc_admin-freeblock-item">
    <span>{{dynamicComponentInfo.head}}</span>
    <b-switch v-model="dynamicComponentInfoState.visible" type="is-success" size="is-small"></b-switch>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class AdminFreeBlockItem extends Vue {

  @Prop()
  private dynamicComponentInfo

  private dynamicComponentInfoState = this.dynamicComponentInfo

}
</script>


<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-item {
  display: flex;
  justify-content: space-between;

  padding-left: 5px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  font-size: $font-small;
  line-height: 2em;

  cursor: move;
}
</style>  