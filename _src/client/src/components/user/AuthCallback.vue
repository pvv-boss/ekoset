<template>
  <section class="brc-body"></section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import Cookies from 'js-cookie'
import { getServiceContainer } from '@/api/ServiceContainer'
import SessionUser from '@/models/user/SessionUser'
import { RegistrationStatus } from '@/models/user/RegistrationResult'
import { LogonStatus, LogonResult } from '@/models/user/LogonResult'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'

@Component
export default class AuthCallback extends Vue {
  private userStore: AuthStore = getModule(AuthStore, this.$store)

  private get registrationResult () {
    return this.userStore.registrationResult
  }

  private get logonResult () {
    return this.userStore.logonResult
  }

  private get mode (): string {
    return this.$route.params.mode
  }

  @Watch('registrationResult', { immediate: true })
  private redirectAfterRegistration (registrationResult) {
    if (this.mode === 'registration' && registrationResult && registrationResult.endProcess === true) {
      const newLocation = registrationResult.registrationStatus === RegistrationStatus.OK ? { name: 'main' } : { name: 'auth-login', params: { mode: 'registration' } }
      this.$router.replace(newLocation)
    }
  }

  @Watch('logonResult', { immediate: true })
  private redirectAfterLogonResult (logonResult) {
    if (this.mode === 'login' && logonResult && logonResult.endProcess === true) {
      let newLocation = logonResult.logonStatus === LogonStatus.OK ? { name: 'main' } : { name: 'auth-login', params: { mode: 'login' } }
      if (logonResult.logonStatus === LogonStatus.ShouldChangePassword) {
        newLocation = { name: 'auth-change', params: { mode: 'reset' } }
      }
      this.$router.replace(newLocation)
    }
  }

  private async created () {
    if (this.mode === 'login') {
      await getServiceContainer().authService.loginFromCallback()
    }

    if (this.mode === 'logoff') {
      this.$router.replace({ name: 'main' })
    }
  }
}
</script>
