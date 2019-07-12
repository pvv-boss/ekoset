<template>
  <div class="brc-not-found">
    <p align="center">
      <i class="fas fa-bug"></i>
    </p>
    <h1>Ошибка 404. Нет такой страницы !</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseNotFound extends Vue {
  private head () {
    return { title: 'Страница не найдена' }
  }
}
</script>
