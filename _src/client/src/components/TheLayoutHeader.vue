<template>
  <header class="brc-page-header">
    <div class="brc-logo_main">
      <img src="/images/logo.png" alt="Экосеть" />
    </div>
    <div class="brc-contact_main">
      <a class="brc-contact__telephone" href="tel:4952233595">
        (495)
        <span>223-35-95</span>
      </a>
      <a class="brc-contact__message-form-call" href="#">Заказать</a>
      <a class="brc-contact__user-logo" href="#">
        <img src="/images/user-icon.png" alt="Личный кабинет" />
      </a>
    </div>
    <ul class="brc-main-menu">
      <li>
        <nuxt-link :to="{name: 'main'}" :class="{active: activeIndex === 'main'}">О компании</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'clients'}" :class="{active: activeIndex === 'clients'}">Наши клиенты</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'prices'}" :class="{active: activeIndex === 'prices'}">Цены</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'news'}" :class="{active: activeIndex === 'news'}">Новости</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'contacts'}" :class="{active: activeIndex === 'contacts'}">Контакты</nuxt-link>
      </li>
    </ul>
    <ul class="brc-contact__feedback-menu">
      <li>
        <a href="#">Пригласить на тендер</a>
      </li>
      <li>
        <a href="#">Ваш вопрос</a>
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