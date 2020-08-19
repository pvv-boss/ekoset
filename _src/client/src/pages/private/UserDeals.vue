<template>
  <section class="brc-user-deals__wrapper">
    <div>
      <div class="brc-user-deals_menu">
        <div
          class="brc-user-deals_menu_item"
          :class="{active: isActiveIndex ('user-deals-contracts')}"
        >
          <nuxt-link :to="{name:'user-deals-contracts'}">Договоры</nuxt-link>
        </div>
        <div
          class="brc-user-deals_menu_item"
          :class="{active: isActiveIndex ('user-deals-labaratory')}"
        >
          <nuxt-link :to="{name:'user-deals-labaratory'}">Лаборатория</nuxt-link>
        </div>
        <div
          class="brc-user-deals_menu_item"
          :class="{active: isActiveIndex ('user-deals-sanitary')}"
        >
          <nuxt-link :to="{name:'user-deals-sanitary'}">Сандокументы</nuxt-link>
        </div>
        <div
          class="brc-user-deals_menu_item"
          :class="{active: isActiveIndex ('user-deals-disinfection')}"
        >
          <nuxt-link :to="{name:'user-deals-disinfection'}">Дезработы</nuxt-link>
        </div>
      </div>
      <nuxt-child></nuxt-child>
    </div>

    <div>
      <div class="brc-user-deals-right-item">Сваязь с менеджером</div>
      <div class="brc-user-deals-right-item">Отправить заказ</div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'

@Component
export default class UserDeals extends Vue {

  public isActiveIndex (routeName: string) {
    return this.$route.name === routeName
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-user-deals__wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 10px;
  .brc-user-deals_menu {
    display: flex;
    flex-direction: row;
    background-color: #f4f4f5;

    .brc-user-deals_menu_item {
      flex: 1;
      text-align: center;
      padding: 10px;
      > a {
        color: $text-color;
        font-weight: 500;
        font-size: 0.9rem;
      }
      &.active {
        background-color: $delimiter-strong-color;
        > a {
          color: white;
        }
      }
    }
  }

  .brc-user-deals-right-item {
    border: 1px solid $delimiter-strong-color;
    height: 300px;
  }

  .brc-user-deals-right-item + .brc-user-deals-right-item {
    margin-top: 15px;
  }
}
</style>