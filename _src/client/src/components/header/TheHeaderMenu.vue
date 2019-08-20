<template>
  <ul
    class="brc-page-header__main-menu"
    :class="{ 'brc-main-menu_active': isMainMenuActive === true }"
  >
    <li>
      <nuxt-link :to="{name: 'main'}" :class="{active: activeIndex === 'main'}">О компании</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'prices'}" :class="{active: activeIndex === 'prices'}">Цены</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'clients'}" :class="{active: activeIndex === 'clients'}">Наши клиенты</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'news'}" :class="{active: activeIndex === 'news'}">Новости</nuxt-link>
    </li>
    <li>
      <nuxt-link :to="{name: 'contacts'}" :class="{active: activeIndex === 'contacts'}">Контакты</nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderMenu extends Vue {
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

$menu_item_padding_left: 15px;

.brc-page-header__main-menu {
  text-transform: uppercase;
  margin: 0;
  > li {
    > a {
      color: $text-color;
      font-size: 0.938rem;
      &:hover {
        color: $red;
      }
      &.active {
        color: $red;
        font-weight: $font-medium;
        border-bottom: 2px solid $red;
      }
      letter-spacing: -0.1px;
    }

    display: inline-block;
    list-style-type: none;
  }

  > li + li {
    padding-left: $menu_item_padding_left;
    @media (max-width: 1024px) {
      padding-left: $menu_item_padding_left - 5px;
    }
  }
}
</style>