<template>
  <section class="brc-body">
    <div class="brc-login-form__container">
      <div class="brc-main-container__header">
        <h2>Смена пароля</h2>
        <h4 v-if="validateMessage" class="error-message">
          {{ validateMessage }}
        </h4>
        <h4
          v-if="
            changePasswordResult &&
            changePasswordResult.endProcess &&
            changePasswordResult.status !== changePasswordResult.OK
          "
          class="error-message"
        >
          {{ errorMessage }}
        </h4>
      </div>
      <form
        id="user-form"
        ref="user"
        class="brc-login-form"
        name="user"
        label-width="120px"
        @submit="changePassword"
      >
        <div
          v-if="mode === 'change' && isBrowser"
          class="brc-login-form__block"
        >
          <label>Старый пароль</label>
          <input
            v-model.lazy="oldpassword"
            type="password"
            name="oldpassword"
            placeholder="Пароль"
            autocomplete="off"
          />
          <span
            v-if="
              (isSubmit || oldpassword.length > 0) && $v.oldpassword.$invalid
            "
            class="error-message"
            >{{ invalidPassword }}</span
          >
        </div>
        <div v-if="isBrowser" class="brc-login-form__block">
          <label>Новый пароль</label>
          <input
            v-model.lazy="password"
            type="password"
            name="password"
            placeholder="Пароль"
            autocomplete="off"
            @keyup.enter.native="changePassword"
          />
          <span
            v-if="(isSubmit || password.length > 0) && $v.password.$invalid"
            class="error-message"
            >{{ invalidPassword }}</span
          >
        </div>
        <div v-if="mode === 'change'">
          <nuxt-link :to="{ name: 'auth-restore' }">Сбросить пароль</nuxt-link>
        </div>
        <div class="brc-login-form__submit">
          <button
            type="button"
            class="brc-login-form__submit-btn"
            @click="changePassword"
          >
            Сохранить
          </button>
        </div>
      </form>
      <div class="brc-login-form__additional"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'
import { passwordStrenghtTest, invalidPasswordMessage } from '@/utils/Validators'
import { required } from 'vuelidate/lib/validators'
import { AuthService } from '@/services/AuthService'
import { ServiceRegistry } from '@/ServiceRegistry'

@Component({
  validations: {
    oldpassword: {
      required,
      validFormat: (val) => passwordStrenghtTest.test(val)
    },
    password: {
      required,
      validFormat: (val) => passwordStrenghtTest.test(val)
    }
  }
})
export default class ChangePasswordForm extends Vue {
  @Prop(String)
  private mode

  private userStore = getModule(AuthStore, this.$store)
  private oldpassword = ''
  private password = ''
  private validateMessage = ''
  private isBrowser = false
  private isSubmit = false
  private invalidPassword = invalidPasswordMessage

  private validatePassword (): boolean {
    this.isSubmit = true
    if (this.mode === 'reset') {
      return this.$v.password && !this.$v.password.$invalid
    } else {
      return this.$v.password && this.$v.oldpassword ? !this.$v.password.$invalid && !this.$v.oldpassword.$invalid : false
    }
  }

  private async changePassword () {
    if (this.validatePassword()) {
      const userForm = document.getElementById('user-form') as HTMLFormElement
      if (userForm) {
        Array.from(userForm.getElementsByTagName('input')).forEach((item) => {
          item.setAttribute('disabled', 'disabled')
        })
      }
      ServiceRegistry.instance.getService(AuthService).changePassword(this.password)
    }
  }

  private mounted () {
    this.isBrowser = true
  }
}
</script>
