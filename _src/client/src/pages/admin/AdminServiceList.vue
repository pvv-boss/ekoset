<template>
  <div class="brc-service-list_wrapper">
    <h1>Услуги</h1>
    <button @click="createNewServiceMode = true" v-show="!createNewServiceMode">Создать услугу</button>

    <div v-if="createNewServiceMode">
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Наименование</div>
        <input type="text" v-model="newService.businessServiceName" />
      </div>
      <div class="brc-service-attribute" v-if="siteSectionList.length > 0">
        <div class="brc-service-attribute__caption">Подраздел</div>
        <select class="form-control" v-model="newService.siteSectionId">
          <option
            v-for="siteSection in siteSectionList"
            :key="siteSection.siteSectionId"
            :value="siteSection.siteSectionId"
          >{{siteSection.siteSectionName}}</option>
        </select>
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newService.businessServicePriority" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Статус</div>
        <input type="number" v-model.number="newService.businessServiceStatus" />
      </div>
      <button @click="saveNewService">Сохранить</button>
      <button @click="cancelSaveNewService">Отменить</button>
    </div>
    <vue-good-table :columns="headerFields" :rows="serviceItems">
      <template slot="table-row" slot-scope="props">
        <nuxt-link
          v-if="props.column.field == 'businessServiceName'"
          :to="{ name: 'admin-service-card', params: { service: props.row.businessServiceSlug+'-'+props.row.businessServiceId}}"
        >{{props.row.businessServiceName}}</nuxt-link>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import SiteSection from '@/models/ekoset/SiteSection'

@Component({})
export default class AdminSiteSectionList extends Vue {
  private serviceItems: BusinessService[] = []
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()
  private siteSectionList: SiteSection[] = []
  private headerFields = [
    {
      field: 'businessServiceName',
      label: 'Наименование'
    },
    {
      field: 'siteSectionName',
      label: 'Подраздел'
    },
    {
      field: 'businessServicePriority',
      label: 'Приоритет'
    },
    {
      field: 'businessServiceStatus',
      label: 'Статус'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async mounted () {
    this.serviceItems = await getServiceContainer().businessServiceService.getAll()
    this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
  }

  private async saveNewService () {
    await getServiceContainer().businessServiceService.save(this.newService)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newService = new BusinessService()
    this.createNewServiceMode = false
  }

  private cancelSaveNewService () {
    this.newService = new BusinessService()
    this.createNewServiceMode = false
  }
}
</script>




