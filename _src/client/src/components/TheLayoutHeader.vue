<template>
  <header>
    <nav class="brc-page-header" id="main-header">
      <div class="brc-logo_main" id="main-logo">
        <img src="/images/logo.png" alt="Экосеть" />
      </div>
      <div class="nav-toggle" @click="toogleMenuVisible">
        <span></span>
      </div>
      <div class="brc-contact_main" id="main-contact">
        <a class="brc-contact__telephone" href="tel:4952233595">
          (495)
          <span>223-35-95</span>
        </a>
        <a class="brc-contact__message-form-call" href="#">Заказать</a>
        <a class="brc-contact__user-logo" href="#">
          <img src="/images/user-icon.png" alt="Личный кабинет" />
        </a>
      </div>
      <ul
        class="brc-main-menu"
        :class="{ 'brc-main-menu_active': isMainMenuActive === true }"
        id="main-menu"
      >
        <li>
          <nuxt-link :to="{name: 'about'}" :class="{active: activeIndex === 'about'}">О компании</nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{name: 'clients'}"
            :class="{active: activeIndex === 'clients'}"
          >Наши клиенты</nuxt-link>
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
      <ul class="brc-feedback-menu" id="feedback-menu">
        <li>
          <a href="#">Пригласить на тендер</a>
        </li>
        <li>
          <a href="#">Ваш вопрос</a>
        </li>
      </ul>
    </nav>
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
  public isMainMenuActive = false

  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }

  public toogleMenuVisible () {
    this.isMainMenuActive = !this.isMainMenuActive
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#main-header {
  display: grid;
  grid-template-rows: 60px 50px;
  grid-template-columns: 1fr 450px;
  position: relative;
  grid-template-areas:
    "logo contact"
    "menu feedback";

  #main-logo {
    grid-area: logo;
  }

  #main-contact {
    grid-area: contact;
  }

  #main-menu {
    grid-area: menu;
  }

  #feedback-menu {
    grid-area: feedback;
  }

  .brc-main-menu {
    text-transform: uppercase;
    font-size: 14px;
    margin: 0;
    padding-left: 100px;
    z-index: 1;

    > li {
      > a {
        color: #212224;

        &:hover {
          color: $red;
        }

        &.active {
          color: $red;
        }
      }

      display: inline-block;
      list-style-type: none;
      padding: 0 20px;
    }
  }

  .brc-contact_main {
    display: inline-flex;
    margin: 10px 0 0 auto;

    a {
      padding: 5px;
    }

    .brc-contact__telephone {
      color: #26272d;
      font-size: 20px;
      font-weight: bold;

      > span {
        color: $red;
        font-size: 30px;
        padding-left: 5px;
      }
    }

    .brc-contact__message-form-call {
      width: 130px;
      margin: 0 10px;
      color: white;
      font-size: 14px;
      background-color: $red;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      border: none;
      cursor: pointer;
      line-height: 14px;
    }

    .brc-contact__user-logo {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;
      border-radius: 50%;
    }
  }

  .brc-feedback-menu {
    margin: 0 70px 0 auto;

    > li {
      > a {
        color: #212224;
        text-decoration: underline;

        &:hover {
          color: $red;
        }
      }

      font-size: 12px;
      display: inline-block;
      list-style-type: none;
      padding: 0 20px;
    }
  }

  .nav-toggle {
    display: none;
    position: relative;
    float: right;
    width: 40px;
    height: 40px;
    margin-left: 20px;
    background: $red;
    cursor: pointer;
  }
  .nav-toggle span {
    display: block;
    position: absolute;
    top: 19px;
    left: 8px;
    right: 8px;
    height: 2px;
    background: white;
  }
  .nav-toggle span:before,
  .nav-toggle span:after {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
  }
  .nav-toggle span:before {
    top: -10px;
  }
  .nav-toggle span:after {
    bottom: -10px;
  }

  @media (max-width: 768px) {
    /* показываем кнопку для переключения верхней навигации */
    .nav-toggle {
      display: block;
    }

    #main-menu {
      display: none;
    }

    #main-menu.brc-main-menu_active {
      display: block;
      max-height: 90vh;
      position: absolute;
      z-index: 3;
    }

    #main-menu li {
      display: block;
    }
  }
}
</style>