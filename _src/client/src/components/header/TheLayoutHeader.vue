<template>
  <section>
    <header class="brc-page-header brc-page-header_mobile-hide">
      <div id="page-header" class="brc-page-header_mobile-hide">
        <TheHeaderLogo></TheHeaderLogo>
        <div id="brc-page-header-logon">
          <UserAuthHeader></UserAuthHeader>
        </div>

        <div id="brc-page-header-order">
          <TheHeaderCallMe></TheHeaderCallMe>
          <TheHeaderOrder></TheHeaderOrder>
        </div>
      </div>

      <nav id="brc-page-header-actions" class="brc-page-header_mobile-hide">
        <TheHeaderMenu></TheHeaderMenu>
        <div id="brc-page-header-invitetender">
          <TheHeaderAskQuestion class="p_small"></TheHeaderAskQuestion>
          <TheHeaderInviteTender class="p_small"></TheHeaderInviteTender>
        </div>
      </nav>
    </header>
    <TheHeaderMobileMenu></TheHeaderMobileMenu>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheHeaderMenu from '@/components/header/TheHeaderMenu.vue'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'
import TheHeaderMobileMenu from '@/components/header/TheHeaderMobileMenu.vue'
import TheHeaderCallMe from '@/components/header/TheHeaderCallMe.vue'
import TheHeaderOrder from '@/components/header/TheHeaderOrder.vue'
import TheHeaderAskQuestion from '@/components/header/TheHeaderAskQuestion.vue'
import TheHeaderInviteTender from '@/components/header/TheHeaderInviteTender.vue'
import TheHeaderLogo from '@/components/header/TheHeaderLogo.vue'



@Component({
  components: {
    TheHeaderMenu,
    UserAuthHeader,
    TheHeaderMobileMenu,
    TheHeaderOrder,
    TheHeaderCallMe,
    TheHeaderAskQuestion,
    TheHeaderInviteTender,
    TheHeaderLogo
  }
})
export default class TheLayoutHeader extends Vue {
  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

$header_margin_top: 15px;
.brc-page-header {
  margin-top: $header_margin_top;
  background-color: white;
}

#page-header {
  display: flex;
  flex-direction: row;
  align-items: center;

  #brc-page-header-logon {
    margin-left: auto;
  }

  #brc-page-header-order {
    display: flex;
    margin-left: 30px;
  }
}

.brc-page-header_mobile-hide {
  @media (max-width: 900px) {
    display: none !important;
  }
}

#brc-page-header-invitetender {
  display: flex;
}

#brc-page-header-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 114px;
  margin-top: -20px;
  white-space: nowrap;
  align-items: center;
}
</style>
