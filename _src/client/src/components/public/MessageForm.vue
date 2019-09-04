<template>
  <div class="brc-feedback">
    <h3>{{title}}</h3>
    <form class="brc-message-form">
      <div class="brc-message-form__data">
        <div class="brc-message-form__row">
          <div class="brc-message-form__block">
            <label for="name">Имя Фамилия</label>
            <input type="text" id="name" v-model.lazy="name" />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': isSubmit && name.length === 0 }"
            >Введите имя</span>
          </div>
          <div class="brc-message-form__block" v-if="isBrowser">
            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model.lazy="phone" />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': (isSubmit || phone.length > 0) && $v.phone.$invalid}"
            >Введите настоящий номер телефона</span>
          </div>
          <div class="brc-message-form__block" v-if="isBrowser">
            <label for="email">Email</label>
            <input type="email" id="email" v-model.lazy="email" />
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': (isSubmit || email.length > 0) && $v.email.$invalid}"
            >Введите настоящий email</span>
          </div>
        </div>
        <div class="brc-message-form__row">
          <div class="brc-message-form__block brc-message-form__block_message">
            <label for="message">Комментарий</label>
            <textarea id="message" v-model.lazy="message"></textarea>
            <span
              class="brc-error-message"
              :class="{'brc-error-message_visible': isSubmit && message.length === 0}"
            >Напишите комментарий</span>
          </div>
        </div>
      </div>

      <div class="brc-message-form__button">
        <label class="attach-file">
          <input type="file" name="name" value />
          <span class="file-name">Прикрепить файл</span>
        </label>
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

@Component({
  validations: {
    email: {
      required,
      validFormat: val => emailTest.test(val),
    },
    phone: {
      validFormat: val => phoneTest.test(val)
    },
    name: {
      required
    },
    message: {
      required
    }
  }
})
export default class MessageForm extends Vue {
  @Prop()
  private title

  private isBrowser = false
  private isSubmit = false
  private email = ''
  private phone = ''
  private message = ''
  private name = ''

  private mounted () {
    this.isBrowser = true
  }

  private validateForm (): boolean {
    this.isSubmit = true
    // return this.$v.name && this.$v.message && this.$v.email && this.$v.phone && this.$v.$invalid
    // if (this.mode === 'reset') {
    //   return this.$v.password && !this.$v.password.$invalid
    // } else {
    //   return this.$v.password && this.$v.oldpassword ? !this.$v.password.$invalid && !this.$v.oldpassword.$invalid : false
    // }
    console.debug(this.$v)
    return !this.$v.$invalid
  }

  private async sentMessage () {
    if (this.validateForm()) {
      alert('Отправили сообщение')
    }
  }
}
</script>

<style lang="scss">
.brc-feedback {
  border: 3px solid lightgrey;
  border-radius: 10px;
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
      font-weight: bold;
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
    float: right;
    line-height: 50px;
    padding-right: 20px;
    position: absolute;
    right: 0;

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
    }
  }
}
@media (max-width: 768px) {
  .brc-feedback {
    padding: 15px 0;
  }
}
</style>

