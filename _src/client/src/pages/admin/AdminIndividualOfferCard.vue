<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Индивидуальное (комплексное) предложение: {{indOfferItem.indOfferName}}</h2>
          <AdminStatusSelector
            statusCaption="Активно"
            v-model.number="indOfferItem.indOfferStatus"
            v-if="!isClientTypeMode"
            @input="saveOffer"
          ></AdminStatusSelector>
        </div>
      </template>

      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row brc-admin-panel__site">
            <b-field label="Фото на странице">
              <AdminImageUploader
                id="bigImageFile"
                :srcImage="indOfferItem.indOfferImgBig"
                @uploader:newimageloaded="addOfferImage($event,true)"
              >
                <template v-slot="{imageSrc}">
                  <figure class="brc-admin-card-image__wrapper">
                    <img class="brc-admin-image" :src="imageSrc" />
                    <h1 class="brc-admin-card-image-title">{{indOfferItem.indOfferH1}}</h1>
                  </figure>
                </template>
              </AdminImageUploader>
            </b-field>
            <b-field label="Наименование" v-if="!isClientTypeMode">
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="indOfferItem.indOfferName"
                v-if="!isClientTypeMode"
                @blur="saveOffer"
              ></b-input>
            </b-field>

            <b-field label="Заголовок H1">
              <b-input
                placeholder="Заголовок H1"
                type="text"
                required
                validation-message="Заголовок H1 не может быть пустым"
                v-model="indOfferItem.indOfferH1"
                @blur="saveOffer"
              ></b-input>
            </b-field>

            <b-field label="URL (ЧПУ) на страницу">
              <b-input type="text" v-model="indOfferItem.indOfferSlug" @blur="saveOffer"></b-input>
            </b-field>

            <b-field label="Направление деятельности" v-if="!isClientTypeMode">
              <AdminClActivitySelector v-model="indOfferItem.clActivityId" @input="saveOffer"></AdminClActivitySelector>
            </b-field>

            <AdminSeoTags
              :seoTitle.sync="indOfferItem.seoTitle"
              :seoDescription.sync="indOfferItem.seoDescription"
              :seoKeywords.sync="indOfferItem.seoKeywords"
              @updated="saveOffer"
            ></AdminSeoTags>
          </div>
          <div class="brc-admin-card-field-list_row">
            <div v-if="!isClientTypeMode">
              <b-field label="Фото на карточке предложения">
                <AdminImageUploader
                  id="smallImageFile"
                  :srcImage="indOfferItem.indOfferImgSmall"
                  :isLeft="true"
                  @uploader:newimageloaded="addOfferImage($event,false)"
                >
                  <template v-slot="{imageSrc}">
                    <BusinessTypeOfferListItem
                      :offerItem="indOfferItem"
                      :imageSrcForDesignMode="imageSrc"
                      style="width:252px;height:142px;margin:0px"
                    ></BusinessTypeOfferListItem>
                  </template>
                </AdminImageUploader>
              </b-field>
            </div>

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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import ClActivity from '@/models/ekoset/ClActivity'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminClActivitySelector from '@/components/admin/AdminClActivitySelector.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AdminDynamicComponentsContainer from '@/components/admin/AdminDynamicComponentsContainer.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import BaseCard from '@/components/BaseCard.vue'
import BusinessTypeOfferListItem from '@/components/public/BusinessTypeOfferListItem.vue'
import AdminSeoTags from '@/components/admin/AdminSeoTags.vue'

@Component({
  components: {
    AdminSiteSectionSelector,
    BreadCrumbs,
    AdminClActivitySelector,
    AdminStatusSelector,
    AdminImageUploader,
    AdminDynamicComponentsContainer,
    BaseCard,
    AdminFreeContentBlockEditor,
    BusinessTypeOfferListItem,
    AdminSeoTags
  }})
export default class AdminIndividualOfferCard extends Vue {
  private indOfferItem: IndividualOffer = new IndividualOffer()
  private serviceList: BusinessService = new BusinessService()
  private dynamicComponentInfo: DynamicComponentInfo[] = []

  private layout () {
    return 'admin'
  }

  private get isClientTypeMode () {
    return this.indOfferItem.clClientId > 0
  }

  private async asyncData (context: NuxtContext) {
    let indOfferItem: IndividualOffer
    let isClientTypeMode = false
    if (context.params.clienttype) {
      isClientTypeMode = true
      indOfferItem = context.params.clienttype === 'business'
        ? await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug(context.params.siteSection)
        : await getServiceContainer().individualOfferService.getForPrivatePersonBySiteSectionSlug(context.params.siteSection)
    } else {
      indOfferItem = await getServiceContainer().individualOfferService.getBySlug(context.params.offer)
    }

    const siteSection = await getServiceContainer().publicEkosetService.getSiteSectionBySlug('SLUG-' + indOfferItem.siteSectionId)

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: siteSection.siteSectionName, link: 'admin-site-section-card', params: { siteSection: siteSection.siteSectionUrl } })
    breadCrumbList.push({ name: indOfferItem.indOfferName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const dynaComponents = getServiceContainer().dynamicComponentsService.getIndOfferDynamicComponentsInfo(siteSection.siteSectionUrl, indOfferItem.indOfferUrl, context.params.clienttype, indOfferItem.clActivityId, true)

    const data = await Promise.all([dynaComponents])

    return {
      indOfferItem,
      dynamicComponentInfo: data[0]
    }
  }

  private saveOffer () {
    getServiceContainer().individualOfferService.save(this.indOfferItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveDynamicComponentsInfo () {
    await getServiceContainer().dynamicComponentsService.adminSaveDynamicComponentsOffer(this.indOfferItem.indOfferId, this.dynamicComponentInfo)
    await this.refreshDynamicComponentsInfo()
  }

  private async refreshDynamicComponentsInfo () {
    const clienttype = !!this.indOfferItem.clClientId ? (this.indOfferItem.clClientId === 1 ? 'business' : 'person') : null
    this.dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getIndOfferDynamicComponentsInfo('slug-' + this.indOfferItem.siteSectionId, this.indOfferItem.indOfferUrl, clienttype, this.indOfferItem.clActivityId, true)
  }


  private async addOfferImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveOfferImage(this.indOfferItem.indOfferId, formData, isBig)
  }

  private deleteOffer () {
    const self = this
    const okCallback = async () => {
      await getServiceContainer().individualOfferService.delete(this.indOfferItem.indOfferId)
      self.$router.push({ name: 'admin-individual-offers' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить индивидуальное предложение?', 'Подтвердите удаление', okCallback)
  }

}
</script>

