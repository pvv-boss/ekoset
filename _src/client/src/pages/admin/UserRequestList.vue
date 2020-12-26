a<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Заявки</h2>
        </div>
      </template>

      <template #content>
        <vue-good-table
          :columns="headerFields"
          :rows="data"
          :search-options="{
            enabled: true,
            placeholder: 'Фильтр по всем полям',
          }"
          :fixed-header="true"
          :sort-options="{
            enabled: true,
          }"
        >
          <template #table-row="props">
            <div
              v-if="props.column.field == 'files'"
              v-html="downLoadFilesHtml(props.row)"
            ></div>

            <span v-else>{{ props.formattedRow[props.column.field] }}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
export default class UserRequestList extends Vue {

  private data = []

  private headerFields = [
    {
      label: 'Дата',
      field: (rowObj) => {
        return rowObj.userRequestDate ? (new Date(rowObj.userRequestDate)).toLocaleDateString('ru-RU') : ''
      }
    },
    {
      field: 'userRequestType',
      label: 'Тип обращения'
    },
    {
      field: 'userRequestUser',
      label: 'Клиент'
    },

    {
      field: 'userRequestPhone',
      label: 'Контактный телефон'
    },
    {
      field: 'userRequestMail',
      label: 'Почта'
    },
    {
      field: 'userRequestSection',
      label: 'Подраздел'
    },
    {
      field: 'userRequestService',
      label: 'Услуги'
    },
    {
      field: 'userRequestText',
      label: 'Комментарий'
    },
    {
      field: 'files',
      label: 'Файлы'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: Context) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Заявки (с контактных форм)', link: 'admin-request-list' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await ServiceRegistry.instance.getService(UserDealService).getUsersRequests()
    return {
      data
    }
  }

  private downLoadFilesHtml (rowObj: any) {
    const res: string[] = []
    if (!!rowObj.files && rowObj.files.length) {
      let fileNmb = 1;
      for (const iterFile of rowObj.files) {
        if (!!iterFile) {
          const href = `<a href = '/app/requests/${iterFile}'>Файл - ${fileNmb}</a>`
          res.push(href)
          fileNmb++
        }
      }
      return res.join('<br>');
    }
  }
}
</script>

