<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Верхнее меню</h2>
          <span class="brc-admin-card__help">
            <i
              >(Для измнения порядка следования перетащите блок вверх или
              вниз)</i
            >
          </span>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                v-model="newSitePage.sitePageName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
              ></b-input>
            </b-field>
            <b-button type="is-primary" @click="savenewSitePage"
              >Сохранить</b-button
            >
            <b-button @click="cancelSavenewSitePage">Отмена</b-button>
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
        <div class="brc_admin-sitesection-list">
          <div class="brc_admin-topmenu-list-item">
            <span>Статус</span>
            <span>Наименование</span>
            <span>Баннер на странице</span>
            <span>Удалить</span>
          </div>

          <draggable v-model="sitePageItems" @change="handleDragChange">
            <div
              v-for="iterItem in sitePageItems"
              :key="iterItem.sitePageId"
              class="brc_admin-topmenu-list-item"
            >
              <b-switch
                v-model="iterItem.sitePageStatus"
                true-value="1"
                false-value="0"
                type="is-success"
                size="is-small"
                @input="changeStatus(iterItem)"
              ></b-switch>
              <nuxt-link
                :to="{
                  name: 'admin-top-menu-card',
                  params: { sitePageId: iterItem.sitePageId },
                }"
                >{{ iterItem.sitePageName }}</nuxt-link
              >

              <div>
                <b-upload @input="addImage(...arguments, iterItem, true)">
                  <a class="button is-link">
                    <b-icon icon="upload"></b-icon>
                  </a>
                </b-upload>
                <b-button
                  v-if="
                    !!iterItem.sitePageBanner &&
                    iterItem.sitePageBanner != '/img/empty-image-big.png'
                  "
                  icon-right="file-find"
                  style="float: right; margin-right: 100px"
                  type="is-success"
                  size="is-medium"
                  outlined
                  @click="showBigImage(iterItem)"
                ></b-button>
              </div>
              <b-button
                v-if="!iterItem.sitePageCode && iterItem.sitePageCode != 0"
                type="is-danger"
                icon-right="delete"
                @click="deleteSitePage(iterItem)"
              ></b-button>
            </div>
          </draggable>
        </div>
      </template>
    </BaseCard>

    <b-modal :active.sync="isShowBigImageActive" :can-cancel="true">
      <figure
        class="brc-admin-card-image__wrapper"
        style="background-color: white"
      >
        <img class="brc-admin-image" :src="previewBigSitePage.sitePageBanner" />
        <h1 class="brc-admin-card-image-title">
          {{ previewBigSitePage.sitePageH1 }}
        </h1>
      </figure>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SitePage from '@/models/SitePage.ts'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminStore from '@/store/AdminStore'
import { getModule } from 'vuex-module-decorators'
import { Context } from '@nuxt/types'
import { ServiceRegistry } from '@/ServiceRegistry'
import TopMenuService from '@/services/TopMenuService'
import MediaService from '@/services/MediaService'

@Component({
  components: {
    draggable: () => import(/* webpackChunkName: "vuedraggable" */ 'vuedraggable')
  }
})
export default class AdminTopMenuList extends Vue {
  private sitePageItems: SitePage[] = []
  private createNewMode = false
  private newSitePage: SitePage = new SitePage()

  private previewSmallSiteSection: SitePage = new SitePage()
  private isShowSmallImageActive = false
  private previewBigSitePage: SitePage = new SitePage()
  private isShowBigImageActive = false

  private layout () {
    return 'admin'
  }

  private showBigImage (sitePage: SitePage) {
    this.previewBigSitePage = sitePage
    this.isShowBigImageActive = !this.isShowBigImageActive
  }

  private async updateItems () {
    this.sitePageItems = await ServiceRegistry.instance.getService(TopMenuService).adminGetSitePages()
  }

  private async asyncData (context: Context) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Верхнее меню', link: 'admin-top-menu-list' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const sitePageItems = await ServiceRegistry.instance.getService(TopMenuService).adminGetSitePages()
    return {
      sitePageItems
    }
  }

  private async savenewSitePage () {
    this.newSitePage.sitePageH1 = this.newSitePage.sitePageName
    await ServiceRegistry.instance.getService(TopMenuService).adminSaveSitePage(
      this.newSitePage
    )
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.createNewMode = false
    await this.updateItems()
    this.newSitePage = new SitePage()
  }

  private cancelSavenewSitePage () {
    this.newSitePage = new SitePage()
    this.createNewMode = false
  }

  private async addImage (imageFile: string, sitePage: SitePage) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    ServiceRegistry.instance.getService(MediaService).saveSitePageImage(sitePage.sitePageId, formData)
  }

  private async changeStatus (sitePage: SitePage) {
    await ServiceRegistry.instance.getService(TopMenuService).adminSaveSitePage(
      sitePage
    )
  }

  private async deleteSitePage (sitePage: SitePage) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(TopMenuService).adminDeleteSitePage(sitePage.sitePageId)
      this.updateItems()
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить пункт меню и связанную страницу ?', 'Подтвердите удаление', okCallback)
  }

  private async handleDragChange () {
    for (let i = 0; i < this.sitePageItems.length; i++) {
      this.sitePageItems[i].sitePageMenuPosition = i;
      await ServiceRegistry.instance.getService(TopMenuService).adminSaveSitePage(this.sitePageItems[i])
    }
  }

}
</script>



<style lang="scss">
.brc_admin-topmenu-list-item {
  margin-top: 10px;

  display: grid;
  grid-template-columns: 50px 1fr 220px 70px;
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

