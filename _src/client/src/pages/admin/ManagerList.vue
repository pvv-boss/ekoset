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
            <b-switch v-if="props.column.field == 'articleStatus'"></b-switch>

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
      <div
        class="my-manager-contacts__foto"
        style="width: 125px; height: 150px"
      >
        <img
          :src="`/img/managers/${showManagerPhot.managerId}`"
          onerror="this.onerror=null; this.src='/img/empty-image.png'"
        />
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Manager from '@/models/admin/Manager'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import { Context } from "@nuxt/types";
import { ServiceRegistry } from '@/ServiceRegistry'
import UserDealService from '@/services/UserDealService'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table/src/components/Table.vue')
  }
})
export default class ManagerList extends Vue {
  private managers: Manager[] = []
  private newManager = new Manager()
  private showManagerPhot = new Manager()
  private createNewMode = false
  private isShowPfoto = false

  private headerFields = [
    {
      field: 'addManagerFoto',
      label: 'Фото',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: 'managerName',
      label: 'ФИО'
    },
    {
      field: 'managerEmail',
      label: 'Почта (логи)'
    },
    {
      field: 'managerPhone',
      label: 'Телефон'
    },
    {
      field: 'managerRole',
      label: 'Роль'
    },

    {
      field: 'managerId',
      label: 'КодСотрудника',
      type: 'number',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: 'managerPermission',
      label: 'Права пользователя'
    },
    {
      field: 'managerStatus',
      label: 'Статус'
    },

  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: Context) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Сотрудники', link: 'admin-manager-list' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await ServiceRegistry.instance.getService(UserDealService).getManagers()
    return {
      managers: data
    }
  }


  private async addManagerFoto (imageFile: string, manager: Manager) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    await ServiceRegistry.instance.getService(UserDealService).saveManagerFoto(manager.managerId, formData)
  }

  private showManagerPhoto (manager: Manager) {
    this.isShowPfoto = true
    this.showManagerPhot = manager
  }

}
</script>

