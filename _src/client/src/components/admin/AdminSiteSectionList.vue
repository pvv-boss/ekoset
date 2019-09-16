<template>
  <div class="brc-site-section-list_wrapper" v-id="siteSectionItems.length>0">
    <h1>Подразделы сайта</h1>
    <button
      @click="createNewSiteSectionMode = true"
      v-show="!createNewSiteSectionMode"
    >Создать подраздел</button>

    <div v-if="createNewSiteSectionMode">
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Наименование</div>
        <input type="text" v-model="newSiteSection.siteSectionName" />
      </div>
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newSiteSection.siteSectionPriority" />
      </div>
      <div class="brc-article-attribute">
        <div class="brc-article-attribute__caption">Статус</div>
        <input type="number" v-model.number="newSiteSection.siteSectionStatus" />
      </div>
      <button @click="saveNewSiteSection">Сохранить</button>
      <button @click="cancelNewSiteSection">Отменить</button>
    </div>
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
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'

@Component({})
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

  private async saveNewSiteSection () {
    await getServiceContainer().publicEkosetService.saveSiteSection(this.newSiteSection)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newSiteSection = new SiteSection()
    this.createNewSiteSectionMode = false
  }

  private cancelSaveNewSiteSection () {
    this.newSiteSection = new SiteSection()
    this.createNewSiteSectionMode = false
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


