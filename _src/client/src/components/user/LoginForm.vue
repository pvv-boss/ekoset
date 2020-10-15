<template>
  <div class="brc-login-form__container">
    <div class="brc-main-container__header">
      <h2>{{ mode === 'login' ? 'Вход' : 'Регистрация' }}</h2>
      <h4 v-if="validateMessage" class="error-message">{{ validateMessage }}</h4>
      <h4
        v-else-if="logonResult.logonStatus !== logonStatus.OK && logonResult.logonStatus !== logonStatus.UserNotFoundButSocialNetworkAuthOK"
        class="error-message"
      >{{ errorMessage }}</h4>
    </div>

    <div class="brc-login-form__wrapper">
      <form
        id="user-form"
        ref="user"
        class="brc-login-form"
        name="user"
        label-width="120px"
        @submit="mode === 'login' ? processLocalAuthAction() : processLocalAuthAction()"
      >
        <div v-if="isBrowser" class="brc-login-form__block">
          <label>Email</label>
          <input
            v-model.lazy="loginData.useremail"
            type="email"
            name="userName"
            placeholder="Email"
          />
          <span
            v-if="(isSubmit || loginData.useremail.length > 0) && $v.loginData.useremail.$invalid"
            class="error-message"
          >{{invalidEmail}}</span>
        </div>
        <div v-if="isBrowser" class="brc-login-form__block">
          <label>Пароль</label>
          <input
            v-model.lazy="loginData.password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="off"
            @keyup.enter="mode === 'login' ? processLocalAuthAction() : processLocalAuthAction()"
          />
          <span
            v-if="(isSubmit || loginData.password.length > 0) && $v.loginData.password.$invalid"
            class="error-message"
          >{{invalidPassword}}</span>
        </div>

        <div class="brc-login-form__submit">
          <button
            type="button"
            class="brc-login-form__submit-btn"
            @click="mode === 'login' ? processLocalAuthAction():processLocalAuthAction()"
          >{{ mode === 'login' ? 'Войти' : 'Зарегистрироваться' }}</button>
        </div>
      </form>
    </div>
    <div class="brc-login-form__additional"></div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginData from '@/models/user/LoginData'
import PassportStrategyDescriptor from '@/models/user/PassportStrategyDescriptor'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'
import { LogonStatus } from '@/models/user/LogonResult'
import { emailTest, passwordStrenghtTest, invalidEmailMessage, invalidPasswordMessage } from '@/utils/Validators'
import { Validation } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

@Component({
  validations: {
    loginData: {
      useremail: {
        required,
        validFormat: (val) => emailTest.test(val)
      },
      password: {
        required,
        validFormat: (val) => passwordStrenghtTest.test(val)
      }
    }
  }
})
export default class LoginForm extends Vue {
  private userStore = getModule(AuthStore, this.$store)
  @Prop()
  private status

  @Prop(String)
  private mode

  private loginData: LoginData = new LoginData()
  private logonStatus = LogonStatus
  private isBrowser = false
  private isSubmit = false

  private invalidEmail = invalidEmailMessage
  private invalidPassword = invalidPasswordMessage

  private get passportStrategyDescriptorList () {
    return this.userStore.passportStrategyDescriptorList
  }

  private sessionUser = this.userStore.sessionUser
  private tempSocialUser = this.userStore.tempSocialUser
  private registrationResult = this.userStore.registrationResult
  private logonResult = this.userStore.logonResult

  private validateMessage = ''

  private get errorMessage () {
    return this.mode === 'login' ? this.logonResult && this.logonResult.message ? this.logonResult.message : '' : this.registrationResult && this.registrationResult.message ? this.registrationResult.message : ''
  }

  private validateForm (): boolean {
    this.isSubmit = true
    return this.$v.loginData.useremail && this.$v.loginData.password ? !this.$v.loginData.useremail.$invalid && !this.$v.loginData.password.$invalid : false
  }

  private processLocalAuthAction () {
    if (this.validateForm()) {
      const userForm = window.document.getElementById('user-form') as HTMLFormElement
      if (userForm) {
        Array.from(userForm.getElementsByTagName('input')).forEach((item) => {
          item.setAttribute('disabled', 'disabled')
        })
      }
      this.userStore.startLogin({ authType: PassportStrategyDescriptor.LOCAL, loginData: this.loginData })
    }
  }


  private mounted () {
    this.isBrowser = true
  }
}
</script>
