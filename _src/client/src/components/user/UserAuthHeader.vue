<template>
  <section>
    <div v-show="isAuthenticated" class="brc-top-menu__user_authenticated">
      <img v-if="isMobile" src="~/assets/images/user-icon-red.png" title="Вход для клиентов" style="margin-right: 10px" />

      <nuxt-link v-if="!isPersonalSiteSection && !isAdmin" :to="{ name: 'user-deals-contracts' }">
        <span>{{ captionForAuthenticated }}</span>
      </nuxt-link>

      <div
        v-if="isAdmin"
        v-click-outside="
          () => {
            isMenuOpened = false;
          }
        "
        class="person_menu_wrapper"
        @click="onMenuClick"
      >
        <span id="dont_outside" style="cursor: pointer">{{ captionForAuthenticated }}</span>
        <ul v-if="isMenuOpened" class="person_menu" :class="{ active: isMenuOpened === true }">
          <nuxt-link :to="{ name: 'admin' }" tag="li" class="brc-price-menu__item" style="padding: 10px !important">
            <span>Администрирование</span>
          </nuxt-link>
          <li class="brc-price-menu__item" style="padding: 10px !important" @click="logout()">Выход</li>
        </ul>
      </div>

      <div
        v-if="isPersonalSiteSection"
        v-click-outside="
          () => {
            isMenuOpened = false;
          }
        "
        class="person_menu_wrapper"
        @click="onMenuClick"
      >
        <span id="dont_outside" style="cursor: pointer">{{ captionForAuthenticated }}</span>
        <ul v-if="isMenuOpened" class="person_menu" :class="{ active: isMenuOpened === true }">
          <nuxt-link
            v-if="!isAdmin"
            :to="{ name: 'user-profile' }"
            tag="li"
            class="brc-price-menu__item"
            style="padding: 10px !important"
          >
            <span>Настройка аккаунта</span>
          </nuxt-link>

          <nuxt-link v-else :to="{ name: 'admin' }" tag="li" class="brc-price-menu__item" style="padding: 10px !important">
            <span>Администрирование</span>
          </nuxt-link>

          <li class="brc-price-menu__item" style="padding: 10px !important" @click="logout()">Выход</li>
        </ul>
      </div>
    </div>

    <div v-show="!isAuthenticated" class="brc-top-menu__user_notauthenticated">
      <nuxt-link :to="{ name: 'auth-login', params: { mode: 'login' } }" style="display: flex">
        <img src="~/assets/images/user-icon.png" title="Вход для клиентов" />
        <div v-if="isMobile">Личный кабинет</div>
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import AuthStore from "@/store/AuthStore";
import { getModule } from "vuex-module-decorators";
import { AuthService } from "@/services/AuthService";
import { ServiceRegistry } from "@/ServiceRegistry";
import AppStore from "@/store/AppStore";

@Component
export default class UserAuthHeader extends Vue {
  @Prop()
  private isMobile;
  private isMenuOpened = false;

  private get userStore() {
    return getModule(AuthStore, this.$store);
  }

  private get ekosetClientUserName() {
    return this.userStore.ekosetClient?.personEmail ?? this.userStore.sessionUser.appUserName;
  }

  private async logout() {
    await ServiceRegistry.instance.getService(AuthService).logoff();
    this.$router.push({ name: "main" });
  }

  private get isAuthenticated() {
    return ServiceRegistry.instance.getService(AuthService).isUserAuthorized;
  }

  private get isAdmin() {
    return ServiceRegistry.instance.getService(AuthService).isUserAdmin;
  }

  private get isPersonalSiteSection() {
    return getModule(AppStore, this.$store).isPersonalSiteSection;
  }

  private get isAccountSiteSection() {
    return getModule(AppStore, this.$store).isAccountSiteSection;
  }

  private get captionForAuthenticated() {
    return this.isPersonalSiteSection || this.isAccountSiteSection ? this.ekosetClientUserName : "Личный кабинет";
  }

  private onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
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
    display: none !important;
    position: absolute;
    top: 24px;
    left: 0px;
    width: max-content;
    font-size: 0.938rem;
    color: $text-color !important;
    cursor: pointer;

    z-index: 2000;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    border-top: 1px solid lightgray;
    overflow-y: auto;
    list-style: none;
    list-style-type: none;
    text-transform: none;
    max-width: 90vw;
    max-height: 70vh;
    &.active {
      display: block !important;
    }

    @media (max-width: 900px) {
      position: fixed;
      width: max-content;
      top: 44px;
      left: auto !important;
      margin: auto;
      max-height: calc(95vh - 140px);
    }
  }
}
</style>
