<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Контактные лица</h2>
        </div>
      </template>

      <template #content>
        <vue-good-table
          :columns="headerFields"
          :rows="ekosetClients"
          :fixed-header="true"
          :sort-options="{
            enabled: true, //,
          }"
        >
          <template #table-row="props">
            <span v-if="props.column.field == 'personStatus'">
              {{ statusText(props.row) }}
            </span>

            <div v-if="props.column.field == 'personAction'" style="display: flex; align-items: center">
              <b-button
                v-if="props.column.field == 'personAction' && !isUserActive(props.row) && !!props.row.personEmail"
                icon-right="content-copy"
                type="is-info"
                size="is-small"
                outlined
                style="margin-left: 15px"
                @click="activateClient(props.row)"
                >Активировать</b-button
              >

              <b-button
                v-if="props.column.field == 'personAction' && isUserActive(props.row) && !!props.row.personEmail"
                type="is-danger"
                icon-right="delete"
                size="is-small"
                style="margin-left: 15px"
                @click="deactivateClient(props.row)"
                >Блокировать</b-button
              >
            </div>

            <nuxt-link
              v-else-if="props.column.field == 'personName'"
              :to="{
                name: 'admin-client-card',
                params: { clientId: props.row.personId },
              }"
              >{{ props.row.personName }}</nuxt-link
            >
            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import AdminStore from "@/store/AdminStore";
import { Context } from "@nuxt/types";
import { ServiceRegistry } from "@/ServiceRegistry";
import UserDealService from "@/services/UserDealService";
import UserService from "@/services/UserService";
import EkosetClient from "@/models/EkosetClient";

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ "vue-good-table/src/components/Table.vue"),
  },
})
export default class ContactClientList extends Vue {
  private ekosetClients: EkosetClient[] = [];
  private newManager = new EkosetClient();
  private createNewMode = false;

  private headerFields = [
    {
      field: "personId",
      label: "Код",
      type: "number",
      tdClass: "brc-admin-centered-td",
    },
    {
      field: "personName",
      label: "ФИО",
    },
    {
      field: "personPhone",
      label: "Телефон",
    },

    {
      field: "personEmail",
      label: "E-Mail",
    },

    {
      field: "personStatus",
      label: "Статус",
    },
    {
      field: "personAction",
      label: "Действие",
    },
  ];

  private layout() {
    return "admin";
  }

  private isUserActive(client: EkosetClient) {
    return !!client.appUserId && client.appUserBlockedInd === 0;
  }

  private statusText(client: EkosetClient) {
    if (!client.personEmail) {
      return "Нет адреса";
    }
    return this.isUserActive(client) ? "Активен" : "Блокирован";
  }

  private async asyncData(context: Context) {
    const breadCrumbList: any[] = [];
    breadCrumbList.push({ name: "Администрирование", link: "admin" });
    breadCrumbList.push({ name: "Контактные лица", link: "admin-clients-list" });
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList);

    const data = await ServiceRegistry.instance.getService(UserDealService).getClients();
    return {
      ekosetClients: data,
    };
  }

  private async refreshData() {
    this.ekosetClients = await ServiceRegistry.instance.getService(UserDealService).getClients();
  }

  private async activateClient(client: EkosetClient) {
    await ServiceRegistry.instance.getService(UserService).activateEkosetClient(client.personId);
    await this.refreshData();
  }

  private async deactivateClient(client: EkosetClient) {
    await ServiceRegistry.instance.getService(UserService).deactivateEkosetClient(client.appUserId);
    await this.refreshData();
  }
}
</script>
