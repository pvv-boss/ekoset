<template>
  <div class="brc-buscet_wrapper">
    <span>{{buscet.serviceName}}</span>
    <div @click="removeBuscetItem">×</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RecommendationListItem from '@/components/public/RecommendationListItem.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import { getServiceContainer } from '@/api/ServiceContainer'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import { NuxtContext } from 'vue/types/options'
import { BusinessServiceLocalStorageItem } from '@/models/ekoset/BusinessServiceLocalStorageItem'
import BuscetStore from '@/store/BuscetStore'

@Component
export default class BuscetItem extends Vue {
  @Prop()
  private buscet: BusinessServiceLocalStorageItem

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  private removeBuscetItem () {
    this.buscetStore.removeService(this.buscet)
  }
}

</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-buscet_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: max-content;
  border: 1px solid #d1d1d1;
  background-color: white;
  padding: 4px 6px 4px 6px;
  margin: 6px;

  span {
    font-size: 15px;
    color: #6a6969;
    // text-overflow: ellipsis;
    // overflow: hidden;
    // width: 95%;
    // max-width: 95%;
    // white-space: nowrap;
  }
  div {
    font-size: 18px;
    color: #6a6969;
    margin-left: 6px;
    cursor: pointer;
  }
}
</style>