<template>
  <section>
    <MessageFormMobile v-if="!showCloseBtn" :title="title"></MessageFormMobile>

    <div class="brc-feedback_busket">
      <div v-if="showCloseBtn" class="brc-message-arise__close" @click="$emit('closeForm')">&times;</div>
      <h2 style="text-align: center !important;">{{title}}</h2>
      <form class="brc-message-form" :class="{'brc-message-form__error':!isValidForm}">
        <div class="brc-message-form__data">
          <div class="brc-message-form__row">
            <div class="brc-message-form__block">
              <label for="userName">Имя Фамилия</label>
              <input type="text" v-model.lazy="formMessageData.userRequestUser" />
              <span
                class="brc-error-message"
                :class="{'brc-error-message_visible': isSubmit && formMessageData.userRequestUser.trim().length === 0 }"
              >Введите имя</span>
            </div>
            <div class="brc-message-form__block" v-if="isBrowser">
              <label for="phone">Телефон</label>
              <span class="brc-input-addon">
                <span class="phone_add_seven">+7</span>
                <input
                  type="tel"
                  v-model.lazy="formMessageData.userRequestPhone"
                  name="phone"
                  placeholder="(555) 555-5555"
                  autocomplete="tel"
                  maxlength="14"
                  class="form-control form-control_phone"
                  v-phone
                  pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
                />
                <span
                  class="brc-error-message"
                  :class="{'brc-error-message_visible': (isSubmit || formMessageData.userRequestPhone.length > 0) && $v.formMessageData.userRequestPhone.$invalid}"
                >Введите телефон</span>
              </span>
            </div>
            <div class="brc-message-form__block" v-if="isBrowser">
              <label for="email">Email</label>
              <input type="email" v-model.lazy="formMessageData.userRequestMail" />
              <span
                class="brc-error-message"
                :class="{'brc-error-message_visible': (isSubmit || formMessageData.userRequestMail.length > 0) && $v.formMessageData.userRequestMail.$invalid}"
              >Введите настоящий email</span>
            </div>

            <div class="brc-message-form__block brc-message-form__block_message">
              <label for="message">Комментарий</label>
              <textarea v-model.lazy="formMessageData.userRequestText"></textarea>
              <span
                class="brc-error-message"
                :class="{'brc-error-message_visible': isSubmit && formMessageData.userRequestText.trim().length === 0}"
              >Напишите комментарий</span>
              <div class="brc-message-form__block">
                <label class="attach-file">
                  <input
                    type="file"
                    multiple
                    name="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  />
                  <div class="attach-file-file-name">Прикрепить файл(ы)</div>
                  <div v-show="!!files && files.length > 0" class="attached-file-name">{{fileNames}}</div>
                </label>
              </div>
            </div>
          </div>
          <div class="brc-message-form__row">
            <label>Корзина</label>
            <BuscetContaner :class="{'brc-message-form__error':!isValidForm}"></BuscetContaner>
          </div>
        </div>
      </form>
      <div class="brc-message-form__button">
        <button type="button" @click="sendMessage">Отправить</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { Validation } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { emailTest, phoneTest } from '@/utils/Validators'
import { getServiceContainer } from '@/api/ServiceContainer';
import UserRequest from '@/models/ekoset/UserRequest';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { getModule } from 'vuex-module-decorators';
import AppStore from '@/store/AppStore';
import BuscetStore from '@/store/BuscetStore';
import BuscetContaner from '@/components/public/BuscetContaner.vue'
import MessageFormMobile from '@/components/public/MessageFormMobile.vue'

@Component({
  components: {
    BuscetContaner,
    MessageFormMobile
  },
  validations: {
    formMessageData: {
      userRequestMail: {
        required,
        validFormat: (val) => {
          return emailTest.test(val);
        },
      },
      userRequestPhone: {
        required,
        validFormat: (val) => phoneTest.test(val)
      },
      userRequestUser: {
        required
      },
      userRequestText: {
        required
      }
    }
  }
})
export default class MessageForm extends Vue {
  public $refs!: {
    file: HTMLFormElement
  }

  private isValidForm = true
  private files: any[] = []
  private fileNames = ''
  private formMessageData: UserRequest = new UserRequest()

  @Prop()
  private title

  @Prop()
  private mode

  @Prop({ default: false })
  private showCloseBtn

  private isBrowser = false
  private isSubmit = false

  private handleFileUpload () {
    this.files = this.$refs.file.files;
    this.updateFileNames()
  }

  private mounted () {
    this.isBrowser = true
  }

  private validateForm (): boolean {
    this.isSubmit = true
    return !this.$v.$invalid && this.formMessageData.userRequestText.trim().length > 0 && this.formMessageData.userRequestUser.trim().length > 0
  }

  private async sendMessage () {
    if (this.validateForm()) {

      this.isValidForm = true
      this.formMessageData.userRequestService = getModule(BuscetStore, this.$store).addedServiceListAsText
      this.formMessageData.userRequestSection = getModule(AppStore, this.$store).currentSiteSectionName
      this.formMessageData.userRequestType = this.title

      const formData: FormData = new FormData()
      formData.append('formMessageData', JSON.stringify(this.formMessageData))

      for (const iterItem of this.files) {
        formData.append('files', iterItem)
      }

      getServiceContainer().publicEkosetService.sendFormMessage(formData, this.mode)

      if (this.showCloseBtn) {
        this.$emit('closeForm')
      }

      this.isSubmit = false
      this.formMessageData = new UserRequest()
      this.files = []
    } else {
      this.isValidForm = false
      this.$BrcNotification(BrcDialogType.Error, this.title, `Заполните все поля правильно`)
    }
  }

  private updateFileNames () {
    const names: string[] = []
    for (const iterItem of this.files) {
      names.push(iterItem.name as string)
    }
    this.fileNames = names.join(', ')
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-feedback_busket {
  @media (max-width: 768px) {
    display: none;
  }

  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 30px;
  max-width: 900px;
  margin: 60px auto 0;
  // height: 580 px;
  // max-height: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .brc-buscet_container {
    height: calc(100% - 65px);
    overflow-y: auto;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  h2,
  h3 {
    text-align: center !important;
  }

  .brc-message-form {
    max-height: 500px;
    height: min-content;
    margin-bottom: 15px;
    &.brc-message-form__error {
      // height: 500px;
    }
  }

  .brc-message-form__data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    overflow-y: hidden;

    .brc-message-form__row {
      height: 100%;
      max-height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
    }

    .brc-message-form__block + .brc-message-form__block {
      margin-top: 5px;
    }

    .brc-message-form__block {
      label {
        display: block;
        @media (max-width: 768px) {
          font-size: 14px;
        }
      }
      textarea {
        width: 100%;
        height: 120px;
        margin: 0;
        background-color: #f4f4f5;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding: 15px;
        color: #000000;
        font-size: 14px;
        // resize: none;
        outline: none;

        &:focus {
          background-color: white;
        }
      }

      input {
        width: 100%;
        height: 32px !important;
        background-color: #f4f4f5;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding-left: 15px;
        color: #000000;
        font-size: 16px;
        outline: none;
        margin-top: 2px;
        margin-bottom: 1px;

        &:focus {
          background-color: white;
        }

        &.form-control_phone {
          padding-left: 35px;
        }
      }

      .brc-input-addon {
        position: relative;
      }

      &.brc-message-form__block_message {
        display: flex !important;
        flex-grow: 1;
        height: auto !important;

        textarea {
          flex-grow: 1 !important;
        }
      }

      .brc-error-message {
        font-size: small;
        color: #ed0205;
        font-weight: $font-medium;
        display: none;

        &.brc-error-message_visible {
          display: block;
        }
      }
    }

    .attach-file {
      position: relative !important;
      border: none !important;
      display: flex;
      // align-items: flex-end;
      flex-direction: column;
      // margin-right: 15px;
      // margin-bottom: 5px;
      input {
        display: none;
      }
      .attach-file-file-name {
        color: gray;
        font-size: 12px;
        height: 32px;
        cursor: pointer;
        // padding-right: 20px;
        background-image: url('/images/clip-icon.png');
        background-repeat: no-repeat;
        background-position: top right;
        transition: 0.3s;
        border: none !important;
        margin-top: 10px;
        max-width: 13em !important;
        padding-left: 0 !important;
      }

      @media (max-width: 768px) {
        margin-bottom: 0px;
        align-items: center;
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 10px;
        padding-right: 10px;
      }

      .attached-file-name {
        font-size: 12px;
        word-wrap: break-word;
        word-break: break-word;
        height: 32px;
        // height: 100%;
        // text-align: right;
        @media (max-width: 768px) {
          text-align: left;
        }
      }
    }
  }

  .brc-message-form__button {
    width: 100%;
    text-align: center;
    position: relative;
    button {
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
      margin: auto;
      font-size: 16px;
      margin-top: 10px;

      &:hover {
        background-color: darkred;
        border-color: darkred;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 768px) {
    .brc-feedback {
      max-height: calc(100vh - 100px);
      margin: 0 auto !important;
      padding: 0px;
      padding-top: 10px;
      padding-bottom: 10px;
      overflow: scroll;

      textarea {
        height: 70px !important;
      }
      input {
        height: 30px !important;
      }
      button {
        height: 35px !important;
      }
      .brc-input-addon {
        padding-top: 6px !important;
      }
    }
    .brc-message-form__row {
      flex-basis: 100% !important;
      &:last-child {
        margin-top: 0;
      }
      &:first-child {
        margin-bottom: 0;
      }
    }
    .brc-message-form__row:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>

