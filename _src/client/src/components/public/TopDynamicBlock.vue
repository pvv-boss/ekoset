<template>
  <div
    class="brc-page-description"
    v-if="(!!rightBlock && rightBlock.length > 0) || (!!leftBlock && leftBlock.length > 0)"
  >
    <div
      v-if="(!!leftBlock && leftBlock.length > 0)"
      v-html="leftBlock"
      :class="{'column-block':rightBlock === null || (!!rightBlock && rightBlock.length === 0)}"
    ></div>
    <div v-html="rightBlock" v-if="!!rightBlock && rightBlock.length > 0"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class TopDynamicBlock extends Vue {
  @Prop()
  private leftBlock

  @Prop()
  private rightBlock
}
</script>
<style lang="scss">
.brc-page-description {
  display: flex;
  flex-direction: row;
  margin: 0 -15px;
  // font-size: 15px;
  // letter-spacing: 0.025em !important;
  > div {
    margin: 15px;
    flex-basis: 100%;
  }

  .column-block {
    max-width: 100%;
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
    -webkit-column-gap: 30px;
    -moz-column-gap: 30px;
    column-gap: 30px;

    img {
      max-width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .brc-page-description {
    flex-direction: column;
  }
  .column-block {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-gap: 0;
    -moz-column-gap: 0;
    column-gap: 0;
  }
}
</style>
