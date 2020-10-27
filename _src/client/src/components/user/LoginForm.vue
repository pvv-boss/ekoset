<template>
  <div class="brc-login-form__container">
    <div class="brc-login-form__wrapper login-container">
      <div class="brc-footer-logo__wrapper login-logo">
        <nuxt-link :to="{ name: 'main' }" class="brc-footer-logo">
          <img src="/images/logo.png" alt="Экосеть" />
        </nuxt-link>
      </div>
      <div class="login-hr"></div>
      <h1 class="login-header">Авторизация</h1>
      <form
        id="user-form"
        ref="user"
        class="brc-login-form logon-form"
        name="user"
        label-width="120px"
        @submit="processLocalAuthAction()"
      >
        <div class="brc-login-form__block">
          <label>Логин</label>
          <input
            v-model.lazy="loginData.login"
            name="login"
            class="login-input"
            placeholder="Логин"
          />
        </div>
        <div class="brc-login-form__block">
          <label>Пароль</label>
          <input
            v-model.lazy="loginData.password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="off"
            class="login-input"
            @keyup.enter="processLocalAuthAction()"
          />
        </div>
        <nuxt-link :to="{ name: 'auth-restore' }" class="logon-restore">
          Забыли пароль ?
        </nuxt-link>

        <div>
          <input id="cb1" type="checkbox" />
          <label for="cb1">Запомнить меня</label>
        </div>
        <span v-if="!!errorMessage" class="logon-error">{{
          errorMessage
        }}</span>

        <div
          class="brc-login-form__submit login-button"
          @click="processLocalAuthAction()"
        >
          Войти
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginData from '@/models/user/LoginData'
import { LogonStatus } from '@/models/user/LogonResult'
import { AuthService } from '@/services/AuthService'
import { ServiceRegistry } from '@/ServiceRegistry'

@Component
export default class LoginForm extends Vue {

  @Prop()
  private status

  @Prop(String)
  private mode

  private loginData: LoginData = new LoginData()
  private logonStatus = LogonStatus
  private errorMessage: string | null = null

  private async processLocalAuthAction () {
    this.errorMessage = ''
    // const result = await ServiceRegistry.instance.getService(AuthService).register(this.loginData)
    const result = await ServiceRegistry.instance.getService(AuthService).loginByPassword(this.loginData)
    if (result.logonStatus === LogonStatus.OK) {
      this.$router.push({ name: "main" })
    } else {
      this.errorMessage = result.message
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.logon-form {
  display: flex;
  flex-direction: column;
}

.login-hr {
  padding: 10px;
  height: 10px;
  border-bottom: 1px solid lightgray;

  display: none;
  @media (min-height: 760px) {
    display: block;
  }
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

.login-header {
  margin-left: auto !important;
  margin-right: auto !important;
  margin-top: 20px;
  margin-bottom: 16px;
}

.login-input {
  padding: 10px !important;
  font-size: 16px !important;
}

.logon-restore {
  font-size: 14px;
  display: block;
  border-bottom: 1px dotted $link-color;
  align-self: flex-end;
}

.login-button {
  margin-left: auto !important;
  margin-right: auto !important;
  cursor: pointer;
}

.logon-error {
  color: $red;
  margin-top: 16px;
  font-size: 15px;
}

.login-container {
  input[type="checkbox"]:checked,
  input[type="checkbox"]:not(:checked),
  input[type="radio"]:checked,
  input[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  input[type="checkbox"]:checked + label,
  input[type="checkbox"]:not(:checked) + label,
  input[type="radio"]:checked + label,
  input[type="radio"]:not(:checked) + label {
    display: inline-block;
    position: relative;
    padding-left: 32px;
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label:before,
  input[type="checkbox"]:not(:checked) + label:before,
  input[type="radio"]:checked + label:before,
  input[type="radio"]:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    border: 1px solid #b2b2b2;
    background-color: #ffffff;
  }

  input[type="checkbox"]:checked + label:before,
  input[type="checkbox"]:not(:checked) + label:before {
    border-radius: 2px;
  }

  input[type="radio"]:checked + label:before,
  input[type="radio"]:not(:checked) + label:before {
    border-radius: 100%;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after,
  input[type="radio"]:checked + label:after,
  input[type="radio"]:not(:checked) + label:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="checkbox"]:not(:checked) + label:after {
    left: 3px;
    top: 4px;
    width: 20px;
    height: 10px;
    border-radius: 1px;
    border-left: 4px solid $red;
    border-bottom: 4px solid $red;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type="radio"]:checked + label:after,
  input[type="radio"]:not(:checked) + label:after {
    left: 5px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: $red;
  }

  input[type="checkbox"]:not(:checked) + label:after,
  input[type="radio"]:not(:checked) + label:after {
    opacity: 0;
  }

  input[type="checkbox"]:checked + label:after,
  input[type="radio"]:checked + label:after {
    opacity: 1;
  }
}
</style>

