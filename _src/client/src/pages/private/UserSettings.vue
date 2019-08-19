<template>
  <section>
    <h1 itemprop="headline name">Настройки пользователя</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AuthStore from '@/store/AuthStore'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'
@Component({
})
export default class UserSettings extends Vue {
  private userStore = getModule(AuthStore, this.$store)

  private get sessionUser () {
    return this.userStore.sessionUser
  }

  private async asyncData (context: NuxtContext) {
    //FIXME: получение настроек пользователя
  }

  private head () {
    return { title: 'Экосеть: Настройка Аккаунта' }
  }
}
</script>
