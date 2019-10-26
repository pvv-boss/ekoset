<template>
  <div class="brc-admin_page_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <BaseCard>
      <template #header>
        <h1>Подразделы сайта</h1>
        <button
          @click="createNewSiteSectionMode = true"
          v-show="!createNewSiteSectionMode"
        >Создать подраздел</button>
      </template>

      <template #content>
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
            <AdminStatusSelector v-model.number="newSiteSection.siteSectionStatus"></AdminStatusSelector>
          </div>
          <button @click="saveNewSiteSection">Сохранить</button>
          <button @click="cancelSaveNewSiteSection">Отменить</button>
        </div>

        <vue-good-table :columns="headerFields" :rows="siteSectionItems">
          <template slot="table-row" slot-scope="props">
            <nuxt-link
              v-if="props.column.field == 'siteSectionName'"
              :to="{ name: 'admin-site-section-card', params: { siteSection: props.row.siteSectionUrl}}"
            >{{props.row.siteSectionName}}</nuxt-link>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import BaseCard from '@/components/BaseCard.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector,
    BaseCard
  }
})
export default class AdminSiteSectionList extends Vue {
  private siteSectionItems: SiteSection[] = []
  private createNewSiteSectionMode = false
  private newSiteSection: SiteSection = new SiteSection()
  private breadCrumbList: any[] = []

  private headerFields = [
    {
      field: 'siteSectionName',
      label: 'Наименование'
    },
    {
      field: 'siteSectionSlug',
      label: 'Префикс'
    },
    {
      field: 'siteSectionPriority',
      label: 'Приоритет',
      type: 'number'
    },
    {
      field: 'siteSectionStatus',
      label: 'Статус',
      type: 'number'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async updateItems () {
    this.siteSectionItems = await getServiceContainer().publicEkosetService.adminGetSiteSections()
  }
  private async asyncData () {
    const siteSectionItems = await getServiceContainer().publicEkosetService.adminGetSiteSections()

    return {
      siteSectionItems
    }
  }

  private async saveNewSiteSection () {
    await getServiceContainer().publicEkosetService.saveSiteSection(this.newSiteSection)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewSiteSectionMode = false
    await this.updateItems()
    this.newSiteSection = new SiteSection()
  }

  private cancelSaveNewSiteSection () {
    this.newSiteSection = new SiteSection()
    this.createNewSiteSectionMode = false
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Подразделы', link: 'admin-site-sections' })
  }
}
</script>


