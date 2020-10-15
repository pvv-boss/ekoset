<template>
  <div class="brc-message-arise__outer">
    <div
      id="btnOrderPopupForm"
      class="brc-message-arise__wrapper"
      style="display: none"
    >
      <LazyMessageFormSimple
        title="Пригласить на тендер"
        :mode="2"
        show-close-btn="true"
        @closeForm="closeForm"
      ></LazyMessageFormSimple>
    </div>
    <div
      id="btnQuestionPopupForm"
      class="brc-message-arise__wrapper"
      style="display: none"
    >
      <LazyMessageFormSimple
        title="Задать вопрос эксперту"
        :mode="1"
        show-close-btn="true"
        @closeForm="closeForm"
      ></LazyMessageFormSimple>
    </div>
    <div
      id="btnRequestServicePopupForm"
      class="brc-message-arise__wrapper"
      style="display: none"
    >
      <LazyMessageForm
        title="Отправить заказ"
        :mode="0"
        show-close-btn="true"
        @closeForm="closeForm"
      ></LazyMessageForm>
      <LazyMessageFormMobile
        title="Отправить заказ"
        :mode="0"
        show-close-btn="true"
        @closeForm="closeForm"
      ></LazyMessageFormMobile>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component
export default class TheMessagesAriseBlock extends Vue {
  // private mounted () {
  //   const orderFormElement = document.getElementById('btnOrderPopupForm')
  //   if (orderFormElement) {
  //     orderFormElement.addEventListener('click', (e) => {
  //       if (!orderFormElement.children[0].contains(e.target as HTMLElement)) {
  //         orderFormElement.setAttribute('style', 'display:none')
  //       }
  //     })
  //   }

  //   const questionFormElement = document.getElementById('btnQuestionPopupForm')
  //   if (questionFormElement) {
  //     questionFormElement.addEventListener('click', (e) => {
  //       if (!questionFormElement.children[0].contains(e.target as HTMLElement)) {
  //         questionFormElement.setAttribute('style', 'display:none')
  //       }
  //     })
  //   }

  //   const reqServiceFormElement = document.getElementById('btnRequestServicePopupForm')
  //   if (reqServiceFormElement) {
  //     reqServiceFormElement.addEventListener('click', (e) => {

  //       const parentNode = (e.target as HTMLElement).parentNode;

  //       // tslint:disable-next-line:no-console
  //       console.log((parentNode as HTMLElement).className)

  //       // if (!!parentNode && (parentNode as HTMLElement).className !== 'brc-buscet_wrapper' && (parentNode as HTMLElement).className !== 'brc-feedback_busket_mobile') {
  //       if (!reqServiceFormElement.children[0].contains(e.target as HTMLElement)) {
  //         reqServiceFormElement.setAttribute('style', 'display:none')
  //       }
  //       //}
  //     })
  //   }
  // }

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
@import "@/styles/variables.scss";
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
  .brc-feedback_busket,
  .brc-feedback_busket_mobile {
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
    .brc-feedback,
    .brc-feedback_busket,
    .brc-feedback_busket_mobile {
      max-height: calc(100vh - 30px);
    }
  }
}
</style>