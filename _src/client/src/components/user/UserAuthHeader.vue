<template>
  <client-only>
    <section>
      <div v-if="isAuthenticated" class="brc-top-menu__user_authenticated">
        <img v-if="isMobile" :src="userImageSrc" title="Вход на сайт" />
        <div>{{ sessionUser.userSnProfileNick ? sessionUser.userSnProfileNick : sessionUser.appUserEmail }}</div>
      </div>

      <div v-else class="brc-top-menu__user_notauthenticated">
        <nuxt-link :to="{ name: 'auth-login', params: {mode: 'login'}}" style="display:flex;">
          <img :src="userImageSrc" title="Вход на сайт" />
          <div v-if="isMobile">Личный кабинет</div>
        </nuxt-link>
      </div>
    </section>
  </client-only>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { getModule } from 'vuex-module-decorators'

@Component
export default class UserAuthHeader extends Vue {

  @Prop()
  private isMobile

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
    return this.isMobile ? '/images/user-icon-red.png' : '/images/user-icon.png'
    // return this.sessionUser.userSnProfileAvatar !== '' ? this.sessionUser.userSnProfileAvatar : '/images/user-icon.png'
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-top-menu__user_authenticated,
.brc-top-menu__user_notauthenticated {
  color: $red;
  // width: 50px;
  // height: 50px;
  // border: 1px solid #a6a6a6;
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
  // border-radius: 50%;
  .img {
    // width: 20px;
    // height: 25px;
  }
}
</style>
