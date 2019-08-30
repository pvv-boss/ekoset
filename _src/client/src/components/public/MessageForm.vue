<template>
  <div class="brc-feedback">
    <h2>{{title}}</h2>
    <form class="brc-message-form">
      <div class="brc-message-form__data">
        <div class="brc-message-form__row">
          <div class="brc-message-form__block">
            <label for="fio">Имя Фамилия</label>
            <input type="text" id="fio" />
          </div>
          <div class="brc-message-form__block">
            <label for="phone">Телефон</label>
            <input type="text" id="phone" />
          </div>
          <div class="brc-message-form__block">
            <label for="email">Email</label>
            <input type="email" id="email" />
          </div>
        </div>
        <div class="brc-message-form__row">
          <div class="brc-message-form__block brc-message-form__block_message">
            <label for="message">Комментарий</label>
            <textarea id="message"></textarea>
          </div>
        </div>
      </div>

      <div class="brc-message-form__button">
        <button type="button">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MessageForm extends Vue {
  @Prop()
  private title
}
</script>

<style lang="scss">
.brc-feedback {
  border: 3px solid lightgrey;
  border-radius: 10px;
  padding: 30px 15px;
  max-width: 900px;
  margin: 0 auto 60px;
}
.brc-message-form__data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .brc-message-form__row {
    flex-grow: 1;
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
      margin: 0 0 15px;
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
      margin: 0 0 15px;
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
  }
}
.brc-message-form__button {
  width: 100%;
  text-align: center;
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
}
</style>

