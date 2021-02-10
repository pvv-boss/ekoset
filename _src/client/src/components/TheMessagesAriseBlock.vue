<template>
  <div class="brc-message-arise__outer">
    <div id="btnOrderPopupForm" class="brc-message-arise__wrapper" style="display: none">
      <MessageFormSimple title="Пригласить на тендер" :mode="2" show-close-btn="true" @closeForm="closeForm"></MessageFormSimple>
    </div>
    <div id="btnQuestionPopupForm" class="brc-message-arise__wrapper" style="display: none">
      <MessageFormSimple
        title="Задать вопрос эксперту"
        :mode="1"
        show-close-btn="true"
        @closeForm="closeForm"
      ></MessageFormSimple>
    </div>
    <div id="btnRequestServicePopupForm" class="brc-message-arise__wrapper" style="display: none">
      <MessageForm title="Отправить заказ" :mode="0" show-close-btn="true" @closeForm="closeForm"></MessageForm>
      <MessageFormMobile title="Отправить заказ" :mode="0" show-close-btn="true" @closeForm="closeForm"></MessageFormMobile>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheMessagesAriseBlock extends Vue {
  private closeForm() {
    const orderFormElement = document.getElementById("btnOrderPopupForm");
    if (orderFormElement) {
      orderFormElement.setAttribute("style", "display:none");
    }

    const questionFormElement = document.getElementById("btnQuestionPopupForm");
    if (questionFormElement) {
      questionFormElement.setAttribute("style", "display:none");
    }

    const reqServiceFormElement = document.getElementById("btnRequestServicePopupForm");
    if (reqServiceFormElement) {
      reqServiceFormElement.setAttribute("style", "display:none");
    }
  }
}
</script>
