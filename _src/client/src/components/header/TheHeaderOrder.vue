<template>
  <div class="brc-page-header__order">
    <a>Заказать</a>
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
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  // font-weight: $font-medium;
  letter-spacing: 1.5;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  > a:hover {
    color: white !important;
  }
}
</style>