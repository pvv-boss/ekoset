<template>
  <div class="profile-main">
    <h3>Основная информация</h3>
    <span style="margin-top: 16px">Логин</span>
    <h3 style="margin: 16px 0 30px 0">{{ sessionUser.appUserName }}</h3>
    <form id="account-main-form" class="brc-login-form account-main-form">
      <div class="brc-login-form__block">
        <label>ФИО</label>
        <input
          v-model="sessionUser.userSnProfileEmail"
          placeholder="ФИО"
          class="login-input"
        />
        <span v-if="!!sessionUser.userSnProfileEmail" class="logon-error">
          Укажите фамилию,имя, отчество
        </span>
      </div>

      <div class="brc-login-form__block">
        <label>Телефон</label>
        <input
          v-model="sessionUser.userSnProfileEmail"
          placeholder="Телефон"
          class="login-input"
        />
        <span v-if="!!sessionUser.userSnProfileEmail" class="logon-error">
          Укажите телефон
        </span>
      </div>

      <div class="brc-login-form__block">
        <label>Дата рождения</label>
        <input
          v-model="sessionUser.userSnProfileEmail"
          placeholder="Дата рождения"
          class="login-input"
        />
        <span v-if="!!sessionUser.userSnProfileEmail" class="logon-error">
          Укажите дату рождения
        </span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import SessionUser from '@/models/user/SessionUser'
import { AuthService } from '@/services/AuthService'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AccountMain extends Vue {

  private get sessionUser (): SessionUser {
    return this.$serviceRegistry.getService(AuthService).getSessionUser()
  }

  private head () {
    return { title: 'Профиль пользователя' }
  }
}
</script>

<style lang="scss">
.profile-main {
  display: flex;
  flex-direction: column;
}

.account-main-form {
  display: flex;
  flex-direction: column;
}
</style>
