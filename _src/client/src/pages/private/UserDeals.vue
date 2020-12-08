<template>
  <main>
    <section class="brc-user-deals__wrapper brc-section__wrapper">
      <div class="brc-user-deals_menu">
        <div
          class="brc-user-deals_menu_item"
          :class="{ active: isActiveIndex('user-deals-contracts') }"
        >
          <nuxt-link :to="{ name: 'user-deals-contracts' }">Договоры</nuxt-link>
        </div>

        <div
          class="brc-user-deals_menu_item"
          :class="{ active: isActiveIndex('user-deals-sanitary') }"
        >
          <nuxt-link :to="{ name: 'user-deals-sanitary' }"
            >Сандокументы</nuxt-link
          >
        </div>

        <div
          class="brc-user-deals_menu_item"
          :class="{ active: isActiveIndex('user-deals-labaratory') }"
        >
          <nuxt-link :to="{ name: 'user-deals-labaratory' }"
            >Лаборатория</nuxt-link
          >
        </div>

        <div
          class="brc-user-deals_menu_item"
          :class="{ active: isActiveIndex('user-deals-disinfection') }"
        >
          <nuxt-link :to="{ name: 'user-deals-disinfection' }"
            >Дезработы</nuxt-link
          >
        </div>
      </div>
      <nuxt-child></nuxt-child>

      <LazyMyManager></LazyMyManager>

      <LazyMessageForm
        title="Отправить заказ"
        :mode="0"
        :show-close-btn="false"
        class="brc-user-deals__wrapper__messageform"
      ></LazyMessageForm>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UserDeals extends Vue {

  public isActiveIndex (routeName: string) {
    return this.$route.name === routeName
  }
}
</script>

<style lang="scss">
.brc-user-deals__wrapper {
  // display: grid;
  // grid-template-columns: 2fr 1fr;

  .brc-user-deals__wrapper__messageform {
    margin-top: 30px;
    @media (max-width: 768px) {
      margin-top: 15px;
    }
  }

  column-gap: 10px;
  .brc-user-deals_menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #f4f4f5;

    @media (max-width: 768px) {
      margin-left: -16px;
      margin-right: -16px;
    }

    .brc-user-deals_menu_item {
      flex: 1;
      text-align: center;
      padding: 10px;

      @media (max-width: 768px) {
        padding: 5px;
      }

      > a {
        color: $text-color;
        font-weight: 500;
        font-size: 0.9rem;

        @media (max-width: 768px) {
          text-decoration: underline;
          font-weight: 400;
          font-size: 0.8rem;
        }
      }
      &.active {
        background-color: $delimiter-strong-color;
        > a {
          color: white;
        }

        @media (max-width: 768px) {
          background-color: #f4f4f5;
          > a {
            //  font-size: 0.9rem;
            color: $text-color;
            text-decoration: none;
            border-bottom: 3px solid $red;
          }
        }
      }
    }
  }
}
</style>