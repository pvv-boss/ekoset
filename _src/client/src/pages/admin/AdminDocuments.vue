<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Документы</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                v-model="newSiteDocument.siteDocumentName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
              ></b-input>
            </b-field>
            <b-field label="Раздел сайта" horizontal>
              <AdminSiteSectionSelector
                v-model="newSiteDocument.siteSectionId"
                :nullable="false"
              ></AdminSiteSectionSelector>
            </b-field>
            <b-button type="is-primary" @click="save()">Сохранить</b-button>
            <b-button @click="cancelSave">Отмена</b-button>
          </div>

          <b-button
            v-show="!createNewMode"
            type="is-primary"
            outlined
            @click="createNewMode = true"
            >Создать</b-button
          >
        </div>
      </template>

      <template #content>
        <vue-good-table
          :columns="headerFields"
          :rows="siteDocumentList"
          :search-options="{
            enabled: true,
            placeholder: 'Поиск по всем полям',
          }"
          :fixed-header="true"
          :sort-options="{
            enabled: true, //,
          }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'siteSectionName'">{{
              props.formattedRow[props.column.field]
            }}</span>
            <a
              v-if="props.column.field == 'siteDocumentName'"
              :href="props.row.siteDocumentFile"
              >{{ props.formattedRow[props.column.field] }}</a
            >

            <b-upload
              v-if="props.column.field == 'addDocument'"
              @input="addDocument(...arguments, props.row)"
            >
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>
            <div style="display: flex; justify-content: space-between">
              <b-input
                v-if="props.column.field == 'copyLink'"
                :id="'sitedocumentfile' + '_' + props.row.siteDocumentId"
                placeholder="Ссылка на файл"
                type="text"
                :value="props.row.siteDocumentFile"
                style="width: 90%"
              ></b-input>

              <b-button
                v-if="props.column.field == 'copyLink'"
                type="is-info"
                :disabled="!props.row.siteDocumentFile"
                icon-right="content-copy"
                @click="copy2Clipboard(props.row)"
              ></b-button>
            </div>
            <b-button
              v-if="props.column.field == 'removeDocument'"
              type="is-danger"
              icon-right="delete"
              @click="deleteDocument(props.row)"
            ></b-button>
          </template>
        </vue-good-table>
      </template>
    </BaseCard>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SitePage from '@/models/SitePage.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AdminStore from '@/store/AdminStore'
import { getModule } from 'vuex-module-decorators'
import SiteDocument from '@/models/ekoset/SiteDocument.ts'

@Component
export default class AdminDocuments extends Vue {

  private siteDocumentList: SiteDocument[] = []
  private createNewMode = false
  private newSiteDocument: SiteDocument = new SiteDocument()


  private headerFields = [
    {
      field: 'siteSectionName',
      label: 'Раздел сайта',
      filterOptions: {
        enabled: true
      }
    },
    {
      field: 'siteDocumentName',
      label: 'Наименование'
    },
    {
      field: 'addDocument',
      label: 'Загрузить',
      tdClass: 'brc-admin-centered-td'
    },

    {
      field: 'copyLink',
      label: 'Ссылка на файл',
      tdClass: 'brc-admin-centered-td'
    },
    {
      field: 'removeDocument',
      label: 'Удалить',
      tdClass: 'brc-admin-centered-td'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Документы сайта', link: 'admin-documents' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const siteDocumentList = await getServiceContainer().mediaService.getSiteDocuments()
    return {
      siteDocumentList
    }
  }

  private async save () {
    this.createNewMode = false
    await getServiceContainer().mediaService.saveSiteDocument(this.newSiteDocument)
    this.newSiteDocument = new SiteDocument()
    this.refreshList()
  }

  private async addDocument (file: string, siteDocument: SiteDocument) {
    const formData: FormData = new FormData()
    formData.append('file', file)
    await getServiceContainer().mediaService.addSiteDocument(formData, siteDocument.siteDocumentId)
    this.refreshList()
  }

  private copy2Clipboard (siteDocument: SiteDocument) {
    const elId = 'sitedocumentfile' + '_' + siteDocument.siteDocumentId
    const copyText = document.getElementById(elId) as HTMLInputElement;
    if (copyText) {
      copyText.select();
      document.execCommand('copy');
    }
  }

  private async deleteDocument (siteDocument: SiteDocument) {
    await getServiceContainer().mediaService.deleteSiteDocument(siteDocument.siteDocumentId)
    this.refreshList()
  }

  private cancelSave () {
    this.newSiteDocument = new SiteDocument()
    this.createNewMode = false
  }

  private async refreshList () {
    this.siteDocumentList = await getServiceContainer().mediaService.getSiteDocuments()
  }

}

</script>

<style lang="scss">
@import "@/styles/variables.scss";
</style>  
