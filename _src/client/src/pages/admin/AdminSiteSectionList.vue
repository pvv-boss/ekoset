<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Разделы сайта</h2>
          <span class="brc-admin-card__help">
            <i
              >(Для измнения порядка следования перетащите блок вверх или
              вниз)</i
            >
          </span>

          <div
            v-if="createNewSiteSectionMode"
            class="brc-admin-card-create-row"
          >
            <b-field label="Наименование раздела:" horizontal>
              <b-input
                v-model="newSiteSection.siteSectionName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование раздела не может быть пустым"
              ></b-input>
            </b-field>
            <b-button type="is-primary" @click="saveNewSiteSection"
              >Сохранить</b-button
            >
            <b-button @click="cancelSaveNewSiteSection">Отмена</b-button>
          </div>

          <b-button
            v-show="!createNewSiteSectionMode"
            type="is-primary"
            outlined
            @click="createNewSiteSectionMode = true"
            >Создать</b-button
          >
        </div>
      </template>

      <template #content>
        <div class="brc_admin-sitesection-list">
          <div class="brc_admin-sitesection-list-item">
            <span>Статус</span>
            <span>Наименование</span>
            <span>Фото на странице</span>
            <span>Фото в карточке</span>
            <span>Удалить</span>
          </div>

          <draggable v-model="siteSectionItems" @change="handleDragChange">
            <div
              v-for="iterItem in siteSectionItems"
              :key="iterItem.siteSectionId"
              class="brc_admin-sitesection-list-item"
            >
              <b-switch
                v-model="iterItem.siteSectionStatus"
                true-value="1"
                false-value="0"
                type="is-success"
                size="is-small"
                @input="changeStatus(iterItem)"
              ></b-switch>
              <nuxt-link
                :to="{
                  name: 'admin-site-section-card',
                  params: { siteSection: iterItem.siteSectionUrl },
                }"
                >{{ iterItem.siteSectionName }}</nuxt-link
              >

              <div>
                <b-upload @input="addImage(...arguments, iterItem, true)">
                  <a class="button is-link">
                    <b-icon icon="upload"></b-icon>
                  </a>
                </b-upload>
                <b-button
                  v-if="
                    !!iterItem.siteSectionImgBig &&
                    iterItem.siteSectionImgBig != '/img/empty-image-big.png'
                  "
                  icon-right="file-find"
                  style="float: right; margin-right: 100px"
                  type="is-success"
                  size="is-medium"
                  outlined
                  @click="showBigImage(iterItem)"
                ></b-button>
              </div>

              <div>
                <b-upload @input="addImage(...arguments, iterItem, false)">
                  <a class="button is-link">
                    <b-icon icon="upload"></b-icon>
                  </a>
                </b-upload>
                <b-button
                  v-if="
                    !!iterItem.siteSectionImgSmall &&
                    iterItem.siteSectionImgSmall != '/img/empty-image.png'
                  "
                  icon-right="file-find"
                  style="float: right; margin-right: 100px"
                  type="is-success"
                  size="is-medium"
                  outlined
                  @click="showSmallImage(iterItem)"
                ></b-button>
              </div>

              <b-button
                type="is-danger"
                icon-right="delete"
                @click="deleteSiteSection(iterItem)"
              ></b-button>
            </div>
          </draggable>
        </div>
      </template>
    </BaseCard>

    <b-modal
      :active.sync="isShowSmallImageActive"
      :can-cancel="true"
      :width="400"
    >
      <SiteSectionListItem
        :site-section-item="previewSmallSiteSection"
        style="width: 347px; margin: 0px; background-color: white"
      ></SiteSectionListItem>
    </b-modal>

    <b-modal :active.sync="isShowBigImageActive" :can-cancel="true">
      <figure
        class="brc-admin-card-image__wrapper"
        style="background-color: white"
      >
        <img
          class="brc-admin-image"
          :src="previewBigSiteSection.siteSectionImgBig"
        />
        <h1 class="brc-admin-card-image-title">
          {{ previewBigSiteSection.siteSectionH1 }}
        </h1>
      </figure>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminStore from '@/store/AdminStore'
import { getModule } from 'vuex-module-decorators'

@Component
export default class AdminSiteSectionList extends Vue {
  private siteSectionItems: SiteSection[] = []
  private createNewSiteSectionMode = false
  private newSiteSection: SiteSection = new SiteSection()

  private previewSmallSiteSection: SiteSection = new SiteSection()
  private isShowSmallImageActive = false
  private previewBigSiteSection: SiteSection = new SiteSection()
  private isShowBigImageActive = false

  private layout () {
    return 'admin'
  }

  private showSmallImage (siteSection: SiteSection) {
    this.previewSmallSiteSection = siteSection
    this.isShowSmallImageActive = !this.isShowSmallImageActive
  }

  private showBigImage (siteSection: SiteSection) {
    this.previewBigSiteSection = siteSection
    this.isShowBigImageActive = !this.isShowBigImageActive
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

  private async addImage (imageFile: string, siteSection: SiteSection, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSiteSectionImage(siteSection.siteSectionId, formData, isBig)
  }

  private async changeStatus (siteSection: SiteSection) {
    await getServiceContainer().publicEkosetService.saveSiteSection(
      siteSection
    )
  }

  private async deleteSiteSection (siteSection: SiteSection) {
    const okCallback = async () => {
      await getServiceContainer().publicEkosetService.deleteSiteSection(siteSection.siteSectionUrl)
      this.updateItems()
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить раздел ?', 'Подтвердите удаление', okCallback)
  }

  private async handleDragChange () {
    for (let i = 0; i < this.siteSectionItems.length; i++) {
      this.siteSectionItems[i].siteSectionPriority = this.siteSectionItems.length - i;
      await getServiceContainer().publicEkosetService.saveSiteSection(this.siteSectionItems[i])
    }
  }

}
</script>



<style lang="scss">
@import "@/styles/variables.scss";

.brc_admin-sitesection-list-item {
  margin-top: 10px;

  display: grid;
  grid-template-columns: 50px 1fr 220px 220px 70px;
  grid-column-gap: 20px;
  padding: 5px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  line-height: 2em;

  * {
    margin-bottom: 0px !important;
    font-weight: $font-regular !important;
    font-size: 15px !important;
  }

  cursor: move;
}
</style>  

