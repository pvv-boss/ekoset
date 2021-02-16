<template>
  <div v-if="!!myManager" class="brc-feedback">
    <h2 class="my-manager-contacts__main__h2">Персональный менеджер</h2>
    <form class="brc-message-form my-manager-wrapper">
      <div class="brc-message-form__desktop">
        <div class="my-manager-contacts">
          <div class="my-manager-contacts__foto">
            <img :src="`/img/managers/${myManager.managerId}`" onerror="this.onerror=null; this.src='/img/empty-image.png'" />
          </div>
          <div class="my-manager-contacts__main">
            <span class="my-manager-contacts__main__capt">Персональный менеджер</span>
            <span class="my-manager-contacts__main__name">{{ myManager.managerName }}</span>
            <span class="my-manager-contacts__main__phone">{{ managerPhoneNumber() }}</span>
            <span class="my-manager-contacts__main__mail"
              ><a :href="`mailto:${myManager.managerEmail}`">{{ myManager.managerEmail }}</a></span
            >
          </div>
        </div>
        <div class="my-manager-form">
          <div class="brc-message-form__data">
            <div class="brc-message-form__row">
              <div class="brc-message-form__block brc-message-form__block_message">
                <textarea v-model.lazy="formMessageData.userRequestText" placeholder="Ваше сообщение"></textarea>
                <span
                  class="brc-error-message"
                  :class="{
                    'brc-error-message_visible': isSubmit && formMessageData.userRequestText.trim().length === 0,
                  }"
                  >Напишите сообщение</span
                >
              </div>
            </div>
          </div>

          <div class="brc-message-form__button my-manager-form__attach_wrapper">
            <label class="attach-file my-manager-form__attach">
              <input id="file" ref="file" type="file" multiple name="file" @change="handleFileUpload()" />
              <div class="file-name">Прикрепить файл(ы)</div>
              <div v-show="!!files && files.length > 0" class="attached-file-name">
                {{ fileNames }}
              </div>
            </label>
            <button disable class="button my-manager-form__button" @click="sendMessage">Отправить сообщение</button>
          </div>
        </div>
      </div>

      <div class="brc-message-form__mobile">
        <div class="my-manager-contacts__mheader">
          <div class="my-manager-contacts__foto">
            <img :src="`/img/managers/${myManager.managerId}`" onerror="this.onerror=null; this.src='/img/empty-image.png'" />
          </div>
          <div class="my-manager-contacts__main">
            <span class="my-manager-contacts__main__capt">Персональный менеджер</span>
            <span class="my-manager-contacts__main__name" style="font-size: 1.3rem">{{ myManager.managerName }}</span>
          </div>
        </div>
        <div>
          <div class="my-manager-contacts__main__capt">Телефон</div>
          <span class="my-manager-contacts__main__phone" style="font-size: 1.3rem">{{ managerPhoneNumber() }}</span>
          <div class="my-manager-contacts__main__capt" style="margin-top: 16px">Электронная почта</div>
          <span class="my-manager-contacts__main__mail"
            ><a :href="`mailto:${myManager.managerEmail}`">{{ myManager.managerEmail }}</a></span
          >
        </div>

        <div class="my-manager-form" style="margin-top: 24px">
          <div class="my-manager-contacts__main__capt">Сообщение</div>
          <div class="brc-message-form__data">
            <div class="brc-message-form__row" style="margin: 0px">
              <div class="brc-message-form__block brc-message-form__block_message">
                <textarea v-model.lazy="formMessageData.userRequestText" placeholder="Ваше сообщение"></textarea>
                <span
                  class="brc-error-message"
                  :class="{
                    'brc-error-message_visible': isSubmit && formMessageData.userRequestText.trim().length === 0,
                  }"
                  >Напишите сообщение</span
                >
              </div>
            </div>
          </div>

          <div class="brc-message-form__button my-manager-form__attach_wrapper" style="margin-top: 24px">
            <button disable class="button my-manager-form__button" style="width: 50%" @click="sendMessage">Отправить</button>
            <label class="attach-file my-manager-form__attach">
              <input id="file" ref="file" type="file" multiple name="file" @change="handleFileUpload()" />
              <div class="file-name">Прикрепить файл(ы)</div>
            </label>
          </div>
          <div v-show="!!files && files.length > 0" class="attached-file-name" style="font-size: 14px; margin-top: 12px">
            {{ fileNames }}
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, getModule } from "nuxt-property-decorator";
import { required } from "vuelidate/lib/validators";
import UserRequest from "@/models/ekoset/UserRequest";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";
import { ServiceRegistry } from "@/ServiceRegistry";
import PublicEkosetService from "@/services/PublicEkosetService";
import AuthStore from "@/store/AuthStore";
import EkosetClient from "@/models/EkosetClient";

import { formatPhoneNumber } from "@/utils/InputMaskDefinitions";

@Component({
  validations: {
    formMessageData: {
      userRequestText: {
        required,
      },
    },
  },
})
export default class MyManager extends Vue {
  public $refs!: {
    file: HTMLFormElement;
  };

  private files: any[] = [];
  private fileNames = "";
  private formMessageData: UserRequest = new UserRequest();
  @Prop()
  private title;

  @Prop()
  private mode;

  @Prop({ default: false })
  private showCloseBtn;

  private isBrowser = false;
  private isSubmit = false;
  private handleFileUpload() {
    this.files = this.$refs.file.files;
    this.updateFileNames();
  }

  private get myManager(): EkosetClient | null {
    return getModule(AuthStore, this.$store).ekosetClient;
  }

  private managerPhoneNumber() {
    return !!this.myManager ? formatPhoneNumber(this.myManager.managerPhone) : "";
  }

  private mounted() {
    this.isBrowser = true;
  }

  private validateForm(): boolean {
    this.isSubmit = true;
    return this.formMessageData.userRequestText?.trim().length > 0;
  }

  private async sendMessage() {
    if (this.validateForm()) {
      const formData: FormData = new FormData();
      formData.append("formMessageData", JSON.stringify(this.formMessageData));
      for (const iterItem of this.files) {
        formData.append("files", iterItem);
      }
      ServiceRegistry.instance.getService(PublicEkosetService).sendMessageToManager(formData);
      if (this.showCloseBtn) {
        this.$emit("closeForm");
      }
      this.isSubmit = false;
      this.formMessageData = new UserRequest();
      this.files = [];
    } else {
      this.$BrcNotification(BrcDialogType.Error, "Внимание !", `Заполните все поля правильно`);
    }
  }

  private updateFileNames() {
    const names: string[] = [];
    for (const iterItem of this.files) {
      names.push(iterItem.name as string);
    }
    this.fileNames = names.join(", ");
  }
}
</script>

<style lang="scss">
.my-manager-contacts__main__h2 {
  text-align: center !important;
  @media (max-width: 768px) {
    display: none;
  }
}

.brc-message-form__desktop {
  @media (max-width: 768px) {
    display: none;
  }
  display: flex;
  flex-direction: row;
  margin-top: 16px;
}

.brc-message-form__mobile {
  margin: 16px;
  margin-top: -10px;
  @media (min-width: 768px) {
    display: none;
  }
}

.my-manager-contacts__mheader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.my-manager-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .my-manager-contacts,
  .my-manager-form {
    flex-grow: 1;
  }

  .my-manager-contacts {
    display: flex;
    flex-direction: row;
    margin-left: 30px;
  }

  .my-manager-contacts__foto {
    width: 33%;
    margin-right: 16px;
  }

  .my-manager-contacts__main {
    display: flex;
    flex-direction: column;
  }

  .my-manager-contacts__main__capt {
    font-size: 0.9rem;
    color: $text-muted;
  }

  .my-manager-contacts__main__name {
    font-size: 1.5rem;
    font-weight: 500;
  }

  .my-manager-contacts__main__phone {
    font-weight: 500;
    font-size: 1.5rem;
  }

  .my-manager-contacts__main__mail {
    a {
      border-bottom: 1px dotted rgba(255, 13, 41, 0.25);
      color: #ed0205;
      letter-spacing: -0.2px;
    }
  }

  .my-manager-contacts__main__name,
  .my-manager-contacts__main__mail,
  .my-manager-contacts__main__phone {
    margin-top: 8px;
  }

  .my-manager-form__attach_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .my-manager-form__attach {
    align-items: left !important;
  }

  .my-manager-form__button {
    margin: 0px !important;
    margin-right: 15px !important;

    border: 1px solid red;
    background-color: red;
    color: white;
    text-decoration: none;
    width: 200px;
    max-width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-size: 16px;
    margin-top: 10px;
  }
}
</style>
