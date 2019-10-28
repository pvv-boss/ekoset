<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard class="brc-eko-sitesection">
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Раздел сайта: {{siteSectionItem.siteSectionName}}</h2>
          <AdminStatusSelector
            statusCaption="Активен"
            v-model.number="siteSectionItem.siteSectionStatus"
          ></AdminStatusSelector>

          <b-field label="Приоритет" horizontal>
            <b-input
              placeholder="Приоритет"
              type="number"
              v-model.number="siteSectionItem.siteSectionPriority"
            ></b-input>
          </b-field>

          <b-button type="is-primary" @click="saveSiteSection">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-field-list_column brc-admin-panel__site">
              <b-field label="Наименование">
                <b-input
                  placeholder="Наименование"
                  type="text"
                  required
                  validation-message="Наименование раздела не может быть пустым"
                  v-model="siteSectionItem.siteSectionName"
                ></b-input>
              </b-field>

              <b-field label="Заголовок H1">
                <b-input
                  placeholder="Заголовок H1"
                  type="text"
                  required
                  validation-message="Заголовок H1 не может быть пустым"
                  v-model="siteSectionItem.siteSectionH1"
                ></b-input>
              </b-field>

              <b-field label="Фото на странице">
                <AdminImageUploader
                  id="bigImageFile"
                  :srcImage="siteSectionItem.siteSectionImgBig"
                  :onImageText="siteSectionItem.siteSectionH1"
                  @upload="saveSiteSectionImage($event,true)"
                ></AdminImageUploader>
              </b-field>

              <b-field label="Фото на карточке раздела">
                <AdminImageUploader
                  id="smallImageFile"
                  :srcImage="siteSectionItem.siteSectionImgSmall"
                  :onImageText="siteSectionItem.siteSectionName"
                  @upload="saveSiteSectionImage($event,false)"
                ></AdminImageUploader>
              </b-field>

              <div class="brc-admin-field-list_row">
                <b-field label="Левый блок-конструктор">
                  <AdminTextBlockEditor
                    v-model="siteSectionItem.siteSectionFreeText1"
                    id="siteSectionFreeText1"
                  ></AdminTextBlockEditor>
                </b-field>
                <b-field label="Правый блок-конструктор">
                  <AdminTextBlockEditor
                    v-model="siteSectionItem.siteSectionFreeText2"
                    id="siteSectionFreeText2"
                  ></AdminTextBlockEditor>
                </b-field>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Услуги">
            <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
          </b-tab-item>

          <b-tab-item label="Комплексные решения">
            <AdminClientTypeOfferList :siteSection="siteSectionItem.siteSectionUrl">"</AdminClientTypeOfferList>
          </b-tab-item>

          <b-tab-item label="Индивидуальные предложения">
            <AdminBusinessTypeOfferList
              :siteSection="siteSectionItem.siteSectionUrl"
              :offerList="offerList"
            >"</AdminBusinessTypeOfferList>
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
import AdminTextBlockEditor from '@/components/admin/AdminTextBlockEditor.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import AdminClientTypeOfferList from '@/components/admin/AdminClientTypeOfferList.vue'
import AdminBusinessTypeOfferList from '@/components/admin/AdminBusinessTypeOfferList.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { returnStatement } from '@babel/types'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import BaseCard from '@/components/BaseCard.vue'
import AdminStore from '@/store/AdminStore'

@Component({
  components: {
    AdminTextBlockEditor,
    AdminBrandRelationList,
    AdminServiceChildList,
    AdminClientTypeOfferList,
    AdminBusinessTypeOfferList,
    AdminStatusSelector,
    AdminImageUploader,
    BreadCrumbs,
    BaseCard
  }
})
export default class AdminSiteSectionCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceOtherList: BusinessService[] = []
  private offerList: IndividualOffer[] = []
  private brandRelationList: ClBrand[] = []
  private activeTab = 0

  private layout() {
    return 'admin'
  }

  private async asyncData(context: NuxtContext) {
    const siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(
      context.params.siteSection
    )

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Резделы сайта', link: 'admin-site-sections' })
    breadCrumbList.push({ name: siteSectionItem.siteSectionName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForSiteSectionBrands(
      siteSectionItem.siteSectionId
    )
    const serviceOtherList = getServiceContainer().businessServiceService.getBySiteSectionSlug(
      context.params.siteSection
    )
    const offerList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(
      context.params.siteSection
    )

    const data = await Promise.all([
      serviceOtherList,
      brandRelationList,
      offerList
    ])
    return {
      siteSectionItem,
      serviceOtherList: data[0],
      brandRelationList: data[1],
      offerList: data[2],
      activeTab: 0
    }
  }

  private async saveSiteSectionImage(imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSiteSectionImage(
      this.siteSectionItem.siteSectionId,
      formData,
      isBig
    )
  }

  private saveSiteSection() {
    getServiceContainer().publicEkosetService.saveSiteSection(
      this.siteSectionItem
    )
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteSiteSection() {
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

  private brandChecked(clBrandId: number, hasRelation: boolean) {
    getServiceContainer().publicEkosetService.addOrRemoveBrand2SiteSection(
      clBrandId,
      this.siteSectionItem.siteSectionId,
      hasRelation
    )
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-eko-sitesection {
  *.ql-editor {
    height: 400px;
  }
}
</style>





