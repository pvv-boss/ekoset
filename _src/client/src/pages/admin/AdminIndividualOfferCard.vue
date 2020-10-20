<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>
            Индивидуальное (комплексное) предложение:
            {{ indOfferItem.indOfferName }}
          </h2>
          <LazyAdminStatusSelector
            v-if="!isClientTypeMode"
            v-model.number="indOfferItem.indOfferStatus"
            status-caption="Активно"
            @input="saveOffer"
          ></LazyAdminStatusSelector>
        </div>
      </template>

      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row brc-admin-panel__site">
            <b-field label="Фото на странице">
              <LazyAdminImageUploader
                id="bigImageFile"
                :src-image="indOfferItem.indOfferImgBig"
                @uploader:newimageloaded="addOfferImage($event, true)"
              >
                <template v-slot="{ imageSrc }">
                  <figure class="brc-admin-card-image__wrapper">
                    <img class="brc-admin-image" :src="imageSrc" />
                    <h1 class="brc-admin-card-image-title">
                      {{ indOfferItem.indOfferH1 }}
                    </h1>
                  </figure>
                </template>
              </LazyAdminImageUploader>
            </b-field>
            <b-field v-if="!isClientTypeMode" label="Наименование">
              <b-input
                v-if="!isClientTypeMode"
                v-model="indOfferItem.indOfferName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                @blur="saveOffer"
              ></b-input>
            </b-field>

            <b-field label="Заголовок H1">
              <b-input
                v-model="indOfferItem.indOfferH1"
                placeholder="Заголовок H1"
                type="text"
                required
                validation-message="Заголовок H1 не может быть пустым"
                @blur="saveOffer"
              ></b-input>
            </b-field>

            <b-field label="URL (ЧПУ) на страницу">
              <b-input
                v-model="indOfferItem.indOfferSlug"
                type="text"
                @blur="saveOffer"
              ></b-input>
            </b-field>

            <b-field v-if="!isClientTypeMode" label="Направление деятельности">
              <LazyAdminClActivitySelector
                v-model="indOfferItem.clActivityId"
                @input="saveOffer"
              ></LazyAdminClActivitySelector>
            </b-field>

            <LazyAdminSeoTags
              :seo-title.sync="indOfferItem.seoTitle"
              :seo-description.sync="indOfferItem.seoDescription"
              :seo-keywords.sync="indOfferItem.seoKeywords"
              @updated="saveOffer"
            ></LazyAdminSeoTags>
          </div>
          <div class="brc-admin-card-field-list_row">
            <div v-if="!isClientTypeMode">
              <b-field label="Фото на карточке предложения">
                <LazyAdminImageUploader
                  id="smallImageFile"
                  :src-image="indOfferItem.indOfferImgSmall"
                  :is-left="true"
                  @uploader:newimageloaded="addOfferImage($event, false)"
                >
                  <template v-slot="{ imageSrc }">
                    <LazyBusinessTypeOfferListItem
                      :offer-item="indOfferItem"
                      :image-src-for-design-mode="imageSrc"
                      style="width: 252px; height: 142px; margin: 0px"
                    ></LazyBusinessTypeOfferListItem>
                  </template>
                </LazyAdminImageUploader>
              </b-field>
            </div>

            <LazyAdminDynamicComponentsContainer
              v-model="dynamicComponentInfo"
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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import SiteSection from '@/models/ekoset/SiteSection'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import ClActivity from '@/models/ekoset/ClActivity'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AdminStore from '@/store/AdminStore'

@Component
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
    const clienttype = this.indOfferItem.clClientId ? (this.indOfferItem.clClientId === 1 ? 'business' : 'person') : null
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

