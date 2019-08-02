<template>
  <header>
    <div>Экосеть</div>
    <ul class="brc-header-main-menu">
      <li>
        <nuxt-link :to="{name: 'about'}">О компании</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'clients'}">Наши клиенты</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'prices'}">Цены</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'news'}">Новости</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'contacts'}">Контакты</nuxt-link>
      </li>
    </ul>
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

<style lang="scss">
.brc-header-main-menu {
  > li {
    display: inline; /* Отображать как строчный элемент */
    list-style: none;
  }
}
</style>