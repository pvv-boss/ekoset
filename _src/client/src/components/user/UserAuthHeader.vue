<template>
  <div class="brc-top-menu__user-navigation">
    <ul class="brc-top-menu__user-navigation-menu">
      <li v-if="isAuthenticated" class="user-navigation-menu__li">
        <a class="user-navigation-menu__link brc-dropdown-toggle" href="#" @click="toggleMenu">
          <img :src="userImageSrc" class="img-responsive" style="border-radius: 100%;" width="42" />
          <span>{{ sessionUser.userSnProfileNick ? sessionUser.userSnProfileNick : sessionUser.appUserEmail }}</span>
        </a>
        <div id="userAuthMenu" class="brc-top-menu__user-navigation-dropdown" style="display:none">
          <a href="#" class="user-navigation-dropdown__link" @click="logout">Выйти</a>
          <a href="#" class="user-navigation-dropdown__link" @click="changePassword">Изменить пароль</a>
        </div>
      </li>
      <li v-else class="user-navigation-menu__li">
        <nuxt-link
          :to="{ name: 'auth-login', params: {mode: 'login'} }"
          class="user-navigation-menu__link user-navigation-menu__link-auth"
        >Личный кабинет</nuxt-link>
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

  private changePassword () {
    this.toggleMenu()
    this.$router.replace({ name: 'auth-change', params: { mode: 'change' } })
  }

  private toggleMenu () {
    const menuElement = document.getElementById('userAuthMenu') as HTMLElement
    menuElement.style.display = menuElement.style.display !== 'none' ? 'none' : 'block'
  }
}
</script>
