<template>
  <div class="brc-page-header__action">
    <a href="#brcQuestionForm" @click="navigateToQuestionForm">Задать вопрос</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderAskQuestion extends Vue {
  private navigateToQuestionForm (e) {
    const formElement = document.getElementById('btnQuestionPopupForm')
    if (formElement) {
      formElement.setAttribute('style', 'display:block');
    }
    e.preventDefault()
  }
}
</script>


<style lang="scss">
.brc-page-header__action {
  display: flex;
  height: 18px;
  max-height: 18px;
  align-items: center;

  > a {
    margin-left: 3px;
    border-bottom: 1px dotted rgba(255, 13, 41, 0.25);
    color: $red;
    letter-spacing: -0.2px;

    &:hover {
      color: darkred;
      border-bottom: 1px dotted darkred;
    }
  }
}
</style>
