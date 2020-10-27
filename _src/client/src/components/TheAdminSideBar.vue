<template>
  <nav
    id="adminNavigation"
    class="brc-admin-navigation__wrapper"
    :class="{ 'brc-admin-navigation_hidden': !sidebaropen }"
  >
    <b-menu>
      <b-menu-list>
        <b-menu-item
          tag="nuxt-link"
          label="Переход на Сайт"
          :to="{ name: 'main' }"
          target="_blank"
        ></b-menu-item>
        <b-menu-item
          tag="nuxt-link"
          label="Разделы сайта"
          :to="{ name: 'admin-site-sections' }"
        ></b-menu-item>
        <b-menu-item
          tag="nuxt-link"
          :to="{ name: 'admin-news' }"
          label="Новости"
        ></b-menu-item>
        <b-menu-item
          tag="nuxt-link"
          :to="{ name: 'admin-top-menu-list' }"
          label="Верхнее меню"
        ></b-menu-item>

        <b-menu-item
          icon="link"
          :active="isSettingsActive"
          :expanded="isSettingsActive"
          @click="isSettingsActive = !isSettingsActive"
        >
          <template slot="label" slot-scope="props">
            Справочники
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'menu-down' : 'menu-up'"
            ></b-icon>
          </template>

          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'admin-footer-settings' }"
            label="Услуги для Футера"
          ></b-menu-item>

          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'cl-activity-types' }"
            label="Виды деятельности"
          ></b-menu-item>
          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'admin-brands' }"
            label="Бренды"
          ></b-menu-item>
          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'admin-documents' }"
            label="Документы"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </nav>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({})
export default class TheAdminSideBar extends Vue {
  @Prop()
  private sidebaropen

  private isActive = false
  private isSettingsActive = false
}
</script>

<style lang="scss">
.brc-admin-navigation__wrapper {
  padding-top: 15px;
  transition: all 0.1s ease-in-out;
  width: 260px;
  transform: none;
  background-color: #2c3e50;

  a {
    text-decoration: none;
    outline: none;
    color: white;
    font-size: 14px;

    &:hover {
      color: $red;
    }
  }
}

.brc-admin-navigation_hidden {
  width: 0px;
  transform: translateX(-270px);
}
</style>
