<template>
  <div class="brc-page-description">
    <div v-html="leftBlock"></div>
    <div v-html="rightBlock"></div>
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

  > div {
    margin: 15px;
    flex-basis: 100%;
  }
}

@media (max-width: 768px) {
  .brc-page-description {
    flex-direction: column;
  }
}
</style>
