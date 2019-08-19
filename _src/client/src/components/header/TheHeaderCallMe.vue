<template>
  <a class="brc-contact__telephone" href="tel:+74952233595">
    <span class="brc-contact__telephone-code">+7 (495)</span>
    <span class="brc-contact__telephone-nmb">223-35-95</span>
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
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-contact__telephone {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  > span + span {
    margin-left: 5px;
  }
  .brc-contact__telephone-code {
    color: #26272d;
    font-weight: $font-medium;
  }
  .brc-contact__telephone-nmb {
    color: $red;
    font-size: 1.2rem;
    font-weight: $font-bold;
    margin-left: 5px !important;
  }
}
</style>