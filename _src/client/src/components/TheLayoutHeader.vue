<template>
  <header class="brc-header">
    <h3>Экосеть</h3>
    <div class="brc-header-menu">
      <ul class="brc-header-menu__list">
        <li>О компании</li>
        <li>Наши клиенты</li>
        <li>Цены</li>
        <li>Новости</li>
        <li>Контакты</li>
      </ul>
    </div>
    <div class="brc-breadcrumb">Главная > Навигация</div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'

@Component({
  components: {
    UserAuthHeader
  }
})
export default class TheLayoutHeader extends Vue {
  public isAdmin = true

  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }
}
</script>

<style lang="scss" scoped>
.brc-header-menu__list li {
  display: inline;
  margin: auto;
}
</style>
