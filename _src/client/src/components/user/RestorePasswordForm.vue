<template>
  <div class="brc-login-form__container">
    <div class="brc-login-form__wrapper login-container">
      <div class="brc-footer-logo__wrapper login-logo">
        <nuxt-link :to="{ name: 'main' }" class="brc-footer-logo">
          <img src="/images/logo.png" alt="Экосеть" />
        </nuxt-link>
      </div>
      <div class="login-hr"></div>
      <h1 class="login-header">Восстановление пароля</h1>
      <form
        id="user-form"
        ref="user"
        class="brc-login-form logon-form"
        name="user"
        label-width="120px"
        @submit="restorePassword()"
      >
        <div class="brc-login-form__block">
          <label>Email</label>
          <input
            v-model.lazy="email"
            name="Email"
            class="login-input"
            placeholder="Email"
          />
        </div>
        <div class="restore-pass-descr">
          <span>
            Для восстановления пароля, необходимо указать email, на него будет
            отправлен новый временный пароль
          </span>
        </div>
        <div class="not-sending-mail">
          <span>Не пришло письмо?</span>

          <nuxt-link
            :to="{ name: 'auth-restore' }"
            class="logon-restore send-mail-resore"
          >
            Отправить письмо повторно
          </nuxt-link>
        </div>
        <span v-if="!!errorMessage" class="logon-error">{{
          errorMessage
        }}</span>

        <div
          class="brc-login-form__submit login-button"
          @click="restorePassword()"
        >
          Отправить
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ServiceRegistry } from '@/ServiceRegistry'
import { AuthService } from '@/services/AuthService'
import { ResetPasswordStatus } from '@/models/user/ResetPasswordResult'

@Component
export default class RestorePasswordForm extends Vue {

  private email = ''
  private errorMessage: string | null = null

  private async restorePassword () {
    const result = await ServiceRegistry.instance.getService(AuthService).resetPassword(this.email)
    if (result.resetPasswordStatus !== ResetPasswordStatus.OK) {
      this.errorMessage = result.message
    }
  }
}
</script>

<style lang="scss">
.not-sending-mail {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.send-mail-resore {
  margin-left: 16px;
}

.restore-pass-descr {
  margin: 32px auto;
  font-size: 20px;
  font-weight: 500;
}
</style>
