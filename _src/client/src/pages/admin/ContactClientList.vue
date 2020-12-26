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
            // initialSortBy: {field: 'articlePublishDate', type: 'desc'}
          }"
        >
          <template #table-row="props">
            <b-switch v-if="props.column.field == 'articleStatus'"></b-switch>

            <!-- <b-upload
              v-else-if="props.column.field == 'addSmallImage'"
              @input="addSmallImage(...arguments, props.row)"
            >
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload> -->

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
import EkosetClient from '@/models/EkosetClient'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table/src/components/Table.vue')
  }
})
export default class ContactClientList extends Vue {
  private ekosetClients: EkosetClient[] = []
  private newManager = new EkosetClient()
  private createNewMode = false

  private headerFields = [
    {
      field: 'personId',
      label: 'Код',
      type: 'number',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: 'personName',
      label: 'ФИО'
    },
    {
      field: 'personPhone',
      label: 'Телефон'
    },

    {
      field: 'personEmail',
      label: 'E-Mail'
    }

  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: Context) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Контактные лица', link: 'admin-clients-list' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await ServiceRegistry.instance.getService(UserDealService).getClients()
    return {
      ekosetClients: data
    }
  }

}
</script>

