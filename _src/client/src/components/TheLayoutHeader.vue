<template>
  <header>
    <div class="container">
      <div class="header-top">
        <a class="header-logo" href="index.html">
          <img src="/images/logo.png" alt="Alternate Text" />
        </a>
        <div class="menu_mob">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="header-bottom">
        <a class="persontal-info" href="#">
          <img src="/images/user.png" alt="Alternate Text" />
          <span>Имя Фамилия</span>
        </a>
        <ul class="header-menu">
          <li class="active">
            <a href="#">О компании</a>
          </li>
          <li>
            <a href="#">Наши клиенты</a>
          </li>
          <li>
            <a href="#">Цены</a>
          </li>
          <li>
            <nuxt-link :to="{name: 'article-list'}">Новости</nuxt-link>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </ul>
        <div class="header-info">
          <a href="#">Пригласить на тендер</a>
          <a href="#">Ваш вопрос</a>
          <a class="full-version" href="#">Полная версия сайта</a>
        </div>
        <div class="header-contact">
          <a class="header-tel" href="tel:4952233595">
            (495)
            <span>223-35-95</span>
          </a>
          <a class="btn header-order-btn" href="#">Заказать</a>
          <a class="header-profile" href="#">
            <img src="/images/user-icon.png" alt="Alternate Text" />
          </a>
        </div>
      </div>
    </div>
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

