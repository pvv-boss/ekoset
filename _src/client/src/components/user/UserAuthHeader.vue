<template>
  <no-ssr>
    <section>
      <div v-if="isAuthenticated" class="brc-top-menu__user">
        <div
          class="dsp_small"
        >{{ sessionUser.userSnProfileNick ? sessionUser.userSnProfileNick : sessionUser.appUserEmail }}</div>
      </div>

      <div v-else class="brc-top-menu__user_notauthenticated">
        <nuxt-link :to="{ name: 'auth-login', params: {mode: 'login'}}" style="display:flex;">
          <img src="/images/user-icon.png" title="Вход на сайт" />
        </nuxt-link>
      </div>
    </section>
  </no-ssr>
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

  // private get userImageSrc (): string {
  // return this.sessionUser.userSnProfileAvatar !== '' ? this.sessionUser.userSnProfileAvatar : '/images/user-icon.png'
  // }

}
</script>

<style lang="scss">
.brc-top-menu__user_notauthenticated {
  // width: 50px;
  // height: 50px;
  // border: 1px solid #a6a6a6;
  display: flex;
  justify-content: center;
  align-items: center;
  // border-radius: 50%;
  .img {
    // width: 20px;
    // height: 25px;
  }
}
</style>
