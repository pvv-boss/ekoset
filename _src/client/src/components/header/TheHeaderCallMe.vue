<template>
  <a class="brc-contact__telephone" href="tel:+74952233595">
    <span class="brc-contact__telephone-code">+7 (495)</span>
    <span class="brc-contact__telephone-nmb">22-33-595</span>
  </a>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderCallMe extends Vue {
}
</script>

<style lang="scss">
.brc-contact__telephone {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  > span + span {
    margin-left: 5px;
  }
  .brc-contact__telephone-code {
    color: #26272d;
    font-weight: $font-medium;
    white-space: nowrap;
  }
  .brc-contact__telephone-nmb {
    color: $red;
    font-size: 1.6rem;
    font-weight: $font-medium;
    margin-left: 5px !important;
    white-space: nowrap;
  }
}
</style>