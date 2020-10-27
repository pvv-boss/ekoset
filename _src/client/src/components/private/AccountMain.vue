<template>
  <div class="brc-not-found">
    <p align="center">
      <i class="fas fa-bug"></i>
    </p>
    <h2>Ошибка 404. Нет такой страницы !</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AccountMain extends Vue {
  private head () {
    return { title: 'Страница не найдена' }
  }
}
</script>
