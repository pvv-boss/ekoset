<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Подраздел сайта: {{siteSectionItem.siteSectionName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-site-section-card__attributes">
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Наименование</div>
            <input type="text" v-model="siteSectionItem.siteSectionName" />
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
            <AdminStatusSelector v-model="siteSectionItem.siteSectionStatus"></AdminStatusSelector>
          </div>

          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Превью изображение</div>
            <AdminFileUploader v-model="siteSectionItem.siteSectionImgSmall"></AdminFileUploader>
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Основное изображение</div>
            <AdminFileUploader v-model="siteSectionItem.siteSectionImgBig"></AdminFileUploader>
          </div>
          <div class="brc-admin-card-attribute__caption">Текстовый блок 1</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText1"></AdminArticleEditor>
          <div class="brc-admin-card-attribute__caption">Текстовый блок 2</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText2"></AdminArticleEditor>
          <button type="button" @click="saveSiteSection">Сохранить</button>
          <button
            v-if="siteSectionItem.siteSectionId > 0"
            type="button"
            @click="deleteSiteSection"
          >Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations">
        <div>
          <h4>Комплексные решения</h4>
          <AdminClientTypeOfferList :siteSection="siteSectionSlug">"</AdminClientTypeOfferList>
        </div>
        <div>
          <h4>Индивидуальные предложения</h4>
          <AdminBusinessTypeOfferList :siteSection="siteSectionSlug" :offerList="offerList">"</AdminBusinessTypeOfferList>
        </div>
        <div>
          <h4>Услуги</h4>
          <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
        </div>
        <div>
          <h4>Рекомендации</h4>
          <AdminBrandRelationList
            :brandRelationItems="brandRelationList"
            @brandchecked="brandChecked"
          ></AdminBrandRelationList>
        </div>
      </div>
    </div>
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
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import AdminClientTypeOfferList from '@/components/admin/AdminClientTypeOfferList.vue'
import AdminBusinessTypeOfferList from '@/components/admin/AdminBusinessTypeOfferList.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { returnStatement } from '@babel/types'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    AdminArticleEditor,
    AdminBrandRelationList,
    AdminFileUploader,
    AdminServiceChildList,
    AdminClientTypeOfferList,
    AdminBusinessTypeOfferList,
    AdminStatusSelector,
    BreadCrumbs
  }})

export default class AdminSiteSectionCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceOtherList: BusinessService[] = []
  private offerList: IndividualOffer[] = []
  private brandRelationList: ClBrand[] = []
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private get siteSectionSlug () {
    return `${this.siteSectionItem.siteSectionSlug}-${this.siteSectionItem.siteSectionId}`
  }

  private async asyncData (context: NuxtContext) {

    const siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(context.params.siteSection)

    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForSiteSectionBrands(siteSectionItem.siteSectionId)
    const serviceOtherList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.siteSection)
    const offerList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)

    const data = await Promise.all([serviceOtherList, brandRelationList, offerList])
    return {
      siteSectionItem,
      serviceOtherList: data[0],
      brandRelationList: data[1],
      offerList: data[2]
    }


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

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Подразделы', link: 'admin-site-sections' })
    this.breadCrumbList.push({ name: 'Карточка подраздела', link: '' })
  }

}
</script>




