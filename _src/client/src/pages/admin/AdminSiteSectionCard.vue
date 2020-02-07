<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Раздел сайта: {{siteSectionItem.siteSectionName}}</h2>
          <AdminStatusSelector
            statusCaption="Активен"
            v-model.number="siteSectionItem.siteSectionStatus"
            @input="saveSiteSection"
          ></AdminStatusSelector>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card_two-column">
              <div class="brc-admin-card-field-list_row brc-admin-panel__site">
                <b-field label="Наименование">
                  <b-input
                    placeholder="Наименование"
                    type="text"
                    required
                    validation-message="Наименование раздела не может быть пустым"
                    v-model="siteSectionItem.siteSectionName"
                    @blur="saveSiteSection"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                    v-model="siteSectionItem.siteSectionH1"
                    @blur="saveSiteSection"
                  ></b-input>
                </b-field>

                <b-field label="Фото на странице">
                  <AdminImageUploader
                    id="bigImageFile"
                    :srcImage="siteSectionItem.siteSectionImgBig"
                    @uploader:newimageloaded="addSiteSectionImage($event,true)"
                  >
                    <template v-slot="{imageSrc}">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">{{siteSectionItem.siteSectionH1}}</h1>
                      </figure>
                    </template>
                  </AdminImageUploader>
                </b-field>
              </div>

              <div class="brc-admin-card-field-list_row">
                <div>
                  <b-field label="Логотип в шапке сайта">
                    <AdminImageUploader
                      id="siteSectionLogo"
                      :srcImage="siteSectionItem.siteSectionLogo"
                      @uploader:newimageloaded="addSiteSectionLogo($event)"
                    >
                      <template v-slot="{imageSrc}">
                        <TheHeaderLogo :disignMode="true" :imageSrcForDesignMode="imageSrc"></TheHeaderLogo>
                      </template>
                    </AdminImageUploader>
                  </b-field>
                </div>
                <div styel="margin-top:10px;">
                  <b-field label="Фото на карточке раздела">
                    <AdminImageUploader
                      id="smallImageFile"
                      :srcImage="siteSectionItem.siteSectionImgSmall"
                      @uploader:newimageloaded="addSiteSectionImage($event,false)"
                    >
                      <template v-slot="{imageSrc}">
                        <SiteSectionListItem
                          :siteSectionItem="siteSectionItem"
                          :imageSrcForDesignMode="imageSrc"
                          style="width:347px;margin:0px"
                        ></SiteSectionListItem>
                      </template>
                    </AdminImageUploader>
                  </b-field>
                </div>

                <AdminDynamicComponentsContainer
                  v-model="dynamicComponentInfo"
                  @freecomponent:save="saveSiteSectionDynamicComponentsInfo"
                  @freecomponent:delete="refreshDynamicComponentsInfo"
                ></AdminDynamicComponentsContainer>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Услуги">
            <AdminServiceListContainer
              v-model="serviceOtherList"
              :siteSection="siteSectionItem"
              @newservice:saved="refreshServiceList"
              @service:deleted="refreshServiceList"
            ></AdminServiceListContainer>
          </b-tab-item>

          <b-tab-item label="Комплексные решения">
            <AdminClientTypeOfferList :siteSection="siteSectionItem.siteSectionUrl">"</AdminClientTypeOfferList>
          </b-tab-item>

          <b-tab-item label="Индивидуальные предложения">
            <AdminIndividualOfferList
              :siteSection="siteSectionItem"
              v-model="offerList"
              @newoffer:saved="refreshOfferList"
              @offer:deleted="refreshOfferList"
            >"</AdminIndividualOfferList>
          </b-tab-item>

          <b-tab-item label="Рекомендации">
            <AdminBrandRelationList
              :brandRelationItems="brandRelationList"
              @brandchecked="brandChecked"
            ></AdminBrandRelationList>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import IndividualOffer from '@/models/ekoset/IndividualOffer.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminDynamicComponentsContainer from '@/components/admin/AdminDynamicComponentsContainer.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminServiceListContainer from '@/components/admin/AdminServiceListContainer.vue'
import AdminClientTypeOfferList from '@/components/admin/AdminClientTypeOfferList.vue'
import AdminIndividualOfferList from '@/components/admin/AdminIndividualOfferList.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import BaseCard from '@/components/BaseCard.vue'
import AdminStore from '@/store/AdminStore'
import SiteSectionListItem from '@/components/public/SiteSectionListItem.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AdminFreeBlockInfoEditor from '@/components/admin/AdminFreeBlockInfoEditor.vue'
import TheHeaderLogo from '@/components/header/TheHeaderLogo.vue'

@Component({
  components: {
    AdminDynamicComponentsContainer,
    AdminBrandRelationList,
    AdminClientTypeOfferList,
    AdminIndividualOfferList,
    AdminStatusSelector,
    AdminImageUploader,
    BreadCrumbs,
    BaseCard,
    SiteSectionListItem,
    AdminFreeContentBlockEditor,
    AdminServiceListContainer,
    AdminFreeBlockInfoEditor,
    TheHeaderLogo
  }
})
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
@import '@/styles/variables.scss';
</style>





