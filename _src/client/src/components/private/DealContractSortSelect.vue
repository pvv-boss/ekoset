<template>
  <select class="brc-contract-sort__mobile" v-model="sortMode">
    <option :value="0">По сроку действия</option>
    <option :value="1">По наименованию</option>
  </select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class DealContractSortSelect extends Vue {

  private sortMode = 0
  private sortOrder = false

  @Watch("sortMode", { immediate: true })
  private onSortModeChanged () {
    this.$emit("sort-mode-changed", this.sortMode)
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-contract-sort__mobile {
  display: none;
  margin-left: auto;
  @media (max-width: 768px) {
    display: block;
    * {
      font-size: 0.8rem;
    }
  }
}
</style>