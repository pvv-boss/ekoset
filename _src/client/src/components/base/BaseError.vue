<template>
  <div class="brc-not-found">
    <p align="center">
      <i class="fas fa-bug"></i>
    </p>
    <h2>
      Вы столкнулись с внутренней ошибкой сервера.
      <br />Наши специалисты уже решают возникшую проблему.
      <br />Пожалуйста, попробуйте позже или начните заново с Главной страницы сайта
    </h2>
    <br />
    <div>{{ status }}</div>
    <div>{{ errorMessage }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseNotFound extends Vue {
  @Prop()
  private status

  @Prop()
  private errorMessage

  private head () {
    return { title: 'Ошибка на странице' }
  }
}
</script>
