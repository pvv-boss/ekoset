<template>
  <div v-if="showNotice" class="brc-cookie-accept">
    <span class="brc-cookie-text">
      Cookies и пользовательские данные
      Сайт использует файлы cookie. Они позволяют узнавать вас и получать информацию о вашем пользовательском опыте.
      <br>Это нужно, чтобы улучшать сайт. Посещая страницы сайта и предоставляя свои данные, вы позволяете нам предоставлять их сторонним партнерам.
      <br>Если согласны, продолжайте пользоваться сайтом. Если нет – установите специальные настройки в браузере или обратитесь в техподдержку.
    </span>
    <span class="brc-cookie-close">
      <a href="#" @click="acceptCookie">&times;</a>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class BaseCookieNotice extends Vue {
  private isPressClose = false

  private acceptCookie () {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    document.cookie = `accept=true; path=/; expires=${date.toUTCString()}`
    this.isPressClose = true
  }

  private get showNotice () {
    const isAcceptedCookie = document.cookie.replace(/(?:(?:^|.*;\s*)accept\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const appConfig = getServiceContainer().authService.appConfig
    const showCookieNotice = appConfig ? appConfig.showCookieNotice : true
    return showCookieNotice && !isAcceptedCookie && !this.isPressClose
  }
}
</script>
