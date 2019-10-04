<template>
  <nav
    class="brc-admin-navigation"
    id="adminNavigation"
    :class="{'brc-admin-navigation_hidden': !isVisibleNavigation}"
  >
    <ul class="brc-admin-navigation__list">
      <li class="brc-admin-navigation__item">
        <nuxt-link
          :to="{ name: 'admin-site-sections'}"
          class="brc-admin-navigation__item-link"
        >Подразделы</nuxt-link>
      </li>
      <li class="brc-admin-navigation__item">
        <nuxt-link :to="{ name: 'admin-services'}" class="brc-admin-navigation__item-link">Услуги</nuxt-link>
      </li>
      <li class="brc-admin-navigation__item">
        <nuxt-link
          :to="{ name: 'admin-individual-offers'}"
          class="brc-admin-navigation__item-link"
        >Инд. предложения</nuxt-link>
      </li>
      <li class="brc-admin-navigation__item">
        <nuxt-link :to="{ name: 'admin-news'}" class="brc-admin-navigation__item-link">Новости</nuxt-link>
      </li>

      <li class="brc-admin-navigation__item">
        <input id="toogleClMenuVisible" class="brc-admin-navigation__item-chk" type="checkbox" />
        <label class="brc-admin-navigation-list-arrow" for="toogleClMenuVisible">Справочники</label>
        <ul class="brc-admin-navigation__second-list">
          <li class="brc-admin-navigation__item">
            <nuxt-link :to="{ name: 'admin-brands'}" class="brc-admin-navigation__item-link">Бренды</nuxt-link>
          </li>
          <li class="brc-admin-navigation__item">
            <nuxt-link
              :to="{ name: 'cl-partner-groups'}"
              class="brc-admin-navigation__item-link"
            >Группы клиентов</nuxt-link>
          </li>
          <li class="brc-admin-navigation__item">
            <nuxt-link
              :to="{ name: 'admin-clients'}"
              class="brc-admin-navigation__item-link"
            >Клиенты</nuxt-link>
          </li>
          <li class="brc-admin-navigation__item">
            <nuxt-link
              :to="{ name: 'cl-activity-types'}"
              class="brc-admin-navigation__item-link"
            >Направления деятельности</nuxt-link>
          </li>
        </ul>
      </li>
      <li class="brc-admin-navigation__item">
        <input
          id="toogleSettingsMenuVisible"
          class="brc-admin-navigation__item-chk"
          type="checkbox"
        />
        <label class="brc-admin-navigation-list-arrow" for="toogleSettingsMenuVisible">Настройки</label>
        <ul class="brc-admin-navigation__second-list">
          <li class="brc-admin-navigation__item">
            <nuxt-link
              :to="{ name: 'admin-footer-settings'}"
              class="brc-admin-navigation__item-link"
            >Футер</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminLeftMenu extends Vue {

}
</script>


<style lang="scss">
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

  .brc-admin-navigation__item-chk:checked ~ .brc-admin-navigation__second-list {
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
</style>