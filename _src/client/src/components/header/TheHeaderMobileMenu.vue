<template>
  <header class="brc-page-header-mobile">
    <TheHeaderLogo></TheHeaderLogo>

    <!-- <div class="brc-page-header-mobile__user">
      <nuxt-link :to="{ name: 'auth-login', params: {mode: 'login'}}" style="display:flex;">
        <img src="/images/user-icon.png" title="Вход на сайт" />
      </nuxt-link>
    </div>-->

    <div class="brc-buscet-mobile" @click="navigateToOfferForm">
      <img src="/images/busket.svg" />
      <div class="brc-buscet-counter_mobile">{{getBuscetCount}}</div>
    </div>

    <div class="brc-page-header-mobile_expander" v-click-outside="closeMenu" @click="openMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Само меню. Живет с фиксед позишн !!! -->
    <nav class="brc-page-header-mobile__menu" :class="{'brc-page-header-mobile__menu_visible':isMainMenuActive===true}">
      <div class="brc-page-header-mobile-menu__title">
        <div class="brc-page-header-mobile-menu__user-auth">
        <UserAuthHeader :isMobile="true"></UserAuthHeader>
        </div>

        <div class="brc-page-header-mobile__close" @click="openMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="brc-page-header-mobile-menu__main-menu">
        <TheHeaderMenu :isMobile="true"></TheHeaderMenu>
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
  </header>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue, getModule } from 'nuxt-property-decorator'
import TheHeaderMenu from '@/components/header/TheHeaderMenu.vue'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'
import TheHeaderOrder from '@/components/header/TheHeaderOrder.vue'
import TheHeaderCallMe from '@/components/header/TheHeaderCallMe.vue'
import TheHeaderAskQuestion from '@/components/header/TheHeaderAskQuestion.vue'
import TheHeaderInviteTender from '@/components/header/TheHeaderInviteTender.vue'
import TheHeaderLogo from '@/components/header/TheHeaderLogo.vue'
import BuscetStore from '@/store/BuscetStore'

@Component({
  components: {
    TheHeaderMenu,
    UserAuthHeader,
    TheHeaderCallMe,
    TheHeaderOrder,
    TheHeaderInviteTender,
    TheHeaderAskQuestion,
    TheHeaderLogo
  }
})
export default class TheHeaderMobileMenu2 extends Vue {

  public get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }

  private get getBuscetCount () {
    return this.buscetStore.addedServiceCount
  }
  public isMainMenuActive = false

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  public openMenu () {
    this.isMainMenuActive = !this.isMainMenuActive
  }

  public closeMenu () {
    if (this.isMainMenuActive === true) {
      this.isMainMenuActive = false
    }
  }

  private navigateToOfferForm (e) {
    const formElement = document.getElementById('btnRequestServicePopupForm')
    if (formElement) {
      formElement.setAttribute('style', 'display:block');
    }
    e.preventDefault()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

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

@media (max-width: 900px) {
  .brc-body {
    margin-top: 83px !important;
  }
}

.brc-page-header-mobile {
  display: none;

  .brc-buscet-mobile {
    cursor: pointer;
    position: relative;
    img {
      width: 32px;
      height: 32px;
    }
    .brc-buscet-counter_mobile {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -5px;
      right: -10px;
      background-color: black;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      color: white;
      font-size: 14px;
    }
  }

  @media (max-width: 900px) {
    display: flex !important;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    letter-spacing: 0.02rem !important;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 14px;
    z-index: 1000;
    background: white;
    border-bottom: 1px solid lightgray;

    .brc_bo .brc-page-header-mobile__logo {
      height: 40px !important;
    }

    .brc-page-header-mobile__user {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .brc-page-header-mobile_expander {
      display: block;
      margin: 7px 0 0 12px;
      position: relative;
      height: 42px;
      width: 40px;

      > span {
        background: #4b4b4b;
        display: block;
        height: 5px;
        width: 42px;
        position: absolute;
        top: 0;
        transition: 0.5s;
      }

      > span:nth-child(2) {
        top: 13px;
      }

      > span:nth-child(3) {
        top: 26px;
      }
    }
  }
}

.brc-page-header-mobile__menu {
  display: none;
  transform: translateY(-120%);
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  flex-direction: column;
  background-color: white;
  max-height: calc(100vh - 60px);
  overflow-y: scroll;
  z-index: 2147483678;
  transform-style: flat;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100vw;

  .brc-page-header-mobile-menu__title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .brc-page-header-mobile__close {
    display: block;
    margin: 7px 0 0 auto !important;
    position: relative;
    margin-left: auto;
    height: 42px;
    width: 40px;
    > span {
      display: block;
      height: 5px;
      width: 42px;
      position: absolute;
      top: 0;
      background: $red;
    }

    > span {
      transform: rotate(225deg);
      top: 14px;
    }

    > span:nth-child(2) {
      transform: rotate(135deg);
    }

    > span:nth-child(3) {
      transform: rotate(225deg);
    }
  }

  .brc-page-header-mobile__menu-user {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  &.brc-page-header-mobile__menu_visible {
    transform: none !important;
  }

  * {
    padding: 0 !important;
    padding-left: 0 !important;
  }

  > div + div {
    border-top: 1px solid $delimiter-light-color;
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
      font-size: 1rem;
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

  .brc-page-header-mobile__invite,
  .brc-page-header-mobile__ask {
    * {
      margin: 0 !important;
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

  @media (max-width: 900px) {
    display: flex !important;
  }
}
</style>