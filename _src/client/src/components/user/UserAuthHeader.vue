<template>
  <section>
    <div v-show="isAuthenticated" class="brc-top-menu__user_authenticated">
      <img
        v-if="isMobile"
        src="~/assets/images/user-icon-red.png"
        title="Вход на сайт"
      />
      <nuxt-link :to="{ name: 'user-profile' }">
        {{ ekosetClientUserName }}
      </nuxt-link>
    </div>

    <div v-show="!isAuthenticated" class="brc-top-menu__user_notauthenticated">
      <nuxt-link
        :to="{ name: 'auth-login', params: { mode: 'login' } }"
        style="display: flex"
      >
        <img src="~/assets/images/user-icon.png" title="Вход на сайт" />
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

@Component
export default class UserAuthHeader extends Vue {

  @Prop()
  private isMobile

  private get userStore () { return getModule(AuthStore, this.$store) }

  private get ekosetClientUserName () {
    return this.userStore.ekosetClient?.personName ?? this.userStore.sessionUser.appUserName
  }

  private logout () {
    return ServiceRegistry.instance.getService(AuthService).logoff()
  }

  private get isAuthenticated () {
    return this.userStore.isAuthenticated
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
</style>
