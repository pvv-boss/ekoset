<template>
  <div class="brc-not-found" style="margin: auto">
    <h2>Ошибка 404. Нет такой страницы !</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class BaseNotFound extends Vue {
  private head() {
    return { title: "Страница не найдена" };
  }
}
</script>
