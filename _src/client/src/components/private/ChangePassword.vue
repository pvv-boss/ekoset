<template>
  <div class="profile-main">
    <h3>Изменение пароля</h3>
    <form
      id="user-change-form"
      class="brc-login-form account-main-form"
      name="user-change-form"
      @submit.prevent="changePassword()"
    >
      <div class="brc-login-form__block">
        <label>Новый пароль</label>
        <input
          v-model.lazy="oldpassword"
          type="password"
          name="oldpassword"
          placeholder="Пароль"
          autocomplete="off"
          class="login-input"
        />
        <span v-if="invalidPassword" class="error-message">{{
          invalidPassword
        }}</span>
      </div>
      <div class="brc-login-form__block">
        <label>Повторите новый пароль</label>
        <input
          v-model.lazy="password"
          type="password"
          name="password"
          placeholder="Пароль"
          autocomplete="off"
          class="login-input"
        />
        <span v-if="validateMessage" class="error-message">{{
          validateMessage
        }}</span>
      </div>
      <button
        :disabled="submitPending"
        class="brc-change-pwd-form__submit"
        type="submit"
      >
        Изменить пароль
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { AuthService } from '@/services/AuthService'
import { ServiceRegistry } from '@/ServiceRegistry'
import { LogonResult, LogonStatus } from '@/models/user/LogonResult'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'

@Component
export default class ChangePassword extends Vue {

  private oldpassword = ''
  private password = ''
  private validateMessage = ''
  private invalidPassword = ''
  private submitPending = false

  private validatePassword (): boolean {
    this.validateMessage = ''
    this.invalidPassword = ''

    let ok = true
    if (!this.oldpassword || this.oldpassword.trim().length < 1) {
      this.invalidPassword = 'Укажите пароль'
      ok = false;
    }

    if (!this.password || this.password.trim().length < 1) {
      this.validateMessage = 'Укажите пароль'
      ok = false;
    }

    if (ok && this.oldpassword.trim() !== this.password.trim()) {
      this.validateMessage = 'Пароли не совпадают. Введите повторный пароль правильно'
      ok = false;
    }

    return ok
  }

  private async changePassword () {
    this.submitPending = true
    if (this.validatePassword()) {
      const result: LogonResult = await ServiceRegistry.instance.getService(AuthService).changePassword(this.password)

      let message = result.message
      if (result.logonStatus === LogonStatus.PasswordChanged) {
        message = 'Пароль успешно сменен'
      }
      BrcDialogPlugin.showNotify(BrcDialogType.Info, 'Смена пароля', message, 2500, { position: BrcDialogPosition.Central })
    }
    this.submitPending = false
  }
}
</script>

<style lang="scss">
.brc-change-pwd-form__submit {
  margin-top: 24px;
  border: 1px solid $red;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  color: $red;
  background-color: white;
  font-weight: 500 !important;
  padding: 10px;
  &:hover {
    background-color: red;
    color: white;
  }
}
</style>
