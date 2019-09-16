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
            <li class="brc-admin-navigation__item">
              <nuxt-link
                :to="{ name: 'admin-site-sections'}"
                class="brc-admin-navigation__item-link"
              >Подразделы</nuxt-link>
            </li>
            <li class="brc-admin-navigation__item">Услуги</li>
            <li class="brc-admin-navigation__item">
              <input
                id="toogleClientTypeMenuVisible"
                class="brc-admin-navigation__item-chk"
                type="checkbox"
              />
              <label
                class="brc-admin-navigation-list-arrow"
                for="toogleClientTypeMenuVisible"
              >Комплексные решения</label>
              <ul class="brc-admin-navigation__second-list">
                <li class="brc-admin-navigation__item">Для бизнеса</li>
                <li class="brc-admin-navigation__item">Для частных лиц</li>
              </ul>
            </li>
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
      box-shadow: 5px 0 5px -5px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      padding-top: 45vh;
      &:hover {
        background-color: #f0f0f0;
      }
      &:after {
        content: url("/images/arrow.svg");
        transform: rotate(180deg);
        display: inline-block;
      }
      &.brc-admin-navigation__lt_hidden {
        &:after {
          content: url("/images/arrow.svg");
          transform: rotate(0deg);
          display: inline-block;
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
        // &:hover {
        //   color: red;
        // }
      }
    }

    input {
      display: none;
      visibility: hidden;
    }
    label {
      display: inline;
    }

    .brc-admin-navigation__second-list {
      height: 0px;
      overflow: hidden;
      transition: height 0.5s;
    }

    .brc-admin-navigation-list-arrow {
      display: inline;
      cursor: pointer;
    }

    .brc-admin-navigation__item-chk:checked
      ~ .brc-admin-navigation__second-list {
      height: min-content;
    }

    .brc-admin-navigation-list-arrow:after {
      content: url("/images/arrow-small.svg");
      padding-left: 5px;
    }

    .brc-admin-navigation__item-chk:checked ~ .brc-admin-navigation-list-arrow {
      &:after {
        content: url("/images/arrow-small.svg");
        transform: rotate(90deg);
        display: inline-block;
      }
    }
  }
}
</style>
