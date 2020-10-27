<template>
  <div class="brc-buscet_container">
    <BuscetItem
      v-for="iterBuscet in buscetList"
      :key="iterBuscet.serviceUrl"
      :buscet="iterBuscet"
    ></BuscetItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import BuscetStore from '@/store/BuscetStore'

@Component
export default class BuscetContaner extends Vue {

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  private get buscetList () {
    return this.buscetStore.addedServiceList
  }
}

</script>

<style lang="scss">
.brc-buscet_container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border: 1px solid #d1d1d1;
  background-color: #f4f4f5;
  padding: 4px;
}
</style>