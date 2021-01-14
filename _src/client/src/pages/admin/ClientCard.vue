<template>
  <div class="brc-admin_page_wrapper">
    <div v-if="$fetchState.pending">Загрузка данных...</div>
    <BaseCard v-if="!$fetchState.pending">
      <template #header>
        <div>
          <span>ФИО: </span>
          <span>{{ ekosetClient.personName }}</span>
        </div>
        <div>
          <span>Телефон: </span>
          <span>{{ ekosetClient.personPhone }}</span>
        </div>
        <div>
          <span>E-mail: </span>
          <span>{{ ekosetClient.personEmail }}</span>
        </div>
        <div>
          <span>Код: </span>
          <span>{{ ekosetClient.personId }}</span>
        </div>
        <div>
          <span>Статус: </span>
          <span>{{ !!ekosetClient.appUserId ? "Активен" : "Не активен" }}</span>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Основные"> </b-tab-item>

          <b-tab-item label="Контрагенты">
            <vue-good-table
              :columns="agentsHeaderFields"
              :rows="contragentList"
              :fixed-header="true"
              :sort-options="{
                enabled: true, //,
              }"
            >
              <template #table-row="props">
                <span>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </b-tab-item>

          <b-tab-item label="Договоры">
            <vue-good-table
              :columns="contractHeaderFields"
              :rows="contractList"
              :fixed-header="true"
              :sort-options="{
                enabled: true, //,
              }"
            >
              <template #table-row="props">
                <span>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </b-tab-item>

          <b-tab-item label="Сандокументы">
            <vue-good-table
              :columns="sandocHeaderFields"
              :rows="sandocList"
              :fixed-header="true"
              :sort-options="{
                enabled: true, //,
              }"
            >
              <template #table-row="props">
                <span>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </b-tab-item>

          <b-tab-item label="Лаборатория">
            <vue-good-table
              :columns="labHeaderFields"
              :rows="labList"
              :fixed-header="true"
              :sort-options="{
                enabled: true, //,
              }"
            >
              <template #table-row="props">
                <span>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </b-tab-item>

          <b-tab-item label="Дезработы">
            <vue-good-table
              :columns="labHeaderFields"
              :rows="dezList"
              :fixed-header="true"
              :sort-options="{
                enabled: true, //,
              }"
            >
              <template #table-row="props">
                <span>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import Contract from '@/models/deal/Contract'
import SanDoc from '@/models/deal/SanDoc'
import Work from '@/models/deal/Work'
import EkosetClient from '@/models/EkosetClient'
import { ServiceRegistry } from '@/ServiceRegistry'
import UserService from '@/services/UserService'
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table/src/components/Table.vue')
  }
})
export default class ClientCard extends Vue {
  private layout () {
    return 'admin'
  }

  @Prop()
  private clientId

  private activeTab = 0
  private contractList: Contract[] = []
  private sandocList: SanDoc[] = []
  private labList: Work[] = []
  private dezList: Work[] = []
  private contragentList = []
  private ekosetClient = new EkosetClient()

  private agentsHeaderFields = [
    {
      field: 'clientName',
      label: 'Клиент',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: 'clientInn',
      label: 'ИНН',
      tdClass: 'brc-admin-centered-td'
    }
  ]

  private contractHeaderFields = [
    {
      field: 'contractForm',
      label: 'Номер',
      type: 'number',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: (rowObj) => {
        return rowObj.contractDateStart ? (new Date(rowObj.contractDateStart)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата начала',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',
    },
    {
      field: (rowObj) => {
        return rowObj.contractDateEnd ? (new Date(rowObj.contractDateEnd)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата окончания',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },

    {
      field: 'contractAddress',
      label: 'Адрес'
    },

    {
      field: 'contractServiceList',
      label: 'Услуги'
    },

    {
      field: 'clientInn',
      label: 'ИНН клиента'
    },

    {
      field: 'clientName',
      label: 'Клиент'
    }
  ]

  private labHeaderFields = [
    {
      field: 'contractForm',
      label: 'Номер договора',
      type: 'number',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: (rowObj) => {
        return rowObj.contractDateStart ? (new Date(rowObj.contractDateStart)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата начала (договора)',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },
    {
      field: (rowObj) => {
        return rowObj.contractDateEnd ? (new Date(rowObj.contractDateEnd)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата окончания (договора)',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },

    {
      field: 'contractAddress',
      label: 'Адрес'
    },

    {
      field: 'sheldServiceName',
      label: 'Наименование'
    },

    {
      field: (rowObj) => {
        return rowObj.sheldServiceDate ? (new Date(rowObj.sheldServiceDate)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата проведения ',
      //      field: 'sheldServiceDate',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',
    }
    ,

    {
      field: 'sheldServiceNewDate',
      label: 'Новая дата проведения ',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',
    },

    {
      field: 'clientName',
      label: 'Клиент'
    }
    ,

    {
      field: 'sheldServiceBall',
      label: 'Оценка'
    }
  ]

  private sandocHeaderFields = [
    {
      field: 'contractForm',
      label: 'Номер договора',
      type: 'number',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: (rowObj) => {
        return rowObj.contractDateStart ? (new Date(rowObj.contractDateStart)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата начала (договора)',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },
    {
      field: (rowObj) => {
        return rowObj.contractDateEnd ? (new Date(rowObj.contractDateEnd)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Дата окончания (договора)',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },

    {
      field: 'contractAddress',
      label: 'Адрес'
    },

    {
      field: 'documentName',
      label: 'Документ'
    },

    {
      field: 'documentNmb',
      label: 'Номер документа'
    },

    {
      field: (rowObj) => {
        return rowObj.documentDateStart ? (new Date(rowObj.documentDateStart)).toLocaleDateString('ru-RU') : ''
      },

      label: 'Действует с',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },
    {
      field: (rowObj) => {
        return rowObj.documentDateEnd ? (new Date(rowObj.documentDateEnd)).toLocaleDateString('ru-RU') : ''
      },
      label: 'Действует по',
      type: 'date',
      dateInputFormat: 'dd.mm.yyyy',
      dateOutputFormat: 'dd.mm.yyyy',

    },
    {
      field: 'clientName',
      label: 'Клиент'
    }
  ]


  private async fetch () {
    this.contractList = await ServiceRegistry.instance.getService(UserService).getContracts(this.clientId)
    this.sandocList = await ServiceRegistry.instance.getService(UserService).getSanDocsList(this.clientId)
    this.labList = await ServiceRegistry.instance.getService(UserService).getLabaratoryList(this.clientId)
    this.dezList = await ServiceRegistry.instance.getService(UserService).getDesworkList(this.clientId)
    this.contragentList = await ServiceRegistry.instance.getService(UserService).getСontragentList(this.clientId)
    this.ekosetClient = await ServiceRegistry.instance.getService(UserService).getEkosetClient(this.clientId)
  }

}
</script>

<style lang="scss">
</style>





