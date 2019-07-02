<template>
  <header class="brc-header">
    <nav class="navbar navbar-expand-lg navbar-light brc-top-menu">
      <div class="brc-top-menu__logo">
        <img src="/images/logo.png" alt="ГосТорги24" />
      </div>
      <div class="brc-top-menu__title">
        <div class="brc-top-menu__title-brand">
          <h1>Государственные торги по имуществу и земельным участкам</h1>
        </div>
        <div class="brc-top-menu__title-additional">
          <h4>
            Неофициальный сайт. Используются открытые данные сайта
            <a
              href="https://torgi.gov.ru/opendata/index.html"
              target="_blank"
            >https://torgi.gov.ru</a>
          </h4>
        </div>
      </div>
      <no-ssr>
        <UserAuthHeader></UserAuthHeader>
      </no-ssr>
    </nav>

    <nav id="headerMainMenuContainer" class="navbar navbar-expand-lg navbar-dark brc-sticky-menu">
      <button
        class="navbar-toggler brc-sticky-menu__toggler"
        type="button"
        data-toggle="collapse"
        data-target="#headerMainMenu"
        aria-controls="headerMainMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
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
  public isAdmin = true

  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }

  private mounted () {
    window.addEventListener('scroll', (event) => {
      const stickyHeader = document.getElementById('headerMainMenuContainer')
      if (stickyHeader) {
        if (window.pageYOffset > stickyHeader.offsetTop) {
          stickyHeader.classList.add('fixed-top')
        } else {
          stickyHeader.classList.remove('fixed-top')
        }
      }
    })
  }
}
</script>
