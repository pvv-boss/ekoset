<template>
  <div v-if="showNotice" class="brc-cookie-accept">
    <span class="brc-cookie-text">
     Для повышения удобства работы с сайтом Банк ВТБ использует файлы cookie. <br>
     В cookie содержатся данные о прошлых посещениях сайта. <br>
     Если вы не хотите, чтобы эти данные обрабатывались, отключите cookie в настройках браузера. 
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
