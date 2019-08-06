<template>
  <header class="brc-page-header" id="page-header">
    <nuxt-link
      :to="{name: 'main'}"
      class="brc-logo_main"
      :class="{active: activeIndex === 'main'}"
      id="brc-page-header-main-logo"
    >
      <img src="/images/logo_big.png" alt="Экосеть" />
    </nuxt-link>
    <nuxt-link
      :to="{name: 'main'}"
      class="brc-brand_main"
      :class="{active: activeIndex === 'main'}"
      id="brc-page-header-main-brand-name"
    >
      <img src="/images/brand_name_big.png" alt="Экосеть" />
    </nuxt-link>

    <div id="brc-page-header-empty-block" class="brc-page-header_mobile-hide"></div>

    <div
      id="brc-page-header-top-actions"
      class="brc-page-header__top-actions brc-page-header_mobile-hide p_medium"
    >
      <a>Задать вопрос</a>
      <a>Пригласить на тендр</a>
    </div>

    <div id="brc-page-header-logon" class="brc-page-header_mobile-hide">Logon</div>

    <div id="brc-page-header-callme" class="brc-page-header_mobile-hide">
      <a class="brc-contact__telephone" href="tel:4952233595">
        (495)
        <span>223-35-95</span>
      </a>
    </div>

    <div id="brc-page-header-order" class="brc-page-header__order brc-page-header_mobile-hide">
      <a>Заказать</a>
    </div>

    <nav id="brc-page-header-menu-items" class="brc-page-header_mobile-hide">
      <ul
        class="brc-page-header__main-menu"
        :class="{ 'brc-main-menu_active': isMainMenuActive === true }"
        id="main-menu"
      >
        <li>
          <nuxt-link :to="{name: 'main'}" :class="{active: activeIndex === 'main'}">Главная</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'about'}" :class="{active: activeIndex === 'about'}">О компании</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'prices'}" :class="{active: activeIndex === 'prices'}">Цены</nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{name: 'clients'}"
            :class="{active: activeIndex === 'clients'}"
          >Наши клиенты</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'news'}" :class="{active: activeIndex === 'news'}">Новости</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'contacts'}" :class="{active: activeIndex === 'contacts'}">Контакты</nuxt-link>
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
export default class TheNewLayoutHeader extends Vue {
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
@import "@/styles/typography.scss";

$header_margin_top: 15px;

$grid_column_gap: 20px;
$header_row1_size: 34px;
$header_row2_size: 30px;
$header_row3_size: 42px;
$header_col1_size: 96px;
$header_col2_size: 171px;

$menu_item_padding_left: 20px;

#page-header {
  margin-top: $header_margin_top;
  display: grid;
  grid-template-rows: $header_row1_size $header_row2_size $header_row3_size;
  grid-template-columns: $header_col1_size $header_col2_size 1fr auto auto auto;
  grid-column-gap: $grid_column_gap;
  position: relative;
  grid-template-areas:
    "logo empty empty empty empty empty"
    "logo brandname topactions logon callme order"
    "logo menuitems menuitems menuitems menuitems menuitems";

  @media (max-width: 1200px) {
    .brc-page-header_mobile-hide {
      display: none;
    }

    grid-template-rows: 53px;
    grid-template-columns: 53px 85px 1fr;
    grid-template-areas: "logo brandname";
    grid-column-gap: 0px;

    img {
      height: 100%;
      max-height: 100%;
    }
  }

  @media (max-width: 768px) {
    grid-column-gap: $grid_column_gap/2;
  }

  @media (max-width: 480px) {
    margin-top: $header_margin_top - 10px;
    grid-column-gap: $grid_column_gap/2;
  }

  #brc-page-header-empty-block {
    grid-area: empty;
  }

  #brc-page-header-main-logo {
    grid-area: logo;
  }

  #brc-page-header-main-brand-name {
    grid-area: brandname;
  }

  #brc-page-header-top-actions {
    grid-area: topactions;
    align-self: center;
    letter-spacing: -0.1px;
  }

  #brc-page-header-logon {
    grid-area: logon;
    align-self: center;
  }

  #brc-page-header-callme {
    grid-area: callme;
    align-self: center;
  }

  #brc-page-header-order {
    grid-area: order;
    align-self: center;
    justify-self: end;
    margin-left: -($grid_column_gap/2);
  }

  #brc-page-header-menu-items {
    grid-area: menuitems;
    justify-self: start;
    align-self: end;
  }

  .brc-page-header__main-menu {
    text-transform: uppercase;
    margin: 0;
    > li {
      > a {
        color: #212224;
        &:hover {
          color: $red;
        }
        &.active {
          color: $red;
        }
        letter-spacing: -0.1px;
      }

      display: inline-block;
      list-style-type: none;
    }

    > li + li {
      padding-left: $menu_item_padding_left;
      @media (max-width: 768px) {
        padding-left: $menu_item_padding_left - 5px;
      }
    }
  }

  .brc-contact__telephone {
    color: #26272d;
    > span {
      color: $red;
      font-size: 30px;
    }
  }

  .brc-page-header__order {
    background-color: $red;
    width: 100px;
    height: 40px;
  }
}
</style>
