<template>
  <div v-show="!loading" class="brc-page-container brc-page-container_admin">
    <!-- <TheLayoutHeader></TheLayoutHeader> -->
    <main class="brc-body brc-body_admin">
      <div class="brc-admin-navigation__wrapper">
        <nav
          class="brc-admin-navigation"
          id="adminNavigation"
          :class="{'brc-admin-navigation_hidden': !isVisibleNavigation}"
        >
          <nuxt-link :to="{name: 'main'}" class="brc-logo_main" id="brc-page-header-main-logo">
            <img src="/images/logo.png" alt="Экосеть" />
          </nuxt-link>
          <ul class="brc-admin-navigation__list">
            <li class="brc-admin-navigation__item">Разделы</li>
            <li class="brc-admin-navigation__item">Услуги</li>
            <li class="brc-admin-navigation__item">Комплексные решения</li>
            <li class="brc-admin-navigation__item">Инд. предложения</li>
            <li class="brc-admin-navigation__item">
              <nuxt-link :to="{ name: 'admin-news'}" class="brc-admin-navigation__item-link">Новости</nuxt-link>
            </li>
            <li class="brc-admin-navigation__item">Клиенты</li>
            <li class="brc-admin-navigation__item">Контакты</li>
            <li class="brc-admin-navigation__item">О компании</li>
            <li class="brc-admin-navigation__item">Настройки футера</li>
          </ul>
        </nav>
        <div
          class="brc-admin-navigation__lt"
          @click="toogleNavigation"
          :class="{'brc-admin-navigation__lt_hidden': !isVisibleNavigation}"
        ></div>
      </div>
      <nuxt></nuxt>
    </main>
    <!-- <TheLayoutFooter v-if="!loading"></TheLayoutFooter> -->
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheLayoutHeader from '@/components/header/TheLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'


@Component({
  components: {
    TheLayoutHeader,
    TheLayoutFooter
  }
})
export default class AdminLayout extends Vue {
  private loading = true
  private isVisibleNavigation = true

  private mounted () {
    this.$nextTick(() => {
      this.checkLoading()
    })
  }

  private toogleNavigation () {
    this.isVisibleNavigation = !this.isVisibleNavigation
  }

  private checkLoading () {
    const el = document.getElementsByClassName('brc-body')
    if (el && el.length > 0) {
      this.loading = false
    } else {
      setTimeout(this.checkLoading, 1500)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";
.brc-page-container_admin {
  max-width: 100% !important;
  padding: 0 !important;
}
.brc-body_admin {
  display: flex;
  flex-direction: row !important;
  max-width: 100% !important;
  margin: 0 !important;

  .brc-admin-navigation__wrapper {
    display: flex;
    flex-direction: row;
    img {
      max-width: 150px !important;
      margin: 10px !important;
    }

    .brc-admin-navigation_hidden {
      display: none;
    }

    .brc-admin-navigation__lt {
      width: 15px;
      text-align: center;
      background-color: #f0f0f0;
      box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      padding-top: 45vh;
      &:after {
        content: "\25c4";
      }
      &.brc-admin-navigation__lt_hidden {
        &:after {
          content: "\25ba";
        }
      }
    }
  }
  .brc-admin-navigation {
    .brc-admin-navigation__list {
      list-style-type: none;
      .brc-admin-navigation__item {
        padding: 10px;
        white-space: nowrap;
        &:hover {
          background-color: #f0f0f0;
        }
      }
    }
  }
}
</style>
