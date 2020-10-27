<template>
  <div v-if="isUserNotVerified && isAuthenticated" class="brc-activate-message">
    <div class="brc-activate-header">
      <i class="fas fa-exclamation-triangle"></i>
      <span>Адрес электронной почты не&nbsp;подтвержден</span>
    </div>
    <div class="brc-activate-text" v-html="nonAuthMessage.temp"></div>
    <div class="brc-activate-footer">
      <a href="#" @click="sentVerificationMail">Отправить письмо повторно</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { NonAuthMessage } from '@/models/user/NonAuthMessage.ts'
import { getModule } from 'vuex-module-decorators'
import { ServiceRegistry } from '@/ServiceRegistry'
import { AuthService } from '@/services/AuthService'

@Component
export default class ActivateAccauntNotice extends Vue {
  private authStore = getModule(AuthStore, this.$store)
  private nonAuthMessage = NonAuthMessage

  private get isUserNotVerified () {
    return ServiceRegistry.instance.getService(AuthService).isUserAuthorized()
  }

  private get isAuthenticated () {
    return this.authStore.isAuthenticated
  }

  private async sentVerificationMail () {
    await ServiceRegistry.instance.getService(AuthService).sendConfirmRegEmail()
  }
}
</script>
