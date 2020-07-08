<template>
  <div class="brc-message-arise__outer">
    <div class="brc-message-arise__wrapper" id="btnOrderPopupForm" style="display:none">
      <MessageFormSimple title="Пригласить на тендер" @closeForm="closeForm" showCloseBtn="true"></MessageFormSimple>
    </div>
    <div class="brc-message-arise__wrapper" id="btnQuestionPopupForm" style="display:none">
      <MessageFormSimple title="Задать вопрос эксперту" @closeForm="closeForm" showCloseBtn="true"></MessageFormSimple>
    </div>
    <div class="brc-message-arise__wrapper" id="btnRequestServicePopupForm" style="display:none">
      <MessageForm title="Отправить заказ" @closeForm="closeForm" showCloseBtn="true"></MessageForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import MessageForm from '@/components/public/MessageForm.vue'
import MessageFormSimple from '@/components/public/MessageFormSimple.vue'

@Component({
  components: {
    MessageForm,
    MessageFormSimple
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

    const reqServiceFormElement = document.getElementById('btnRequestServicePopupForm')
    if (reqServiceFormElement) {
      reqServiceFormElement.addEventListener('click', (e) => {

        const parentNode = (e.target as HTMLElement).parentNode;

        if (!!parentNode && (parentNode as HTMLElement).className !== 'brc-buscet_wrapper') {
          if (!reqServiceFormElement.children[0].contains(e.target as HTMLElement)) {
            reqServiceFormElement.setAttribute('style', 'display:none')
          }
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

    const reqServiceFormElement = document.getElementById('btnRequestServicePopupForm')
    if (reqServiceFormElement) {
      reqServiceFormElement.setAttribute('style', 'display:none')
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-message-arise__outer {
  z-index: 3000;
}

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
  //  overflow: scroll;

  > .brc-feedback,
  .brc-feedback_busket {
    background-color: white;
    h2,
    h3 {
      text-align: center !important;
    }
    position: relative;
  }

  .brc-message-arise__close {
    // float: right;
    // margin-top: -30px;
    font-size: 36px;
    color: lightgray;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 20px;
  }
}

@media (max-width: 768px) {
  .brc-message-arise__wrapper {
    .brc-feedback {
      max-height: calc(100vh - 60px);
      overflow: scroll;
      margin: 0 auto !important;
      padding: 0px;
      padding-top: 10px;
      padding-bottom: 10px;

      textarea {
        height: 120px;
      }
      input {
        height: 32px !important;
        margin-top: 2px;
        margin-bottom: 10px;
      }
      button {
        height: 42px;
      }
      .brc-input-addon {
        padding-top: 6px !important;
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