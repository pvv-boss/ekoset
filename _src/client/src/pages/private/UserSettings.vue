<template>
  <section>
    <h1 itemprop="headline name">{{head}}</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
})
export default class UserSettings extends Vue {

  private head () {
    return { title: 'Экосеть: Настройка Аккаунта' }
  }
}
</script>
