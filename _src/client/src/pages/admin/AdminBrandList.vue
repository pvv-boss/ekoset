<template>
  <div class="brc-service-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Бренды</h1>
    <button @click="createNewMode = true" v-show="!createNewMode">Добавить бренд</button>

    <div v-if="createNewMode">
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Наименование</div>
        <input type="text" v-model="newBrand.clBrandName" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newBrand.clBrandPriority" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Статус</div>
        <AdminStatusSelector v-model="newBrand.clBrandStatus"></AdminStatusSelector>
      </div>
      <button @click="saveNewBrand">Сохранить</button>
      <button @click="cancelSaveNewBrand">Отменить</button>
    </div>
    <vue-good-table :columns="headerFields" :rows="brandItems"></vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import ClBrand from '@/models/ekoset/ClBrand'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector
  }
})
export default class AdminBrandList extends Vue {
  private brandItems: ClBrand[] = []
  private createNewMode = false
  private newBrand: ClBrand = new ClBrand()
  private breadCrumbList: any[] = []

  private headerFields = [
    {
      field: 'partnerName',
      label: 'Наименование'
    },
    {
      field: 'partnerPriority',
      label: 'Приоритет'
    },
    {
      field: 'partnerStatus',
      label: 'Статус'
    }
  ]

  private layout () {
    return 'admin'
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
  }

  private async updateBrandList () {
    this.brandItems = await getServiceContainer().publicEkosetService.getPartners()
  }

  private async asyncData (context: NuxtContext) {
    const data = await getServiceContainer().publicEkosetService.getPartners()
    return {
      brandItems: data
    }
  }

  private async saveNewBrand () {
    await getServiceContainer().publicEkosetService.saveBrand(this.newBrand)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newBrand = new ClBrand()
    this.createNewMode = false
    this.updateBrandList()
  }

  private cancelSaveNewBrand () {
    this.newBrand = new ClBrand()
    this.createNewMode = false
  }
}
</script>




