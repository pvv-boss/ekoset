<template>
  <div class=""></div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ServiceRegistry } from '@/ServiceRegistry'
import { AuthService } from '@/services/AuthService'
import { ResetPasswordResult, ResetPasswordStatus } from '@/models/user/ResetPasswordResult'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition'
import BrcDialogPlugin from '@/plugins/brc-dialog/brc-dialog'

@Component
export default class ConfirmResetPassworCallback extends Vue {

  @Prop()
  private code: string

  private message = 'Проверка кода сброса пароля'

  private async mounted () {

    let routeName = 'main'
    BrcDialogPlugin.showNotify(BrcDialogType.Info, 'Сброс пароля', this.message, 1500, { position: BrcDialogPosition.Central })

    if (!this.code) {
      this.message = 'Неверно указан код сброса пароля !'
    } else {
      const result: ResetPasswordResult = await ServiceRegistry.instance.getService(AuthService).confirmResetPasswordByCode(this.code)

      if (result?.status === ResetPasswordStatus.OK) {
        routeName = 'user-change-password'
      } else {
        BrcDialogPlugin.showNotify(BrcDialogType.Info, 'Сброс пароля', result.message, 1500, { position: BrcDialogPosition.Central })
      }
    }

    this.$router.push({ name: routeName })
  }
}
</script>
<style lang="scss">
.reset-password-callback {
  margin: auto;
  font-weight: 500;
  padding: 20px;
  border: 1px solid red;
  border-radius: 12px;
}
</style>