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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { NonAuthMessage } from '@/models/user/NonAuthMessage.ts'
import { getModule } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class ActivateAccauntNotice extends Vue {
  private authStore = getModule(AuthStore, this.$store)
  private nonAuthMessage = NonAuthMessage

  private get isUserNotVerified () {
    return this.authStore.isUserNotVerified
  }

  private get isAuthenticated () {
    return this.authStore.isAuthenticated
  }

  private async sentVerificationMail () {
    await getServiceContainer().authService.sendConfirmRegEmail()
  }
}
</script>
