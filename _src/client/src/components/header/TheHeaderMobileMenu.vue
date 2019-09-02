<template>
  <section>
    <div class="brc-page-header-mobile">
      <nuxt-link
        :to="{name: 'main'}"
        class="brc-page-header-mobile__logo"
        :class="{active: activeIndex === 'main'}"
      >
        <img src="/images/logo.png" alt="Экосеть" />
      </nuxt-link>

      <img
        v-click-outside="closeMenu"
        class="brc-page-header-mobile__menu-expander"
        @click="openMenu"
        src="/images/menu.png"
      />

      <nuxt-link
        :to="{name: 'auth-login',params:{mode:'login'}}"
        class="brc-page-header-mobile__user"
        :class="{active: activeIndex === 'auth-login'}"
      >
        <img src="/images/user_small.png" alt="Экосеть" />
      </nuxt-link>
    </div>

    <!-- Само меню. Живет с абсолютным позишн !!! -->
    <nav class="brc-page-header-mobile__menu" :class="{visible:isMainMenuActive===true}">
      <div class="brc-page-header-mobile-menu__title">
        <div class="brc-page-header-mobile-menu__user-auth">
          <UserAuthHeader></UserAuthHeader>
        </div>
        <a href="#" class="brc-page-header-mobile__menu-closer" @click="closeMenu" />
      </div>

      <div class="brc-page-header-mobile-menu__main-menu">
        <TheHeaderMenu></TheHeaderMenu>
      </div>

      <div class="brc-page-header-mobile__empty-section"></div>

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

    <!-- Для закрытия основного контента -->
    <div class="main-content_hidden" :class="{active:isMainMenuActive===true}"></div>
  </section>
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
export default class TheHeaderMobileMenu2 extends Vue {
  public isMainMenuActive = false

  public openMenu () {
    this.isMainMenuActive = true
  }

  public closeMenu () {
    if (this.isMainMenuActive === true) {
      this.isMainMenuActive = false
    }
  }

  public get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.main-content_hidden {
  display: none;

  &.active {
    position: fixed;
    display: block;
    top: 0px;
    left: 0px;
    min-width: 100%;
    width: 100vw;
    min-height: 100%;
    height: 100vh;
    background-color: #bbbbbb;
    opacity: 0.7;
  }
}

.brc-page-header-mobile {
  display: none;
  font-size: 1rem !important;
  letter-spacing: 0.02rem !important;

  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .brc-page-header-mobile__logo {
      height: 40px;
      > img {
        max-height: 40px;
        height: 40px;
      }
    }

    .brc-page-header-mobile__menu-expander {
      position: relative;
      width: 30px;
      height: 30px;
      max-height: 30px;
      margin-left: auto;
      cursor: pointer;
    }

    .brc-page-header-mobile__user {
      height: 20px;
      margin-left: 15px;
      > img {
        max-height: 20px;
        height: 20px;
      }
    }
  }
}

.brc-page-header-mobile__menu {
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  transform: translateY(-110%);
  display: none;
  flex-direction: column;
  background-color: white;
  overflow-y: scroll;
  z-index: 1000;
  transform-style: flat;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  width: 100vw;
  height: max-content;

  &.visible {
    transform: none;
  }

  * {
    padding: 0 !important;
    padding-left: 0 !important;
    margin: 0 !important;
  }

  > div + div {
    border-top: 1px solid $delimiter-light-color;
  }

  .brc-page-header-mobile-menu__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .brc-page-header-mobile__menu-closer {
    position: relative;
    width: 20px;
    height: 20px;
  }
  .brc-page-header-mobile__menu-closer::before,
  .brc-page-header-mobile__menu-closer::after {
    position: absolute;
    top: 0px;
    left: 7px;
    width: 3px;
    height: 18px;
    content: "";
    background-color: black;
    display: block;
  }
  .brc-page-header-mobile__menu-closer::before {
    transform: rotate(-45deg);
  }
  .brc-page-header-mobile__menu-closer::after {
    transform: rotate(45deg);
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
      // text-transform: none;
      font-size: 1rem !important;
      letter-spacing: 0.02rem !important;
    }
  }

  .brc-page-header-mobile__callme {
    display: flex;
    flex-direction: row;
    justify-items: start;
    .brc-page-header-mobile__order {
      margin-left: 15px !important;
    }
  }

  .brc-page-header-mobile__empty-section,
  .brc-page-header-mobile-menu__title,
//  .brc-page-header-mobile-menu__user-auth,
  .brc-page-header-mobile__invite,
  .brc-page-header-mobile__callme,
  .brc-page-header-mobile__ask {
    padding: 10px 15px 10px 20px !important;
  }

  .brc-page-header-mobile-menu__main-menu {
    li {
      padding: 10px 15px 10px 20px !important;
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

  .brc-page-header-mobile__empty-section {
    padding: 15px !important;
  }
  .user-navigation-menu__link {
    > div {
      padding-left: 5px !important;
    }
  }

  @media (max-width: 768px) {
    display: flex !important;
  }
}
</style>