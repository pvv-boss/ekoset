<template>
  <div class="brc-page-header-mobile">
    <nuxt-link
      :to="{name: 'main'}"
      class="brc-page-header-mobile__logo"
      :class="{active: activeIndex === 'main'}"
    >
      <img src="/images/logo.png" alt="Экосеть" />
    </nuxt-link>

    <div
      class="brc-page-header-mobile__menu-expander"
      :class="{menu_visible:isMainMenuActive===true}"
      @click="toogleMenuVisible"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <nav class="brc-page-header-mobile__menu" :class="{visible:isMainMenuActive===true}">
      <div class="brc-page-header-mobile-menu__user-auth">
        <UserAuthHeader></UserAuthHeader>
      </div>
      <div class="brc-page-header-mobile-menu__main-menu">
        <TheHeaderMenu></TheHeaderMenu>
      </div>
      <div class="brc-page-header-mobile__invite">
        <TheHeaderInviteTender></TheHeaderInviteTender>
      </div>
      <div class="brc-page-header-mobile__ask">
        <TheHeaderAskQuestion></TheHeaderAskQuestion>
      </div>
      <div class="brc-page-header-mobile__callme">
        <TheHeaderCallMe></TheHeaderCallMe>
        <TheHeaderOrder class="brc-page-header-mobile__order"></TheHeaderOrder>
      </div>
    </nav>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheHeaderMenu from '@/components/header/TheHeaderMenu.vue'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'
import TheHeaderOrder from '@/components/header/TheHeaderOrder.vue'
import TheHeaderCallMe from '@/components/header/TheHeaderCallMe.vue'
import TheHeaderAskQuestion from '@/components/header/TheHeaderAskQuestion.vue'
import TheHeaderInviteTender from '@/components/header/TheHeaderInviteTender.vue'

@Component({
  components: {
    TheHeaderMenu,
    UserAuthHeader,
    TheHeaderCallMe,
    TheHeaderOrder,
    TheHeaderInviteTender,
    TheHeaderAskQuestion
  }
})
export default class TheHeaderMobileMenu extends Vue {
  public isMainMenuActive = false
  public toogleMenuVisible () {
    this.isMainMenuActive = !this.isMainMenuActive
  }
  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-page-header-mobile {
  display: none;

  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    .brc-page-header-mobile__logo {
      > img {
        width: 100%;
        max-width: 100%;
        max-height: 40px;
        height: 40px;
      }
    }

    .brc-page-header-mobile__menu-expander {
      position: relative;
      width: 30px;
      height: 30px;
      display: block;

      > span {
        background-color: #4b4b4b;
        height: 3px;
        width: 30px;
        position: absolute;
        top: 0px;
        transition: 0.3s;
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
}

.brc-page-header-mobile__menu {
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: translateX(-120%);
  display: flex !important;
  flex-direction: column;
  background-color: #f5f5f5;

  transition: 0.3s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 1px;

  height: 100vh;

  &.visible {
    transform: translateX(0);
  }

  * {
    padding: 0 !important;
    padding-left: 0 !important;
    margin: 0 !important;
  }

  > div + div {
    border-top: 1px solid $delimiter-strong-color;
  }

  .brc-top-menu__user-navigation {
    flex-grow: 0;
    float: left !important;
    * {
      float: left !important;
    }
  }

  .brc-page-header__main-menu {
    * {
      display: block;
    }
  }

  .brc-page-header-mobile__callme {
    display: flex;
    flex-direction: row;
    justify-items: start;
    .brc-page-header-mobile__order {
      margin-left: 10px !important;
    }
  }

  .brc-page-header-mobile-menu__user-auth,
  .brc-page-header-mobile__invite,
  .brc-page-header-mobile__callme,
  .brc-page-header-mobile__ask {
    padding: 10px !important;
  }

  .brc-page-header-mobile-menu__main-menu {
    li {
      padding: 10px !important;
      a {
        border-bottom: none;
      }
    }

    li + li {
      border-top: 1px solid $delimiter-light-color;
    }
  }

  .brc-page-header-mobile__invite,
  .brc-page-header-mobile__ask {
    a {
      border-bottom: none;
      color: $text-color;
    }
  }
}
</style>