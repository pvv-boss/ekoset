<template>
  <div class="brc-page-header__order">
    <a href="#brcOfferForm">Заказать</a>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderOrder extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-page-header__order {
  background-color: $red;
  width: 120px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  // font-weight: $font-medium;
  letter-spacing: 0.055rem;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  > a {
    color: white !important;
  }
}
</style>