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
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: $font-medium;
  color: white;
  margin-left: 10px;
  > a:hover {
    color: white !important;
  }
}
</style>