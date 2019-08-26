<template>
  <div class="brc-feedback">
    <h4>{{title}}</h4>
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
  border: 1px solid gray;
}
.brc-message-form__data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .brc-message-form__row {
    flex-grow: 1;
    justify-content: space-between;
  }

  .brc-message-form__block {
    label {
      display: block;
    }
    input,
    textarea {
      width: 100%;
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
    background-color: red;
    color: white;
    border: 1px solid red;
  }
}
</style>

