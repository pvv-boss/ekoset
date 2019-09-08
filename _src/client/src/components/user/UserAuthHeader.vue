<template>
  <div class="brc-top-menu__user-navigation">
    <ul class="brc-top-menu__user-navigation-menu">
      <li v-if="isAuthenticated" class="user-navigation-menu__li">
        <a class="user-navigation-menu__link brc-dropdown-toggle">
          <img
            :src="userImageSrc"
            title="Личный кабинет"
            class="img-responsive"
            style="border-radius: 100%;"
            width="42"
          />
          <div class='p_small'>{{ sessionUser.userSnProfileNick ? sessionUser.userSnProfileNick : sessionUser.appUserEmail }}</div>
        </a>
      </li>
      <li v-else class="user-navigation-menu__li">
        <nuxt-link
          :to="{ name: 'auth-login', params: {mode: 'login'} }"
          class="user-navigation-menu__link user-navigation-menu__link-auth p_small"
        ><img
            :src="userImageSrc"
            title="Личный кабинет"
            class="img-responsive"
            style="border-radius: 100%;"
            width="42"
          /></nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'

@Component
export default class UserAuthHeader extends Vue {
  private userStore = getModule(AuthStore, this.$store)

  private get sessionUser () {
    return this.userStore.sessionUser
  }

  private logout () {
    return this.userStore.logoff()
  }

  private get isAuthenticated () {
    return this.userStore.isAuthenticated
  }

  private get userImageSrc (): string {
    return this.sessionUser.userSnProfileAvatar !== '' ? this.sessionUser.userSnProfileAvatar : '/images/user.png'
  }

}
</script>
