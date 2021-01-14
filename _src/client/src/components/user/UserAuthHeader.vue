<template>
  <section>
    <div v-show="isAuthenticated" class="brc-top-menu__user_authenticated">
      <img
        v-if="isMobile"
        src="~/assets/images/user-icon-red.png"
        title="Вход для клиентов"
      />
      <div class="person_menu_wrapper">
        <nuxt-link :to="{ name: 'user-deals-contracts' }">
          <span id="dont_outside">{{ ekosetClientUserName }}</span>
        </nuxt-link>
        <ul v-if="isPersonalSiteSection" class="person_menu">
          <nuxt-link :to="{ name: 'user-profile' }" tag="li">
            <span>Настройка аккаунта</span>
          </nuxt-link>
          <li @click="logout()">Выход</li>
        </ul>
      </div>
    </div>

    <div v-show="!isAuthenticated" class="brc-top-menu__user_notauthenticated">
      <nuxt-link
        :to="{ name: 'auth-login', params: { mode: 'login' } }"
        style="display: flex"
      >
        <img src="~/assets/images/user-icon.png" title="Вход для клиентов" />
        <div v-if="isMobile">Личный кабинет</div>
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'
import { AuthService } from '@/services/AuthService'
import { ServiceRegistry } from '@/ServiceRegistry'
import AppStore from '@/store/AppStore'

@Component
export default class UserAuthHeader extends Vue {

  @Prop()
  private isMobile

  private get userStore () { return getModule(AuthStore, this.$store) }

  private get ekosetClientUserName () {
    return this.userStore.ekosetClient?.personEmail ?? this.userStore.sessionUser.appUserName
  }

  private async logout () {
    await ServiceRegistry.instance.getService(AuthService).logoff()
    this.$router.push({ name: "main" })

  }

  private get isAuthenticated () {
    return ServiceRegistry.instance.getService(AuthService).isUserAuthorized
  }

  private get isPersonalSiteSection () {
    return getModule(AppStore, this.$store).isPersonalSiteSection
  }

}
</script>

<style lang="scss">
.brc-top-menu__user_authenticated,
.brc-top-menu__user_notauthenticated {
  color: $red;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    color: $red;
    margin-left: 10px;
  }
  a {
    color: $red;
    display: flex;
    align-items: center;
  }
}

.brc-top-menu__user_authenticated {
  .person_menu_wrapper {
    position: relative;
  }
  .person_menu {
    position: absolute;
    top: 20px;
    left: 0px;
    width: max-content;
    font-size: 0.938rem;
    color: $text-color !important;
    &:hover {
      color: $red;
      cursor: pointer;
    }
  }
}
</style>
