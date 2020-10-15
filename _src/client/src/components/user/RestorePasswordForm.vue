<template>
  <section class="brc-body">
    <div class="brc-login-form__container">
      <form
        id="user-form"
        ref="user"
        class="brc-login-form"
        name="user"
        label-width="120px"
        @submit="restorePassword"
      >
        <div v-if="isBrowser" class="brc-login-form__block">
          <label>Email</label>
          <input v-model.lazy="email" type="email" name="userName" placeholder="Email">
          <span
            v-if="(isSubmit || email.length > 0) && $v.email.$invalid"
            class="error-message"
          >{{invalidEmail}}</span>
        </div>

        <div class="brc-login-form__submit">
          <button
            type="button"
            class="brc-login-form__submit-btn"
            @click="restorePassword"
          >Восстановить пароль</button>
        </div>
      </form>
      <div class="brc-login-form__switch-mode">
        <div>
          Еще нет аккаунта?
          <nuxt-link :to="{ name: 'auth-login', params: {mode: 'registration'} }">Зарегистрируйтесь</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'nuxt-property-decorator'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType.ts'
import SessionUser from '@/models/user/SessionUser'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'
import { Validation } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { emailTest, invalidEmailMessage } from '@/utils/Validators'

@Component(
  {
    validations: {
      email: {
        required,
        validFormat: (val) => emailTest.test(val)
      }
    }
  })
export default class RestorePasswordForm extends Vue {
  private user: SessionUser = SessionUser.anonymousUser
  private userStore = getModule(AuthStore, this.$store)
  private email = this.userStore.sessionUser.appUserId > 0 && this.userStore.sessionUser.appUserEmail !== 'Гость' ? this.userStore.sessionUser.appUserEmail : ''
  private isSubmit = false
  private isBrowser = false
  private invalidEmail = invalidEmailMessage

  private validateForm (): boolean {
    this.isSubmit = true
    return this.$v.email ? !this.$v.email.$invalid : false
  }

  private restorePassword () {
    if (this.validateForm()) {
      this.userStore.resetPassword(this.email)
    }
  }

  private mounted () {
    this.isBrowser = true
  }
}
</script>
