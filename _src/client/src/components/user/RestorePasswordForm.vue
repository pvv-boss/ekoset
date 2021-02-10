<template>
  <div class="brc-login-form__container">
    <div class="brc-login-form__wrapper login-container">
      <div class="brc-footer-logo__wrapper login-logo">
        <nuxt-link :to="{ name: 'main' }" class="brc-footer-logo">
          <img src="~/assets/images/logo.png" alt="Экосеть" />
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
        @submit.prevent="restorePassword"
      >
        <div class="brc-login-form__block">
          <label>Email</label>
          <input v-model.lazy="email" name="Email" class="login-input" placeholder="Email" />
          <span v-if="!!errorMessage" class="logon-error">{{ errorMessage }}</span>
        </div>
        <div class="restore-pass-descr">
          <span> Для восстановления пароля, необходимо указать email, на него будет отправлен новый временный пароль </span>
        </div>
        <div class="not-sending-mail">
          <span>Не пришло письмо?</span>

          <div class="logon-restore send-mail-resore" @click="restorePassword()">Отправить письмо повторно</div>
        </div>

        <button :disabled="submitPending" class="brc-login-form__submit login-button" type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { ServiceRegistry } from "@/ServiceRegistry";
import { AuthService } from "@/services/AuthService";
import { ResetPasswordStatus } from "@/models/user/ResetPasswordResult";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";
import { BrcDialogPosition } from "@/plugins/brc-dialog/BrcDialogPosition";
import BrcDialogPlugin from "@/plugins/brc-dialog/brc-dialog";

@Component
export default class RestorePasswordForm extends Vue {
  private email = "";
  private errorMessage: string | null = null;
  private submitPending = false;

  private async restorePassword() {
    this.submitPending = true;

    if (this.validateData()) {
      const result = await ServiceRegistry.instance.getService(AuthService).resetPassword(this.email);
      if (result.status !== ResetPasswordStatus.OK) {
        BrcDialogPlugin.showNotify(BrcDialogType.Info, "Сброс пароля", result.message, 2500, {
          position: BrcDialogPosition.Central,
        });
        this.$router.push({ name: "main" });
      } else {
        this.errorMessage = result.message;
      }
    }
    this.submitPending = false;
    this.email = "";
  }

  private validateData() {
    this.errorMessage = "";
    let ok = true;
    if (this.email.trim().length < 1) {
      this.errorMessage = "Укажите email !";
      ok = false;
    }
    return ok;
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
  color: $link-color;
  cursor: pointer;
}

.restore-pass-descr {
  margin: 18px auto;
  font-size: 20px;
  font-weight: 500;
}
</style>
