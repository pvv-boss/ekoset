<template>
  <div class="brc-service-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Клиенты</h1>
    <button @click="createNewClientMode = true" v-show="!createNewClientMode">Создать клиента</button>

    <div v-if="createNewClientMode">
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Наименование</div>
        <input type="text" v-model="newClient.partnerName" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Группа</div>
        <AdminPartnerGroupSelector v-model.number="newClient.partnerGroupId"></AdminPartnerGroupSelector>
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newClient.partnerPriority" />
      </div>
      <button @click="saveNewClient">Сохранить</button>
      <button @click="cancelSaveNewClient">Отменить</button>
    </div>
    <vue-good-table :columns="headerFields" :rows="clientItems">
      <template slot="table-row" slot-scope="props">
        <nuxt-link
          v-if="props.column.field == 'partnerName'"
          :to="{ name: 'admin-client-card', params: { client: props.row.partnerId}}"
        >{{props.row.partnerName}}</nuxt-link>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import Partner from '@/models/ekoset/Partner'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminPartnerGroupSelector from '@/components/admin/AdminPartnerGroupSelector.vue'


@Component({
  components: {
    BreadCrumbs,
    AdminPartnerGroupSelector
  }
})
export default class AdminClientList extends Vue {
  private clientItems: Partner[] = []
  private createNewClientMode = false
  private newClient: Partner = new Partner()
  private breadCrumbList: any[] = []
  private headerFields = [
    {
      field: 'partnerGroupName',
      label: 'Группа'
    },
    {
      field: 'partnerName',
      label: 'Наименование'
    },
    {
      field: 'partnerPriority',
      label: 'Приоритет'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const clientItems = getServiceContainer().publicEkosetService.getPartners()

    const data = await Promise.all([clientItems])
    return {
      clientItems: data[0]
    }
  }

  private async saveNewClient () {
    await getServiceContainer().publicEkosetService.savePartner(this.newClient)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newClient = new Partner()
    this.createNewClientMode = false
  }

  private cancelSaveNewClient () {
    this.newClient = new Partner()
    this.createNewClientMode = false
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Клиенты', link: 'admin-clients' })
  }
}
</script>




