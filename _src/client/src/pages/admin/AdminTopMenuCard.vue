<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Пункт меню: {{ sitePageItem.sitePageName }}</h2>
          <LazyAdminStatusSelector
            v-model.number="sitePageItem.sitePageStatus"
            status-caption="Активен"
            @input="save"
          ></LazyAdminStatusSelector>
        </div>
      </template>
      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row brc-admin-panel__site">
            <b-field label="Баннер">
              <LazyAdminImageUploader
                id="bigImageFile"
                :src-image="sitePageItem.sitePageBanner"
                @uploader:newimageloaded="addImage($event, true)"
              >
                <template v-slot="{ imageSrc }">
                  <figure class="brc-admin-card-image__wrapper">
                    <img class="brc-admin-image" :src="imageSrc" />
                    <h1 class="brc-admin-card-image-title">
                      {{ sitePageItem.sitePageH1 }}
                    </h1>
                  </figure>
                </template>
              </LazyAdminImageUploader>
            </b-field>
            <b-field label="Наименование пункта">
              <b-input
                v-model="sitePageItem.sitePageName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                @blur="save"
              ></b-input>
            </b-field>

            <b-field label="Заголовок H1 (на связанной странице)">
              <b-input
                v-model="sitePageItem.sitePageH1"
                placeholder="Заголовок H1"
                type="text"
                @blur="save"
              ></b-input>
            </b-field>

            <b-field v-show="!isStandartMenuItem" label="Раздел сайта">
              <LazyAdminSiteSectionSelector
                v-model="sitePageItem.siteSectionId"
                :nullable="true"
                @input="save"
              ></LazyAdminSiteSectionSelector>
            </b-field>

            <b-field v-show="!isStandartMenuItem" label="URL (ЧПУ) на страницу">
              <b-input
                v-model="sitePageItem.sitePageMenuName"
                type="text"
                @blur="save"
              ></b-input>
            </b-field>

            <LazyAdminSeoTags
              :seo-title.sync="sitePageItem.seoTitle"
              :seo-description.sync="sitePageItem.seoDescription"
              :seo-keywords.sync="sitePageItem.seoKeywords"
              @updated="save"
            ></LazyAdminSeoTags>
          </div>

          <div class="brc-admin-card-field-list_row">
            <div v-if="isMainMenuItem">
              <b-field label="Логотип в шапке сайта">
                <LazyAdminImageUploader
                  id="siteSectionLogo"
                  :src-image="sitePageItem.sitePageLogo"
                  @uploader:newimageloaded="updateSitePageLogo($event)"
                >
                  <template v-slot="{ imageSrc }">
                    <LazyTheHeaderLogo
                      :disign-mode="true"
                      :image-src-for-design-mode="imageSrc"
                    ></LazyTheHeaderLogo>
                  </template>
                </LazyAdminImageUploader>
              </b-field>
            </div>
            <LazyAdminDynamicComponentsContainer
              v-model="dynamicComponentInfo"
              style="margin-top: 10px"
              @freecomponent:save="saveDynamicComponentsInfo"
              @freecomponent:delete="refreshDynamicComponentsInfo"
            ></LazyAdminDynamicComponentsContainer>
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
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'
import AdminStore from '@/store/AdminStore'
import SitePage, { SitePageType } from '@/models/SitePage'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'

@Component
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

  private get isStandartMenuItem () {
    return this.sitePageItem.sitePageCode in SitePageType
  }

  private get isMainMenuItem () {
    return this.sitePageItem.sitePageCode === SitePageType.MAIN
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

  private async updateSitePageLogo (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSitePageLogo(this.sitePageItem.sitePageId, formData)

  }
}
</script>
