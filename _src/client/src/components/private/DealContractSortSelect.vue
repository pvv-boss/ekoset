<template>
  <select v-model="sortMode" class="brc-contract-sort__mobile">
    <option :value="0">{{zeroOptName}}</option>
    <option :value="1">{{oneOptName}}</option>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class DealContractSortSelect extends Vue {

@Prop({default:'По сроку действия'})
private zeroOptName

@Prop({default:'По наименованию'})
private oneOptName

  private sortMode = 0
  private sortOrder = false

  @Watch("sortMode", { immediate: true })
  private onSortModeChanged () {
    this.$emit("sort-mode-changed", this.sortMode)
  }

}
</script>

<style lang="scss">
.brc-contract-sort__mobile {
  display: none;
  margin-left: auto;
  @media (max-width: 768px) {
    display: block;
    * {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 374px) {
    margin-left: 0px;
    margin-top: 10px;
  }
}
</style>