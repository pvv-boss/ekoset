<template>
  <div class="brc-page-header__action">
    <img src="/images/note.png" />
    <a>Задать вопрос</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderAskQuestion extends Vue {

}
</script>


<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-page-header__action {
  display: flex;
  height: 18px;
  max-height: 18px;
  align-items: center;
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
