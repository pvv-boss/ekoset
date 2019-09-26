<template>
  <div class="brc-site-section-list_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Группы клиентов</h1>
    <button @click="createNewItemMode = true" v-show="!createNewItemMode">Создать группу клиентов</button>

    <div v-if="createNewItemMode">
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Наименование</div>
        <input type="text" v-model="newItem.partnerGroupName" />
      </div>
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newItem.partnerGroupPriority" />
      </div>
      <button @click="saveNewItem">Сохранить</button>
      <button @click="cancelSaveNewItem">Отменить</button>
    </div>
    <vue-good-table :columns="headerFields" :rows="itemList">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'actions'">
          <button
            type="button"
            @click="editItem(props.row.originalIndex)"
            v-if="!editModeList[props.row.originalIndex]"
          >Редактировать</button>
          <button type="button" v-if="editModeList[props.row.originalIndex]">Сохранить</button>
          <button
            type="button"
            @click="cancelSaveChanges(props.row.originalIndex)"
            v-if="editModeList[props.row.originalIndex]"
          >Отменить</button>
        </span>
        <AdminStatusSelector
          v-else-if="editModeList[props.row.originalIndex] && props.column.field === 'clActivityStatus'"
          v-model.number="itemList[props.row.originalIndex][props.column.field]"
        ></AdminStatusSelector>
        <span v-else-if="editModeList[props.row.originalIndex]">
          <input type="text" v-model="itemList[props.row.originalIndex][props.column.field]" />
        </span>
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
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import PartnerGroup from '@/models/ekoset/PartnerGroup'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector

  }
})
export default class AdminClPartnerGroups extends Vue {
  private itemList: PartnerGroup[] = []
  private createNewItemMode = false
  private breadCrumbList: any[] = []
  private editModeList: boolean[] = []
  private newItem: PartnerGroup = new PartnerGroup()

  private headerFields = [
    {
      field: "partnerGroupName",
      label: "Наименование"
    },
    {
      field: "partnerGroupPriority",
      label: "Приоритет"
    },
    {
      field: "actions",
      label: ""
    }
  ]

  private layout () {
    return 'admin'
  }

  private editItem (rowIndex) {
    this.$set(this.editModeList, rowIndex, true)
  }

  private cancelSaveChanges (rowIndex) {
    this.updateItems()
    this.$set(this.editModeList, rowIndex, false)
  }

  private async saveChanges (rowIndex) {
    await getServiceContainer().publicEkosetService.savePartnerGroup(this.itemList[rowIndex])
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.updateItems()
    this.$set(this.editModeList, rowIndex, false)
  }

  private async updateItems () {
    this.itemList = await getServiceContainer().publicEkosetService.getPartnerGroups()
  }

  private async asyncData () {
    const itemList = await getServiceContainer().publicEkosetService.getPartnerGroups()

    return {
      itemList: itemList,
      editModeList: Array.from(itemList, x => false)
    }
  }

  private async saveNewItem () {
    await getServiceContainer().publicEkosetService.savePartnerGroup(this.newItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewItemMode = false
    await this.updateItems()
    this.newItem = new PartnerGroup()
  }

  private cancelSaveNewItem () {
    this.newItem = new PartnerGroup()
    this.createNewItemMode = false
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Справочник: Направления деятельности', link: '' })
  }
}
</script>



