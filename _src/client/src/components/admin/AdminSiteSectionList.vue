<template>
  <div class="brc-site-section-list_wrapper" v-id="siteSectionItems.length>0">
    <h1>Подразделы сайта</h1>
    <button
      @click="createNewSiteSectionMode = true"
      v-show="!createNewSiteSectionMode"
    >Создать подраздел</button>
    <table class="brc-site-section-table_admin">
      <thead>
        <th>Наименование</th>
        <th>Префикс</th>
        <th>Приоритет</th>
        <th>Статус</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-if="createNewSiteSectionMode">
          <td>
            <input type="text" v-model="newSiteSection.siteSectionName" />
          </td>
          <td></td>
          <td>
            <input type="text" v-model="newSiteSection.siteSectionPriority" />
          </td>
          <td>
            <input type="text" v-model="newSiteSection.siteSectionStatus" />
          </td>
          <td>
            <button @click="saveNewSiteSection">Сохранить</button>
          </td>
        </tr>
        <AdminSiteSectionListItem
          v-for="siteSectionItem in siteSectionItems"
          :key="siteSectionItem.siteSectionId"
          :siteSectionItem="siteSectionItem"
        ></AdminSiteSectionListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AdminSiteSectionListItem from '@/components/admin/AdminSiteSectionListItem.vue'

@Component({
  components: {
    AdminSiteSectionListItem
  }
})
export default class AdminSiteSectionList extends Vue {
  private siteSectionItems: SiteSection[] = []
  private createNewSiteSectionMode = false
  private newSiteSection: SiteSection = new SiteSection()

  private layout () {
    return 'admin'
  }

  private async mounted () {
    this.siteSectionItems = await getServiceContainer().publicEkosetService.getSiteSections()
  }
}
</script>

<style lang="scss">
.brc-site-section-list_wrapper {
  width: 100%;
  padding: 20px;
}

.brc-site-section-table_admin {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  tr {
    &:hover {
      background-color: lightgoldenrodyellow;
    }

    td {
      border: 1px solid lightgray;
      margin: 0;
      padding: 5px;
      text-align: center;
    }
    td:first-child {
      text-align: left;
    }
  }
}
</style>


