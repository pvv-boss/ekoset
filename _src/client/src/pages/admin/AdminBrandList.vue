<template>
  <div class="brc-admin_page_wrapper">
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
        <AdminStatusSelector v-model.number="newBrand.clBrandStatus"></AdminStatusSelector>
      </div>
      <div class="brc-admin-card-attribute brc-admin-card-attribute_chk">
        <input
          type="checkbox"
          id="clBrandMainPageVisible"
          v-model="isBrandMainPageVisible"
          @change="setBrandMainPageVisible"
        />
        <label for="clBrandMainPageVisible">Отображать на главной странице</label>
      </div>
      <div>
        <button @click="saveNewBrand">Сохранить</button>
        <button @click="cancelSaveNewBrand">Отменить</button>
      </div>
    </div>
    <vue-good-table :columns="headerFields" :rows="brandItems">
      <template slot="table-row" slot-scope="props">
        <nuxt-link
          v-if="props.column.field == 'clBrandName'"
          :to="{ name: 'admin-brand-card', params: { brand: props.row.clBrandId}}"
        >{{props.row.clBrandName}}</nuxt-link>
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
import ClBrand from '@/models/ekoset/ClBrand'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'

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
  private isBrandMainPageVisible = false

  private headerFields = [
    {
      field: 'clBrandName',
      label: 'Наименование'
    },
    {
      field: 'clBrandPriority',
      label: 'Приоритет',
      type: 'number'
    },
    {
      field: 'clBrandStatus',
      label: 'Статус',
      type: 'number'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async updateBrandList () {
    this.brandItems = await getServiceContainer().publicEkosetService.getAdminAllBands()
  }

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await getServiceContainer().publicEkosetService.getAdminAllBands()
    return {
      brandItems: data
    }
  }

  private setBrandMainPageVisible () {
    this.newBrand.clBrandMainPageVisible = this.isBrandMainPageVisible ? 1 : 0
  }

  private async saveNewBrand () {
    await getServiceContainer().publicEkosetService.saveBrand(this.newBrand)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newBrand = new ClBrand()
    this.createNewMode = false
    this.isBrandMainPageVisible = false
    this.updateBrandList()
  }

  private cancelSaveNewBrand () {
    this.newBrand = new ClBrand()
    this.createNewMode = false
    this.isBrandMainPageVisible = false
  }
}
</script>




