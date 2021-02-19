<template>
  <nav id="adminNavigation" class="brc-admin-navigation__wrapper" :class="{ 'brc-admin-navigation_hidden': !sidebaropen }">
    <b-menu>
      <b-menu-list>
        <b-menu-item tag="nuxt-link" label="Переход на Сайт" :to="{ name: 'main' }" target="_blank"></b-menu-item>

        <b-menu-item
          icon="link"
          :active="isContentEnabled"
          :expanded="isContentEnabled"
          @click="isContentEnabled = !isContentEnabled"
        >
          <template slot="label" slot-scope="props">
            Контент
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>

          <b-menu-item
            v-if="isMenuItemVisile('Разделы сайта')"
            tag="nuxt-link"
            label="Разделы сайта"
            :to="{ name: 'admin-site-sections' }"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Верхнее меню')"
            tag="nuxt-link"
            :to="{ name: 'admin-top-menu-list' }"
            label="Верхнее меню"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Услуги для Футера')"
            tag="nuxt-link"
            :to="{ name: 'admin-footer-settings' }"
            label="Услуги для Футера"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Новости')"
            tag="nuxt-link"
            :to="{ name: 'admin-news' }"
            label="Новости"
          ></b-menu-item>
        </b-menu-item>

        <b-menu-item
          icon="link"
          :active="isSettingsActive"
          :expanded="isSettingsActive"
          @click="isSettingsActive = !isSettingsActive"
        >
          <template slot="label" slot-scope="props">
            Справочники
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>

          <b-menu-item
            v-if="isMenuItemVisile('Виды деятельности')"
            tag="nuxt-link"
            :to="{ name: 'cl-activity-types' }"
            label="Виды деятельности"
          ></b-menu-item>
          <b-menu-item
            v-if="isMenuItemVisile('Бренды')"
            tag="nuxt-link"
            :to="{ name: 'admin-brands' }"
            label="Бренды"
          ></b-menu-item>
          <b-menu-item
            v-if="isMenuItemVisile('Документы')"
            tag="nuxt-link"
            :to="{ name: 'admin-documents' }"
            label="Документы"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Прайс-лист')"
            label="Прайс-лист"
            @click="showNotFoundPopup('Будет реализовано в доработках по ранее предоставленному заданию')"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Сотрудники')"
            tag="nuxt-link"
            :to="{ name: 'admin-manager-list' }"
            label="Сотрудники"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Контактные лица')"
            tag="nuxt-link"
            :to="{ name: 'admin-clients-list' }"
            label="Контактные лица"
          ></b-menu-item>
        </b-menu-item>

        <b-menu-item
          v-if="isMenuItemVisile('Заявки')"
          tag="nuxt-link"
          :to="{ name: 'admin-request-list' }"
          label="Заявки"
        ></b-menu-item>

        <b-menu-item icon="link" :active="isAdminActive" :expanded="isAdminActive" @click="isAdminActive = !isAdminActive">
          <template slot="label" slot-scope="props">
            Администрирование
            <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
          </template>

          <b-menu-item
            v-if="isMenuItemVisile('Контактные формы')"
            label="Контактные формы"
            @click="showNotFoundPopup()"
          ></b-menu-item>
          <b-menu-item v-if="isMenuItemVisile('Соцсети')" label="Соцсети" @click="showNotFoundPopup()"></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Почтовый сервер')"
            label="Почтовый сервер"
            @click="showNotFoundPopup('Будет реализовано в доработках после уточнения задачи')"
          ></b-menu-item>

          <b-menu-item
            v-if="isMenuItemVisile('Обмен данными с Access')"
            label="Обмен данными с Access"
            @click="showNotFoundPopup()"
          ></b-menu-item>

          <b-menu-item v-if="isMenuItemVisile('Логи')" label="Логи" @click="showNotFoundPopup('В работе')"></b-menu-item>
        </b-menu-item>

        <b-menu-item label="Выход" :to="{ name: 'main' }" @click="logout"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </nav>
</template>

<script lang="ts">
import { AdminMenuSectionPermissionsManager } from "@/models/AdminMenuSectionPermissionsManager";
import { ServiceRegistry } from "@/ServiceRegistry";
import { AuthService } from "@/services/AuthService";
import { Component, Vue, Prop } from "nuxt-property-decorator";
import BaseNotImplementForm from "./base/BaseNotImplementForm.vue";

@Component({})
export default class TheAdminSideBar extends Vue {
  @Prop()
  private sidebaropen;

  private isActive = false;
  private isSettingsActive = false;

  isAdminActive = false;
  isContentEnabled = false;

  showNotFoundPopup(message = "В работе") {
    this.$modalManager.modalShow(BaseNotImplementForm, { message: message }, {});
  }

  private async logout() {
    await ServiceRegistry.instance.getService(AuthService).logoff();
    this.$router.push({ name: "main" });
  }

  private isMenuItemVisile(caption: string) {
    return AdminMenuSectionPermissionsManager.existsOnCurrentUser(caption);
  }
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
