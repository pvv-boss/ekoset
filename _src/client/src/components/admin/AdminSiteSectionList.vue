<template>
  <div class="brc-site-section-list_wrapper" v-id="siteSectionItems.length>0">
    <h1>Подразделы сайта</h1>
    <button
      @click="createNewSiteSectionMode = true"
      v-show="!createNewSiteSectionMode"
    >Создать подраздел</button>

    <vue-good-table :columns="headerFields" :rows="siteSectionItems">
      <template slot="table-row" slot-scope="props">
        <nuxt-link
          v-if="props.column.field == 'siteSectionName'"
          :to="{ name: 'admin-site-section-card', params: { siteSection: props.row.siteSectionSlug+'-'+props.row.siteSectionId}}"
        >{{props.row.siteSectionName}}</nuxt-link>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'


@Component({
})
export default class AdminSiteSectionList extends Vue {
  private siteSectionItems: SiteSection[] = []
  private createNewSiteSectionMode = false
  private newSiteSection: SiteSection = new SiteSection()

  private headerFields = [
    {
      field: "siteSectionName",
      label: "Наименование"
    },
    {
      field: "siteSectionSlug",
      label: "Префикс"
    },
    {
      field: "siteSectionPriority",
      label: "Приоритет"
    },
    {
      field: "siteSectionStatus",
      label: "Статус"
    }
  ]

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


