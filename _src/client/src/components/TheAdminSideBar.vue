<template>
  <nav
    class="brc-admin-navigation__wrapper"
    id="adminNavigation"
    :class="{'brc-admin-navigation_hidden': !sidebaropen}"
  >
    <b-menu>
      <b-menu-list>
        <b-menu-item tag="nuxt-link" label="Разделы сайта" :to="{ name: 'admin-site-sections'}"></b-menu-item>
        <!-- <b-menu-item tag="nuxt-link" :to="{ name: 'admin-services'}" label="Услуги"></b-menu-item>
        <b-menu-item
          tag="nuxt-link"
          :to="{ name: 'admin-individual-offers'}"
          label="Инд. предложения"
        ></b-menu-item>
        <b-menu-item tag="nuxt-link" :to="{ name: 'admin-news'}" label="Новости"></b-menu-item>-->

        <!-- <b-menu-item
          icon="settings"
          :active="isActive"
          :expanded="isActive"
          @click="isActive = !isActive"
        >
          <template slot="label" slot-scope="props">
            Справочники
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
        </template>-->
        <b-menu-item tag="nuxt-link" :to="{ name: 'admin-news'}" label="Новости"></b-menu-item>

        <b-menu-item tag="nuxt-link" :to="{ name: 'admin-brands'}" label="Бренды"></b-menu-item>
        <b-menu-item tag="nuxt-link" :to="{ name: 'admin-clients'}" label="Клиенты"></b-menu-item>
        <!-- </b-menu-item> -->

        <b-menu-item
          icon="link"
          :active="isSettingsActive"
          :expanded="isSettingsActive"
          @click="isSettingsActive = !isSettingsActive"
        >
          <template slot="label" slot-scope="props">
            Настройки
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>

          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'admin-footer-settings'}"
            label="Услуги для Футера"
          ></b-menu-item>

          <b-menu-item tag="nuxt-link" :to="{ name: 'cl-partner-groups'}" label="Группы клиентов"></b-menu-item>
          <b-menu-item
            tag="nuxt-link"
            :to="{ name: 'cl-activity-types'}"
            label="Направления деятельности"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </nav>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({})
export default class TheAdminSideBar extends Vue {
  @Prop()
  private sidebaropen

  private isActive = false
  private isSettingsActive = false
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-admin-navigation__wrapper {
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
