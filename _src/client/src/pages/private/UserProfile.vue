<template>
  <main>
    <section class="brc-section__wrapper">
      <div>
        <h1>Настройка Аккаунта</h1>
      </div>
      <div class="brc-user-profile">
        <div class="mt-40">
          <div class="account_notif">
            <AccountMain class="prof-main"></AccountMain>
            <NotificationSettings
              class="nittiff-settings"
            ></NotificationSettings>
          </div>
          <div class="dialog_buttons dialog_buttons--profile">
            <button class="dialog_button_ok" @click="save">Сохранить</button>
            <button class="dialog_button_cancel" @click="cancel">Отмена</button>
          </div>
        </div>
        <ChangePassword
          class="mt-40 change-password"
          style="flex-basis: 33%"
        ></ChangePassword>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import EkosetClient from '@/models/EkosetClient'
import { ServiceRegistry } from '@/ServiceRegistry'
import UserService from '@/services/UserService'
import AppStore from '@/store/AppStore'
import AuthStore from '@/store/AuthStore'
import { Component, getModule, Vue } from 'nuxt-property-decorator'

@Component
export default class UserProfile extends Vue {
  public beforeRouteEnter (to, from, next) {
    getModule(AppStore, ServiceRegistry.instance.nuxtContext.store).changeIsAccountSiteSection(true)
    next()
  }

  public beforeRouteLeave (to, from, next) {
    getModule(AppStore, this.$store).changeIsAccountSiteSection(false)
    next()
  }

  private get ekosetClient (): EkosetClient {
    return getModule(AuthStore, this.$store).ekosetClient
  }

  private async save () {
    await this.$serviceRegistry.getService(UserService).saveClient(this.ekosetClient)
    this.$router.push({ name: 'user-deals-contracts' });
  }

  private async cancel () {
    this.$router.push({ name: 'user-deals-contracts' });
  }

}
</script>

<style lang="scss">
.brc-user-profile {
  display: flex;
  flex-direction: row;

  .dialog_buttons--profile {
    justify-content: center;
    border-top: 2px solid lightgray;
    margin-top: 16px;
    margin-bottom: 32px;
    padding-top: 16px;
  }

  @media (max-width: 760px) {
    flex-direction: column;
  }

  .account_notif {
    display: flex;
    flex-direction: row;

    @media (max-width: 760px) {
      flex-direction: column;
    }

    .prof-main {
      flex-grow: 1;
    }
    .nittiff-settings {
      flex-basis: 45%;
      flex-shrink: 0;
      margin-left: 40px;

      @media (max-width: 760px) {
        flex-basis: 100%;
        margin-left: 0px;
      }
    }
  }

  .change-password {
    flex-basis: 28%;
    flex-shrink: 0;
    margin-left: 40px;

    @media (max-width: 760px) {
      flex-basis: 100%;
      margin-left: 0px;
    }
  }

  .mt-40 {
    margin-top: 40px;
  }
}
</style>
