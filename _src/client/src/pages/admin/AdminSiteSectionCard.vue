<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Подраздел сайта: {{siteSectionItem.siteSectionName}}</h2>
          <b-button type="is-primary" @click="saveSiteSection">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card">
              <div class="brc-admin-card__attributes">
                <div class="brc-site-section-card__attributes">
                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Наименование</div>
                    <input type="text" v-model="siteSectionItem.siteSectionName" />
                  </div>

                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Заголовок H1</div>
                    <input type="text" v-model="siteSectionItem.siteSectionH1" />
                  </div>

                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Префикс</div>
                    <input type="text" v-model="siteSectionItem.siteSectionSlug" disabled />
                  </div>
                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Приоритет</div>
                    <input type="number" v-model.number="siteSectionItem.siteSectionPriority" />
                  </div>
                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Статус</div>
                    <AdminStatusSelector v-model.number="siteSectionItem.siteSectionStatus"></AdminStatusSelector>
                  </div>

                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Фото на странице</div>
                    <AdminImageUploader
                      id="bigImageFile"
                      @upload="saveSiteSectionImage($event,true)"
                    ></AdminImageUploader>
                  </div>

                  <div class="brc-admin-card-attribute">
                    <div class="brc-admin-card-attribute__caption">Фото на карточке раздела</div>
                    <AdminImageUploader
                      id="smallImageFile"
                      @upload="saveSiteSectionImage($event,false)"
                    ></AdminImageUploader>
                  </div>

                  <div class="brc-admin-card-attribute__caption">Текстовый блок 1</div>
                  <AdminTextBlockEditor v-model="siteSectionItem.siteSectionFreeText1"></AdminTextBlockEditor>
                  <div class="brc-admin-card-attribute__caption">Текстовый блок 2</div>
                  <AdminTextBlockEditor v-model="siteSectionItem.siteSectionFreeText2"></AdminTextBlockEditor>
                </div>
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
  }})

export default class AdminSiteSectionCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceOtherList: BusinessService[] = []
  private offerList: IndividualOffer[] = []
  private brandRelationList: ClBrand[] = []
  private activeTab = 0

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {

    const siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Резделы сайта', link: 'admin-site-sections' })
    breadCrumbList.push({ name: siteSectionItem.siteSectionName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForSiteSectionBrands(siteSectionItem.siteSectionId)
    const serviceOtherList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.siteSection)
    const offerList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)

    const data = await Promise.all([serviceOtherList, brandRelationList, offerList])
    return {
      siteSectionItem,
      serviceOtherList: data[0],
      brandRelationList: data[1],
      offerList: data[2],
      activeTab: 0
    }

  }

  private async saveSiteSectionImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveSiteSectionImage(this.siteSectionItem.siteSectionId, formData, isBig)
  }

  private saveSiteSection () {
    getServiceContainer().publicEkosetService.saveSiteSection(this.siteSectionItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteSiteSection () {
    const self = this
    const okCallback = async () => {
      if (this.siteSectionItem.siteSectionSlug) {
        await getServiceContainer().publicEkosetService.deleteSiteSection(this.siteSectionItem.siteSectionSlug)
      }
      self.$router.push({ name: 'admin-site-sections' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить раздел?', 'Подтвердите удаление', okCallback)
  }

  private brandChecked (clBrandId: number, hasRelation: boolean) {
    getServiceContainer().publicEkosetService.addOrRemoveBrand2SiteSection(clBrandId, this.siteSectionItem.siteSectionId, hasRelation)
  }

}
</script>




