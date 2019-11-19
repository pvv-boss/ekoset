<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Разделы сайта</h2>

          <div v-if="createNewSiteSectionMode" class="brc-admin-card-create-row">
            <b-field label="Наименование раздела:" horizontal>
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование раздела не может быть пустым"
                v-model="newSiteSection.siteSectionName"
              ></b-input>
            </b-field>
            <b-button @click="saveNewSiteSection" type="is-primary">Сохранить</b-button>
            <b-button @click="cancelSaveNewSiteSection">Отмена</b-button>
          </div>

          <b-button
            type="is-primary"
            outlined
            @click="createNewSiteSectionMode = true"
            v-show="!createNewSiteSectionMode"
          >Создать</b-button>
        </div>
      </template>

      <template #content>
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
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import BaseCard from '@/components/BaseCard.vue'
import AdminStore from '@/store/AdminStore'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    AdminStatusSelector,
    BaseCard
  }
})
export default class AdminSiteSectionList extends Vue {
  private siteSectionItems: SiteSection[] = []
  private createNewSiteSectionMode = false
  private newSiteSection: SiteSection = new SiteSection()

  private headerFields = [
    {
      field: 'siteSectionName',
      label: 'Наименование'
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

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Резделы сайта', link: 'admin-site-sections' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const siteSectionItems = await getServiceContainer().publicEkosetService.adminGetSiteSections()
    return {
      siteSectionItems
    }
  }

  private async saveNewSiteSection () {
    this.newSiteSection.siteSectionH1 = this.newSiteSection.siteSectionName
    await getServiceContainer().publicEkosetService.saveSiteSection(
      this.newSiteSection
    )
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewSiteSectionMode = false
    await this.updateItems()
    this.newSiteSection = new SiteSection()
  }

  private cancelSaveNewSiteSection () {
    this.newSiteSection = new SiteSection()
    this.createNewSiteSectionMode = false
  }
}
</script>


