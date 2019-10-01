<template>
  <div class="brc-message-arise__outer">
    <div class="brc-message-arise__wrapper" id="btnOrderPopupForm" style="display:none">
      <MessageForm title="Заказать услугу" @closeForm="closeForm" showCloseBtn="true"></MessageForm>
    </div>
    <div class="brc-message-arise__wrapper" id="btnQuestionPopupForm" style="display:none">
      <MessageForm title="Задать вопрос эксперту" @closeForm="closeForm" showCloseBtn="true"></MessageForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import MessageForm from '@/components/public/MessageForm.vue'

@Component({
  components: {
    MessageForm
  }
})
export default class TheMessagesAriseBlock extends Vue {
  private mounted () {
    const orderFormElement = document.getElementById('btnOrderPopupForm')
    if (orderFormElement) {
      orderFormElement.addEventListener('click', (e) => {
        if (!orderFormElement.children[0].contains(e.target as HTMLElement)) {
          orderFormElement.setAttribute('style', 'display:none')
        }
      })
    }

    const questionFormElement = document.getElementById('btnQuestionPopupForm')
    if (questionFormElement) {
      questionFormElement.addEventListener('click', (e) => {
        if (!questionFormElement.children[0].contains(e.target as HTMLElement)) {
          questionFormElement.setAttribute('style', 'display:none')
        }
      })
    }

  }

  private closeForm () {
    const orderFormElement = document.getElementById('btnOrderPopupForm')
    if (orderFormElement) {
      orderFormElement.setAttribute('style', 'display:none')
    }

    const questionFormElement = document.getElementById('btnQuestionPopupForm')
    if (questionFormElement) {
      questionFormElement.setAttribute('style', 'display:none')
    }
  }

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.brc-message-arise__wrapper {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.9);
  color: $text-color;
  width: 100%;
  height: 100vh;
  padding: 16px;

  > .brc-feedback {
    background-color: white;
  }

  .brc-message-arise__close {
    float: right;
    margin-top: -30px;
    font-size: 36px;
    color: gray;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .brc-message-arise__wrapper {
    > .brc-feedback {
      margin: 0 auto !important;

      textarea {
        height: 80px;
      }
      input {
        height: 38px !important;
      }
      .brc-input-addon {
        padding-top: 10px !important;
      }
    }
    .brc-message-form__row:last-child {
      margin-bottom: 0 !important;
    }

    .brc-message-arise__close {
      position: absolute;
      right: 30px;
      top: 15px;
      margin-top: 0 !important;
    }
  }
}
</style>