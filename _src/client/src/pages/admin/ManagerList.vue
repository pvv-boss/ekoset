/* eslint-disable no-undef */
<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Сотрудники (менеджеры)</h2>
        </div>
      </template>

      <template #content>
        <vue-good-table
          :columns="headerFields"
          :rows="managers"
          :fixed-header="true"
          :sort-options="{
            enabled: true, //,
            // initialSortBy: {field: 'articlePublishDate', type: 'desc'}
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field == 'managerStatus'">
              {{ statusText(props.row) }}
            </span>
            <b-button
              v-if="props.column.field == 'managerStatus' && !isUserActive(props.row) && !!props.row.managerEmail"
              icon-right="content-copy"
              type="is-info"
              size="is-small"
              outlined
              style="margin-left: 15px"
              @click="activateManager(props.row)"
              >Активировать</b-button
            >

            <b-button
              v-if="props.column.field == 'managerStatus' && isUserActive(props.row) && !!props.row.managerEmail"
              type="is-danger"
              icon-right="delete"
              size="is-small"
              style="margin-left: 15px"
              @click="deactivateManager(props.row)"
              >Блокировать</b-button
            >

            <div v-else-if="props.column.field == 'addManagerFoto'">
              <b-upload @input="addManagerFoto(...arguments, props.row)">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                </a>
              </b-upload>

              <b-button
                icon-right="file-find"
                type="is-success"
                size="is-small"
                outlined
                style="margin-left: 15px"
                @click="showManagerPhoto(props.row)"
              ></b-button>
            </div>
            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>

    <b-modal :active.sync="isShowPfoto" :can-cancel="true" :width="200">
      <div class="my-manager-contacts__foto" style="width: 125px; height: 150px">
        <img :src="`/img/managers/${showManagerPhot.managerId}`" onerror="this.onerror=null; this.src='/img/empty-image.png'" />
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import EkosetManager from "@/models/EkosetManager";
import { getModule } from "vuex-module-decorators";
import AdminStore from "@/store/AdminStore";
import { Context } from "@nuxt/types";
import { ServiceRegistry } from "@/ServiceRegistry";
import UserDealService from "@/services/UserDealService";
import UserService from "@/services/UserService";

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ "vue-good-table/src/components/Table.vue"),
  },
})
export default class ManagerList extends Vue {
  private managers: EkosetManager[] = [];
  private newManager = new EkosetManager();
  private showManagerPhot = new EkosetManager();
  private createNewMode = false;
  private isShowPfoto = false;

  private headerFields = [
    {
      field: "addManagerFoto",
      label: "Фото",
      tdClass: "brc-admin-centered-td",
    },
    {
      field: "managerName",
      label: "ФИО",
    },
    {
      field: "managerEmail",
      label: "Почта (логин)",
    },
    {
      field: "managerPhone",
      label: "Телефон",
    },
    {
      field: "managerRole",
      label: "Роль",
    },

    {
      field: "managerId",
      label: "КодСотрудника",
      type: "number",
      tdClass: "brc-admin-centered-td",
    },
    {
      field: "managerPermission",
      label: "Права пользователя",
    },
    {
      field: "managerStatus",
      label: "Статус",
    },
  ];

  private layout() {
    return "admin";
  }

  private async asyncData(context: Context) {
    const breadCrumbList: any[] = [];
    breadCrumbList.push({ name: "Администрирование", link: "admin" });
    breadCrumbList.push({ name: "Сотрудники", link: "admin-manager-list" });
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList);

    const data = await ServiceRegistry.instance.getService(UserDealService).getManagers();
    return {
      managers: data,
    };
  }

  private isUserActive(manager: EkosetManager) {
    return !!manager.appUserId;
  }

  private statusText(manager: EkosetManager) {
    if (!manager.managerEmail) {
      return "Не указан почтовый адрес!";
    }
    return this.isUserActive(manager) ? "Активен" : "Блокирован";
  }

  private async addManagerFoto(imageFile: string, manager: EkosetManager) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    await ServiceRegistry.instance.getService(UserDealService).saveManagerFoto(manager.managerId, formData);
  }

  private showManagerPhoto(manager: EkosetManager) {
    this.isShowPfoto = true;
    this.showManagerPhot = manager;
  }

  private async activateManager(manager: EkosetManager) {
    await ServiceRegistry.instance.getService(UserService).activateEkosetManager(manager.managerId);
    await this.refreshData();
  }

  private async deactivateManager(manager: EkosetManager) {
    await ServiceRegistry.instance.getService(UserService).deactivateEkosetManager(manager.appUserId);
    await this.refreshData();
  }

  private async refreshData() {
    this.managers = await ServiceRegistry.instance.getService(UserDealService).getManagers();
  }
}
</script>
