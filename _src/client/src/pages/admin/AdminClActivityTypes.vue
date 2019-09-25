<template>
  <div class="brc-site-section-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Направления деятельности</h1>
    <button
      @click="createNewItemMode = true"
      v-show="!createNewItemMode"
    >Создать направление деятельности</button>

    <div v-if="createNewItemMode">
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Наименование</div>
        <input type="text" v-model="newItem.clActivityName" />
      </div>
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newItem.clActivityPriority" />
      </div>
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Статус</div>
        <AdminStatusSelector v-model="newItem.clActivityStatus"></AdminStatusSelector>
      </div>
      <button @click="saveNewItem">Сохранить</button>
      <button @click="cancelSaveNewItem">Отменить</button>
    </div>
    {{itemList}}
    {{editModeList}}
    <vue-good-table :columns="headerFields" :rows="itemList" @on-row-click="onRowClick">
      <template slot="table-row" slot-scope="props">
        <span v-show="editModeList[props.row.originalIndex]">
          <input type="text" :value="props.formattedRow[props.column.field]" />
        </span>
        <span
          v-show="!editModeList[props.row.originalIndex]"
        >{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClActivity from '@/models/ekoset/ClActivity.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector

  }
})
export default class AdminClActivityTypes extends Vue {
  private itemList: ClActivity[] = []
  private createNewItemMode = false
  private newItem: ClActivity = new ClActivity()
  private breadCrumbList: any[] = []
  private editModeList: boolean[] = []

  private headerFields = [
    {
      field: "clActivityName",
      label: "Наименование"
    },
    {
      field: "clActivityPriority",
      label: "Приоритет"
    },
    {
      field: "clActivityStatus",
      label: "Статус"
    }
  ]

  private layout () {
    return 'admin'
  }

  private onRowClick (row) {
    this.$set(this.editModeList, row.pageIndex, true)
  }

  private async updateItems () {
    this.itemList = await getServiceContainer().publicEkosetService.getClActivityList()
  }

  private async asyncData () {
    const itemList = await getServiceContainer().publicEkosetService.getClActivityList()

    return {
      itemList: itemList,
      editModeList: Array.from(itemList, x => false)
    }
  }

  private async saveNewItem () {
    // TODO: сохранить направление деятельности
    // await getServiceContainer().publicEkosetService.sa(this.newItem) 
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewItemMode = false
    await this.updateItems()
    this.newItem = new ClActivity()
  }

  private cancelSaveNewItem () {
    this.newItem = new ClActivity()
    this.createNewItemMode = false
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Справочники', link: 'admin-site-sections' })
  }
}
</script>



