<template>
  <div class="brc-page-header__invent">
    <img src="/images/tender.png" />
    <a>Пригласить на тендер</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderInviteTender extends Vue {

}
</script>


<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-page-header__invent {
  display: flex;
  height: 18px;
  max-height: 18px;
  align-items: center;
  margin-left: 15px;
  > img {
    height: 100%;
    min-height: 100%;
    @media (max-width: 900px) {
      display: none !important;
    }
  }
  > a {
    margin-left: 3px;
    border-bottom: 1px dotted rgba(255, 13, 41, 0.25);
    color: $red;
    letter-spacing: -0.2px;
  }
}
</style>
