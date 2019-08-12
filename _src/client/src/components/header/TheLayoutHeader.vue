<template>
  <header class="brc-page-header" id="page-header">
    <nuxt-link
      :to="{name: 'main'}"
      class="brc-logo_main brc-page-header_mobile-hide"
      :class="{active: activeIndex === 'main'}"
      id="brc-page-header-main-logo"
    >
      <img src="/images/logo_big.png" alt="Экосеть" />
    </nuxt-link>
    <nuxt-link
      :to="{name: 'main'}"
      class="brc-brand_main brc-page-header_mobile-hide"
      :class="{active: activeIndex === 'main'}"
      id="brc-page-header-main-brand-name"
    >
      <img src="/images/brand_name_big.png" alt="Экосеть" />
    </nuxt-link>

    <div id="brc-page-header-empty-block" class="brc-page-header_mobile-hide"></div>

    <nav id="brc-page-header-top-actions" class="brc-page-header_mobile-hide">
      <TheHeaderActions></TheHeaderActions>
    </nav>

    <!-- <div id="brc-page-header-logon" class="brc-page-header_mobile-hide">
      <UserAuthHeader></UserAuthHeader>
    </div>-->

    <div id="brc-page-header-callme" class="brc-page-header_mobile-hide">
      <TheHeaderCallMe></TheHeaderCallMe>
    </div>

    <div id="brc-page-header-order" class="brc-page-header_mobile-hide">
      <TheHeaderOrder></TheHeaderOrder>
    </div>

    <nav id="brc-page-header-menu-items" class="brc-page-header_mobile-hide">
      <TheHeaderMenu></TheHeaderMenu>
    </nav>

    <nuxt-link
      :to="{name: 'main'}"
      class="brc-page-header__mobile-logo brc-page-header_mobile-visible"
      :class="{active: activeIndex === 'main'}"
      id="brc-page-header-mobile-logo"
    >
      <img src="/images/logo.png" alt="Экосеть" />
    </nuxt-link>
    <div
      id="brc-page-header-mobile-menu-expander"
      class="brc-page-header__mobile-menu-expander brc-page-header_mobile-visible"
      :class="{menu_visible:isMainMenuActive===true}"
      @click="toogleMenuVisible"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <TheHeaderMobileMenu
      class="brc-page-header_mobile-visible"
      :class="{visible: isMainMenuActive===true}"
    ></TheHeaderMobileMenu>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheHeaderMenu from '@/components/header/TheHeaderMenu.vue'
import TheHeaderActions from '@/components/header/TheHeaderActions.vue'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'
import TheHeaderMobileMenu from '@/components/header/TheHeaderMobileMenu.vue'
import TheHeaderCallMe from '@/components/header/TheHeaderCallMe.vue'
import TheHeaderOrder from '@/components/header/TheHeaderOrder.vue'


@Component({
  components: {
    TheHeaderMenu,
    TheHeaderActions,
    UserAuthHeader,
    TheHeaderMobileMenu,
    TheHeaderCallMe,
    TheHeaderOrder
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
@import "@/styles/typography.scss";

$header_margin_top: 15px;

$grid_column_gap: 20px;
$header_row1_size: 34px;
$header_row2_size: 30px;
$header_row3_size: 42px;
$header_col1_size: 96px;
$header_col2_size: 171px;

#page-header {
  margin-top: $header_margin_top;
  display: grid;
  grid-template-rows: $header_row1_size $header_row2_size $header_row3_size;
  grid-template-columns: $header_col1_size $header_col2_size 1fr auto 80px;
  grid-column-gap: $grid_column_gap;
  position: relative;
  grid-template-areas:
    "logo empty empty empty empty"
    "logo brandname topactions callme order"
    "logo menuitems menuitems menuitems menuitems";

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

  .brc-page-header_mobile-visible {
    display: none;
  }

  @media (max-width: 768px) {
    grid-template-rows: 40px;
    grid-template-columns: 112px 1fr;
    grid-template-areas: "mobile-logo mobile-menu-expander";

    #brc-page-header-mobile-logo {
      grid-area: mobile-logo;
      align-self: start;

      > img {
        width: 100%;
        max-width: 100%;
      }
    }

    #brc-page-header-mobile-menu-expander {
      grid-area: mobile-menu-expander;
      align-self: end;
    }

    .brc-page-header_mobile-hide {
      display: none;
    }

    .brc-page-header_mobile-visible {
      display: block;
    }

    .brc-page-header__mobile-menu-expander {
      position: relative;
      width: 30px;
      height: 30px;
      display: block;
      justify-self: end;

      > span {
        background-color: #4b4b4b;
        height: 3px;
        width: 30px;
        position: absolute;
        top: 0px;
        transition: 0.5s;
      }

      > span:nth-child(2) {
        top: 10px;
      }

      > span:nth-child(3) {
        top: 20px;
      }

      &.menu_visible {
        > span {
          background-color: $red;
        }
        > span:nth-child(1) {
          top: 8px;
          transform: rotate(225deg);
        }
        > span:nth-child(2) {
          top: 8px;
          transform: rotate(135deg);
        }
        > span:nth-child(3) {
          top: 8px;
          transform: rotate(225deg);
        }
      }
    }
  }

  @media (max-width: 768px) {
    grid-column-gap: $grid_column_gap/2;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
    grid-column-gap: $grid_column_gap/2;
  }
}
</style>
