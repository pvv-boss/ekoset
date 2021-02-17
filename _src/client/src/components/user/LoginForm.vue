<template>
  <div class="brc-login-form__container red-inputs">
    <div class="brc-login-form__wrapper login-container">
      <!-- <div class="brc-footer-logo__wrapper login-logo">
        <nuxt-link :to="{ name: 'main' }" class="brc-footer-logo">
          <img src="~/assets/images/logo.png" alt="Экосеть" />
        </nuxt-link>
      </div>
      <div class="login-hr"></div> -->
      <h1 class="login-header">Авторизация</h1>
      <form
        id="user-form"
        class="brc-login-form logon-form"
        name="user"
        label-width="120px"
        @submit.prevent="processLocalAuthAction()"
      >
        <div class="brc-login-form__block">
          <label>Логин</label>
          <input v-model="loginData.login" name="login" class="login-input" placeholder="Логин" />
          <span v-if="!!errorLoginMessage" class="logon-error">{{ errorLoginMessage }}</span>
        </div>
        <div class="brc-login-form__block">
          <label>Пароль</label>
          <input
            v-model="loginData.password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="off"
            class="login-input"
          />
          <span v-if="!!errorPasswordMessage" class="logon-error">{{ errorPasswordMessage }}</span>
        </div>

        <span v-if="!!errorMessage" class="logon-error">{{ errorMessage }}</span>

        <nuxt-link :to="{ name: 'auth-restore' }" class="logon-restore"> Забыли пароль ? </nuxt-link>

        <div>
          <input id="cb1" v-model="loginData.rememberMe" type="checkbox" />
          <label for="cb1">Запомнить меня</label>
        </div>
        <button :disabled="submitPending" class="brc-login-form__submit login-button" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import LoginData from "@/models/user/LoginData";
import { LogonStatus } from "@/models/user/LogonResult";
import { AuthService } from "@/services/AuthService";
import { ServiceRegistry } from "@/ServiceRegistry";

@Component
export default class LoginForm extends Vue {
  @Prop()
  private status;

  @Prop(String)
  private mode;

  private loginData: LoginData = new LoginData();

  private errorLoginMessage: string | null = null;
  private errorPasswordMessage: string | null = null;
  private errorMessage: string | null = null;

  private submitPending = false;

  private async processLocalAuthAction() {
    this.submitPending = true;

    if (this.validateData()) {
      const result = await ServiceRegistry.instance.getService(AuthService).loginByPassword(this.loginData);
      if (result.logonStatus === LogonStatus.OK) {
        this.$router.push(this.routeNameAfterLogin);
      } else {
        this.errorMessage = result.message;
      }
    }

    this.loginData = new LoginData();
    this.submitPending = false;
  }

  private get routeNameAfterLogin() {
    return { name: ServiceRegistry.instance.getService(AuthService).isUserAdmin ? "admin" : "user-deals-contracts" };
  }

  private validateData() {
    this.errorLoginMessage = "";
    this.errorPasswordMessage = "";
    this.errorMessage = "";

    let ok = true;
    if (this.loginData.login.trim().length < 1) {
      this.errorLoginMessage = "Укажите логин !";
      ok = false;
    }
    if (ok && this.loginData.password.trim().length < 1) {
      this.errorPasswordMessage = "Укажите пароль !";
      ok = false;
    }
    return ok;
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
  padding: 8px !important;
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
  border: 1px !important;
  border-radius: 8px;
  font-weight: 500 !important;
}

.logon-error {
  color: $red;
  margin-top: 16px;
  font-size: 15px;
}
</style>
