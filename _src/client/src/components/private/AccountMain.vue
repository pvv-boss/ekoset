<template>
  <div class="profile-main">
    <h3>Основная информация</h3>
    <div class="main-pof-blick">
      <span>Логин:</span>
      <h3 style="margin-left: 16px">{{ ekosetClient.personEmail }}</h3>
    </div>
    <div id="account-main-form" class="brc-login-form account-main-form">
      <div class="brc-login-form__block">
        <BaseInput
          id="reg-name-input"
          v-model="ekosetClient.personName"
          label="ФИО"
          placeholder="Фамилия Имя Отчество"
        >
          <span v-if="!ekosetClient.personName">
            Укажите фамилию,имя, отчество
          </span>
        </BaseInput>
      </div>

      <div class="brc-login-form__block">
        <BaseInputMask
          id="reg-phone-input"
          v-model="ekosetClient.personPhone"
          :mask="phoneMask"
          label="Телефон"
          placeholder="Телефон"
        >
        </BaseInputMask>
      </div>

      <div class="brc-login-form__block">
        <BaseInput
          id="reg-birthday-input"
          v-model="ekosetClient.personBirthday"
          label="Дата рождения"
          placeholder="Дата рождения"
          type="date"
        >
        </BaseInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, getModule, Vue } from 'nuxt-property-decorator'
import { phoneNumberMask } from "@/utils/InputMaskDefinitions";
import BaseInputMask from "@/components/base/BaseInputMask.vue"
import EkosetClient from '@/models/EkosetClient';
import AuthStore from '@/store/AuthStore';
import UserService from '@/services/UserService';

@Component({
  components: { BaseInputMask }
})
export default class AccountMain extends Vue {

  private get ekosetClient (): EkosetClient {
    return getModule(AuthStore, this.$store).ekosetClient
  }

  private head () {
    return { title: 'Профиль пользователя' }
  }

  private get phoneMask () {
    return phoneNumberMask;
  }

  private validateData () {
    return !!this.ekosetClient.personName && !!this.ekosetClient.personPhone
  }

  private async save () {
    if (this.validateData()) {
      await this.$serviceRegistry.getService(UserService).saveClient(this.ekosetClient)
    }
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

.main-pof-blick {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
}
</style>
