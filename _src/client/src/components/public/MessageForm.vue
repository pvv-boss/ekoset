<template>
  <div class="brc-feedback">
    <div v-if="showCloseBtn" class="brc-message-arise__close" @click="$emit('closeForm')">&times;</div>
    <h3>{{title}}</h3>
    <form class="brc-message-form">
      <div class="brc-message-form__data">
        <div class="brc-message-form__row">
          <div class="brc-message-form__block">
            <label for="userName">Имя Фамилия</label>
            <input type="text" v-model.lazy="formMessageData.userName" />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': isSubmit && formMessageData.userName.trim().length === 0 }"
            >Введите имя</span>
          </div>
          <div class="brc-message-form__block" v-if="isBrowser">
            <label for="phone">Телефон</label>
            <span class="brc-input-addon">
              <span>+7</span>
            </span>
            <input
              type="tel"
              v-model.lazy="formMessageData.phone"
              name="phone"
              placeholder="(555) 555-5555"
              autocomplete="tel"
              maxlength="14"
              class="form-control form-control_phone"
              v-phone
              pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
              required
            />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': (isSubmit || formMessageData.phone.length > 0) && $v.formMessageData.phone.$invalid}"
            >Введите телефон в формате +7 (999) 999-9999</span>
          </div>
          <div class="brc-message-form__block" v-if="isBrowser">
            <label for="email">Email</label>
            <input type="email" v-model.lazy="formMessageData.email" />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': (isSubmit || formMessageData.email.length > 0) && $v.formMessageData.email.$invalid}"
            >Введите настоящий email</span>
          </div>
        </div>
        <div class="brc-message-form__row">
          <div class="brc-message-form__block brc-message-form__block_message">
            <label for="message">Комментарий</label>
            <textarea v-model.lazy="formMessageData.caption"></textarea>
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': isSubmit && formMessageData.caption.trim().length === 0}"
            >Напишите комментарий</span>
          </div>
        </div>
      </div>

      <div class="brc-message-form__button">
        <label class="attach-file">
          <input type="file" name="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          <span class="file-name">Прикрепить файл</span>
        </label>
        <div class="clearfix"></div>
        <button type="button" @click="sentMessage">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Validation } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { emailTest, phoneTest } from '@/utils/Validators'
import { getServiceContainer } from '@/api/ServiceContainer';
import FormMessageData from '@/models/ekoset/FormMessageData';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'

@Component({
  validations: {
    formMessageData: {
      email: {
        required,
        validFormat: (val) => {
          return emailTest.test(val);
        },
      },
      phone: {
        required,
        validFormat: (val) => phoneTest.test(val)
      },
      userName: {
        required
      },
      caption: {
        required
      }
    }
  }
})
export default class MessageForm extends Vue {
  public $refs!: {
    file: HTMLFormElement
  }

  private file = ''
  private formMessageData: FormMessageData = new FormMessageData()

  @Prop()
  private title

  @Prop({ default: false })
  private showCloseBtn

  private isBrowser = false
  private isSubmit = false

  // FIXME: Как-то криво
  private handleFileUpload () {
    this.file = this.$refs.file.files[0];
  }

  private mounted () {
    this.isBrowser = true
  }

  private validateForm (): boolean {
    this.isSubmit = true
    return !this.$v.$invalid && this.formMessageData.caption.trim().length > 0 && this.formMessageData.userName.trim().length > 0
  }

  private async sentMessage () {
    if (this.validateForm()) {
      const formData: FormData = new FormData()
      formData.append('formMessageData', JSON.stringify(this.formMessageData))
      formData.append('file', this.file)
      getServiceContainer().publicEkosetService.sendFormMessage(formData)

      this.$BrcNotification(BrcDialogType.Success, `Отправили сообщение`)
      if (this.showCloseBtn) {
        this.$emit('closeForm')
      }
    } else {
      this.$BrcNotification(BrcDialogType.Error, `Заполните все поля правильно`)
    }
  }

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.brc-feedback {
  border: 3px solid lightgrey;
  border-radius: 5px;
  padding: 30px 15px;
  max-width: 900px;
  margin: 60px auto 0;
}

.brc-message-form__data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .brc-message-form__row {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    justify-content: space-between;
    margin: 15px;
  }

  .brc-message-form__block {
    label {
      display: block;
    }
    textarea {
      width: 100%;
      height: 115px;
      margin: 0;
      background-color: #f4f4f5;
      border: 1px solid #d1d1d1;
      border-radius: 3px;
      padding: 15px;
      color: #000000;
      font-size: 14px;
      resize: none;
      outline: none;

      &:focus {
        background-color: white;
      }
    }

    input {
      width: 100%;
      height: 48px;
      margin: 0;
      background-color: #f4f4f5;
      border: 1px solid #d1d1d1;
      border-radius: 3px;
      padding-left: 15px;
      color: #000000;
      font-size: 16px;
      outline: none;

      &:focus {
        background-color: white;
      }

      &.form-control_phone {
        padding-left: 35px;
      }
    }

    .brc-input-addon {
      position: absolute;
      padding-top: 13px;
      padding-left: 15px;
    }

    &.brc-message-form__block_message {
      display: flex;
      flex-direction: column;
      height: 100%;

      textarea {
        flex-grow: 1;
      }
    }

    .brc-error-message {
      font-size: small;
      color: #ed0205;
      font-weight: $font-medium;
      visibility: hidden;

      &.brc-error-message_visible {
        visibility: visible;
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
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    margin: auto;
    font-size: 16px;

    &:hover {
      background-color: darkred;
      border-color: darkred;
      cursor: pointer;
    }
  }

  .attach-file {
    float: right !important;
    line-height: 40px !important;
    padding-right: 20px !important;
    position: relative !important;
    right: 0 !important;
    border: none !important;
    margin-bottom: 5px;

    input {
      display: none;
    }
    .file-name {
      font-size: 14px;
      color: gray;
      font-size: 12px;
      cursor: pointer;
      padding-right: 20px;
      background-image: url("/images/clip-icon.png");
      background-repeat: no-repeat;
      background-position: right;
      transition: 0.3s;
      border: none !important;
    }
  }
}
@media (max-width: 768px) {
  .brc-feedback {
    padding: 15px 0;
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
  .brc-message-form__button .attach-file {
    float: none;
    line-height: 50px;
    padding-right: 0;
    position: relative;
  }
}
</style>

