<template>
  <nav class="brc-page-header-mobile-menu">
    <div class="brc-page-header-mobile-menu__user-auth">
      <UserAuthHeader></UserAuthHeader>
    </div>
    <div class="brc-page-header-mobile-menu__main-menu">
      <TheHeaderMenu></TheHeaderMenu>
    </div>
    <div class="brc-page-header-mobile-menu__actions">
      <TheHeaderActions></TheHeaderActions>
    </div>
    <div>
      <TheHeaderCallMe class="brc-page-header-mobile-menu__call-me"></TheHeaderCallMe>
    </div>
    <div>
      <TheHeaderOrder></TheHeaderOrder>
    </div>
  </nav>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheHeaderMenu from '@/components/header/TheHeaderMenu.vue'
import TheHeaderActions from '@/components/header/TheHeaderActions.vue'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'
import TheHeaderCallMe from '@/components/header/TheHeaderCallMe.vue'
import TheHeaderOrder from '@/components/header/TheHeaderOrder.vue'

@Component({
  components: {
    TheHeaderMenu,
    TheHeaderActions,
    UserAuthHeader,
    TheHeaderCallMe,
    TheHeaderOrder
  }
})
export default class TheHeaderMobileMenu extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-page-header-mobile-menu {
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: translateX(-120%);
  display: flex !important;
  flex-direction: column;

  border: 3px solid black;
  padding: 10px;
  background-color: #fff;
  transition: 0.3s;

  // width: min-content;
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
    border-top: 1px solid red;
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
    text-transform: none;
  }
  .brc-page-header__top-actions {
    * {
      display: block;
    }
  }
}
</style>