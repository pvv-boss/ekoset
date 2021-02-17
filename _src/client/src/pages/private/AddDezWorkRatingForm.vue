<template>
  <div v-if="!!work && !!work.sheldServiceId" class="brc-login-form__container red-inputs">
    <div class="brc-login-form__wrapper login-container" style="margin: 16px">
      <!-- <div class="brc-footer-logo__wrapper login-logo">
        <nuxt-link :to="{ name: 'main' }" class="brc-footer-logo">
          <img src="~/assets/images/logo.png" alt="Экосеть" />
        </nuxt-link>
      </div> -->
      <h1 class="login-header" style="margin-top: 16px">Оцените работу мастера</h1>
      <div class="login-hr"></div>

      <form
        id="user-change-form"
        class="brc-login-form account-main-form"
        name="user-change-form"
        style="display: flex; flex-direction: column; margin-top: 16px"
        @submit.prevent="changeRating()"
      >
        <div class="deal_continin_form_text">
          <div class="deal_continin_form_contr">
            <div class="label_row">
              <label>Услуга:</label>
              <span class="">
                {{ work.sheldServiceName }}
              </span>
            </div>

            <div class="label_row">
              <label>Дата работ:</label>
              <span class="brc-deal-list__item_strong">
                {{ workDate() }}
              </span>
            </div>
            <br />

            <div class="label_row">
              <label>Договор №:</label>
              <span>{{ contractNmbWithDate }}</span>
            </div>

            <div class="label_row">
              <label>Адрес:</label>
              <span>{{ work.contractAddress }}</span>
            </div>
          </div>
          <div class="login-hr"></div>

          <div style="display: flex; align-items: center">
            <span>Ваша оценка:</span>
            <BaseRating
              v-model="work.sheldServiceBall"
              style="margin-left: 16px"
              star-font-size="42"
              :show-reviews="false"
            ></BaseRating>
          </div>

          <div class="brc-message-form__data">
            <div class="brc-message-form__row" style="margin: 0px !important">
              <div class="brc-message-form__block brc-message-form__block_message">
                <label for="message">Подробная информация о работе мастера:</label>
                <textarea v-model.lazy="work.sheldServiceBallDescription"></textarea>
                <span
                  class="brc-error-message"
                  :class="{
                    'brc-error-message_visible':
                      work.sheldServiceBall < 4 && work.sheldServiceBallDescription.trim().length === 0,
                  }"
                  >Напишите комментарий</span
                >
              </div>
            </div>
          </div>
        </div>

        <button class="brc-change-pwd-form__submit_form" type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import Work from "@/models/deal/Work";
import UserDealService from "@/services/UserDealService";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";

@Component
export default class AddDezWorkRatingForm extends Vue {
  @Prop()
  desWorkId;

  work: Work = new Work();

  get contractNmbWithDate() {
    return this.work.contractForm + " от " + new Date(this.work.contractDateStart).toLocaleDateString("ru-RU");
  }

  workDate() {
    return new Date(this.work.sheldServiceDate).toLocaleDateString("ru-RU");
  }

  async fetch() {
    this.work = await this.$serviceRegistry.getService(UserDealService).getDesworkById(this.desWorkId);
  }

  async changeRating() {
    if (this.work.sheldServiceBall < 4 && this.work.sheldServiceBallDescription.trim().length === 0) {
      this.$BrcNotification(BrcDialogType.Error, "Ошибка", `Напишите комментарий`);
    } else {
      this.$router.push({ name: "main" });
      await this.$serviceRegistry.getService(UserDealService).saveDeswork(this.work);
    }
  }
}
</script>

<style lang="scss">
.brc-change-pwd-form__submit_form {
  margin-top: 24px;
  border: 1px solid $red;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  color: white;
  background-color: $red;
  font-weight: 500 !important;
  padding: 10px 25px;

  margin-left: auto !important;
  margin-right: auto !important;
  cursor: pointer;
  border: 1px !important;
  border-radius: 8px;
  font-weight: 500 !important;
}

.login-hr {
  padding: 10px;
  height: 10px;
  border-bottom: 1px solid lightgray;
  display: block;
}

.login-logo {
  max-height: 50px;
  height: 50px;
  margin-left: auto !important;
  margin-right: auto !important;
  img {
    max-height: 50px;
    height: 50px;
  }

  display: none;
  @media (min-height: 760px) {
    display: block;
  }
}
</style>
