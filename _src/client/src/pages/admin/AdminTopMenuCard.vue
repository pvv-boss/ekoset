<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Пункт меню: {{sitePageItem.sitePageName}}</h2>
          <AdminStatusSelector
            statusCaption="Активен"
            v-model.number="sitePageItem.sitePageStatus"
            @input="save"
          ></AdminStatusSelector>
        </div>
      </template>
      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row brc-admin-panel__site">
            <b-field label="Баннер">
              <AdminImageUploader
                id="bigImageFile"
                :srcImage="sitePageItem.sitePageBanner"
                @uploader:newimageloaded="addImage($event,true)"
              >
                <template v-slot="{imageSrc}">
                  <figure class="brc-admin-card-image__wrapper">
                    <img class="brc-admin-image" :src="imageSrc" />
                    <h1 class="brc-admin-card-image-title">{{sitePageItem.sitePageH1}}</h1>
                  </figure>
                </template>
              </AdminImageUploader>
            </b-field>
            <b-field label="Наименование">
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="sitePageItem.sitePageName"
                @blur="save"
              ></b-input>
            </b-field>

            <b-field label="Заголовок H1">
              <b-input
                placeholder="Заголовок H1"
                type="text"
                @blur="save"
                v-model="sitePageItem.sitePageH1"
              ></b-input>
            </b-field>

            <b-field label="Раздел сайта">
              <AdminSiteSectionSelector
                v-model="sitePageItem.siteSectionId"
                :nullable="true"
                @input="save"
              ></AdminSiteSectionSelector>
            </b-field>
          </div>

          <div class="brc-admin-card-field-list_row">
            <AdminDynamicComponentsContainer
              v-model="dynamicComponentInfo"
              @freecomponent:save="saveDynamicComponentsInfo"
              @freecomponent:delete="refreshDynamicComponentsInfo"
            ></AdminDynamicComponentsContainer>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'
import { dayNamesRu, monthNamesRu } from '@/utils/DateUtil'
import SitePage from '@/models/SitePage'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import AdminDynamicComponentsContainer from '@/components/admin/AdminDynamicComponentsContainer.vue'


@Component({
  components: {
    BreadCrumbs,
    AdminSiteSectionSelector,
    AdminStatusSelector,
    AdminImageUploader,
    BaseCard,
    AdminDynamicComponentsContainer,
    AdminFreeContentBlockEditor
  }
})
export default class AdminTopMenuCard extends Vue {
  private sitePageItem: SitePage = new SitePage()
  private dynamicComponentInfo: DynamicComponentInfo[] = []

  private layout () {
    return 'admin'
  }

  private async save () {
    await getServiceContainer().topMenuService.adminSaveSitePage(this.sitePageItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }


  private async addImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSitePageImage(
      this.sitePageItem.sitePageId,
      formData
    )
  }

  private async asyncData (context: NuxtContext) {
    const sitePageId = Number(context.params.sitePageId)
    const sitePageItem = await getServiceContainer().topMenuService.getSitePageById(sitePageId)
    const dynaComponents = getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(sitePageItem.sitePageId, true)
    const data = await Promise.all([dynaComponents])

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Верхнее меню', link: 'admin-top-menu-list' })
    breadCrumbList.push({ name: sitePageItem.sitePageName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    return {
      sitePageItem,
      dynamicComponentInfo: data[0]
    }
  }

  private async saveDynamicComponentsInfo () {
    await getServiceContainer().dynamicComponentsService.saveSitePageDynamicComponentsInfo(this.sitePageItem.sitePageId, this.dynamicComponentInfo)
    await this.refreshDynamicComponentsInfo()
  }

  private async refreshDynamicComponentsInfo () {
    this.dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getSitePageDynamicComponents(this.sitePageItem.sitePageId, true)
  }
}
</script>
