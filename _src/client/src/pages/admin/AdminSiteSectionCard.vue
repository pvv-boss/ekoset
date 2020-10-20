<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Раздел сайта: {{ siteSectionItem.siteSectionName }}</h2>
          <LazyAdminStatusSelector
            v-model.number="siteSectionItem.siteSectionStatus"
            status-caption="Активен"
            @input="saveSiteSection"
          ></LazyAdminStatusSelector>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card_two-column">
              <div class="brc-admin-card-field-list_row brc-admin-panel__site">
                <b-field label="Фото на странице">
                  <LazyAdminImageUploader
                    id="bigImageFile"
                    :src-image="siteSectionItem.siteSectionImgBig"
                    @uploader:newimageloaded="addSiteSectionImage($event, true)"
                  >
                    <template v-slot="{ imageSrc }">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">
                          {{ siteSectionItem.siteSectionH1 }}
                        </h1>
                      </figure>
                    </template>
                  </LazyAdminImageUploader>
                </b-field>

                <b-field label="Наименование">
                  <b-input
                    v-model="siteSectionItem.siteSectionName"
                    placeholder="Наименование"
                    type="text"
                    required
                    validation-message="Наименование раздела не может быть пустым"
                    @blur="saveSiteSection"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    v-model="siteSectionItem.siteSectionH1"
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                    @blur="saveSiteSection"
                  ></b-input>
                </b-field>

                <b-field label="URL (ЧПУ) на страницу">
                  <b-input
                    v-model="siteSectionItem.siteSectionSlug"
                    type="text"
                    @blur="saveSiteSection"
                  ></b-input>
                </b-field>

                <LazyAdminSeoTags
                  :seo-title.sync="siteSectionItem.seoTitle"
                  :seo-description.sync="siteSectionItem.seoDescription"
                  :seo-keywords.sync="siteSectionItem.seoKeywords"
                  @updated="saveSiteSection"
                ></LazyAdminSeoTags>
              </div>

              <div class="brc-admin-card-field-list_row">
                <div>
                  <b-field label="Логотип в шапке сайта">
                    <LazyAdminImageUploader
                      id="siteSectionLogo"
                      :src-image="siteSectionItem.siteSectionLogo"
                      @uploader:newimageloaded="addSiteSectionLogo($event)"
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
                <div style="margin-top: 10px">
                  <b-field label="Фото на карточке раздела">
                    <LazyAdminImageUploader
                      id="smallImageFile"
                      :src-image="siteSectionItem.siteSectionImgSmall"
                      @uploader:newimageloaded="
                        addSiteSectionImage($event, false)
                      "
                    >
                      <template v-slot="{ imageSrc }">
                        <LazySiteSectionListItem
                          :site-section-item="siteSectionItem"
                          :image-src-for-design-mode="imageSrc"
                          style="width: 347px; margin: 0px"
                        ></LazySiteSectionListItem>
                      </template>
                    </LazyAdminImageUploader>
                  </b-field>
                </div>

                <LazyAdminDynamicComponentsContainer
                  v-model="dynamicComponentInfo"
                  @freecomponent:save="saveSiteSectionDynamicComponentsInfo"
                  @freecomponent:delete="refreshDynamicComponentsInfo"
                ></LazyAdminDynamicComponentsContainer>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Услуги">
            <LazyAdminServiceListContainer
              v-model="serviceOtherList"
              :site-section="siteSectionItem"
              @newservice:saved="refreshServiceList"
              @service:deleted="refreshServiceList"
              @service:moved="refreshServiceList"
            ></LazyAdminServiceListContainer>
          </b-tab-item>

          <b-tab-item label="Комплексные решения">
            <LazyAdminClientTypeOfferList
              :site-section="siteSectionItem.siteSectionUrl"
              >"</LazyAdminClientTypeOfferList
            >
          </b-tab-item>

          <b-tab-item label="Индивидуальные предложения">
            <LazyAdminIndividualOfferList
              v-model="offerList"
              :site-section="siteSectionItem"
              @newoffer:saved="refreshOfferList"
              @offer:deleted="refreshOfferList"
              >"</LazyAdminIndividualOfferList
            >
          </b-tab-item>

          <b-tab-item label="Рекомендации">
            <LazyAdminBrandRelationList
              :brand-relation-items="brandRelationList"
              @brandchecked="brandChecked"
            ></LazyAdminBrandRelationList>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import IndividualOffer from '@/models/ekoset/IndividualOffer.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import AdminStore from '@/store/AdminStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'

@Component
export default class AdminSiteSectionCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceOtherList: BusinessService[] = []
  private offerList: IndividualOffer[] = []
  private brandRelationList: ClBrand[] = []
  private activeTab = 0
  private dynamicComponentInfo: DynamicComponentInfo[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(
      context.params.siteSection
    )

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Резделы сайта', link: 'admin-site-sections' })
    breadCrumbList.push({ name: siteSectionItem.siteSectionName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const dynaComponents = getServiceContainer().dynamicComponentsService.getSiteSectionDynamicComponentsInfo(siteSectionItem.siteSectionUrl, true)

    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForSiteSectionBrands(
      siteSectionItem.siteSectionId
    )
    const serviceOtherList = getServiceContainer().businessServiceService.adminGetBySiteSectionId(
      siteSectionItem.siteSectionId
    )
    const offerList = getServiceContainer().individualOfferService.adminGetAllBySiteSectionId(siteSectionItem.siteSectionId)

    const data = await Promise.all([
      serviceOtherList,
      brandRelationList,
      offerList,
      dynaComponents
    ])
    return {
      siteSectionItem,
      serviceOtherList: data[0],
      brandRelationList: data[1],
      offerList: data[2],
      dynamicComponentInfo: data[3],
      activeTab: 0
    }
  }

  private async addSiteSectionImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSiteSectionImage(this.siteSectionItem.siteSectionId, formData, isBig)
  }

  private async addSiteSectionLogo (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSiteSectionLogo(this.siteSectionItem.siteSectionId, formData)
  }

  private saveSiteSection () {
    getServiceContainer().publicEkosetService.saveSiteSection(
      this.siteSectionItem
    )
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteSiteSection () {
    const self = this
    const okCallback = async () => {
      if (this.siteSectionItem.siteSectionSlug) {
        await getServiceContainer().publicEkosetService.deleteSiteSection(
          this.siteSectionItem.siteSectionSlug
        )
      }
      self.$router.push({ name: 'admin-site-sections' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(
      BrcDialogType.Warning,
      'Удалить раздел?',
      'Подтвердите удаление',
      okCallback
    )
  }

  private async saveSiteSectionDynamicComponentsInfo () {
    await getServiceContainer().dynamicComponentsService.saveSiteSectionDynamicComponentsInfo(this.siteSectionItem.siteSectionId, this.dynamicComponentInfo)
    await this.refreshDynamicComponentsInfo()
  }

  private brandChecked (clBrandId: number, hasRelation: boolean) {
    getServiceContainer().publicEkosetService.addOrRemoveBrand2SiteSection(
      clBrandId,
      this.siteSectionItem.siteSectionId,
      hasRelation
    )
  }

  private async refreshServiceList (newService) {
    this.serviceOtherList = await getServiceContainer().businessServiceService.adminGetBySiteSectionId(this.siteSectionItem.siteSectionId)
  }

  private async refreshOfferList (newOffer) {
    this.offerList = await getServiceContainer().individualOfferService.adminGetAllBySiteSectionId(this.siteSectionItem.siteSectionId)
  }

  private async refreshDynamicComponentsInfo () {
    this.dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getSiteSectionDynamicComponentsInfo(this.siteSectionItem.siteSectionUrl, true)
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
</style>





