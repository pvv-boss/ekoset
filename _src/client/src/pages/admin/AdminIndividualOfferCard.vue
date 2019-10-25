<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList" v-if="breadCrumbList.length > 0"></BreadCrumbs>
    <h1>Индивидуальное предложение: {{indOfferItem.indOfferName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="indOfferItem.indOfferName" :disabled="isClientTypeMode" />
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Заголовок H1</div>
          <input type="text" v-model="indOfferItem.indOfferName" :disabled="isClientTypeMode" />
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
          <AdminSiteSectionSelector
            v-model="indOfferItem.siteSectionId"
            :disabled="isClientTypeMode"
          ></AdminSiteSectionSelector>
        </div>
        <div class="brc-service-attribute" v-if="isClientTypeMode">
          <div class="brc-service-attribute__caption">Тип клиента</div>
          <AdminClientTypeSelector v-model.number="indOfferItem.clClientId" disabled="true"></AdminClientTypeSelector>
        </div>
        <div class="brc-admin-card-attribute" v-if="!isClientTypeMode">
          <div class="brc-admin-card-attribute__caption">Направление деятельности</div>
          <AdminClActivitySelector v-model.number="indOfferItem.clActivityId"></AdminClActivitySelector>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" v-model.number="indOfferItem.indOfferPriority" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Статус</div>
          <AdminStatusSelector v-model.number="indOfferItem.indOfferStatus"></AdminStatusSelector>
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Фото на странице</div>
          <AdminImageUploader id="bigOfferImageFile" @upload="saveOfferImage($event,false)"></AdminImageUploader>
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Фото в карточке предложения</div>
          <AdminImageUploader id="smallOfferImageFile" @upload="saveOfferImage($event,true)"></AdminImageUploader>
        </div>

        <div class="brc-admin-card__editor">
          <div class="brc-service-attribute__caption">Текстовый блок 1</div>
          <AdminTextBlockEditor v-model="indOfferItem.indOfferFreeText1"></AdminTextBlockEditor>
          <div class="brc-service-attribute__caption">Текстовый блок 2</div>
          <AdminTextBlockEditor v-model="indOfferItem.indOfferFreeText2"></AdminTextBlockEditor>
        </div>
        <div class="brc-admin-card__save">
          <button type="button" @click="saveOffer">Сохранить</button>
          <button type="button" @click="deleteOffer">Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminTextBlockEditor from '@/components/admin/AdminTextBlockEditor.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import ClActivity from '@/models/ekoset/ClActivity'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminClActivitySelector from '@/components/admin/AdminClActivitySelector.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminClientTypeSelector from '@/components/admin/AdminClientTypeSelector.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'


@Component({
  components: {
    AdminTextBlockEditor,
    AdminSiteSectionSelector,
    AdminServiceChildList,
    BreadCrumbs,
    AdminClActivitySelector,
    AdminStatusSelector,
    AdminClientTypeSelector,
    AdminImageUploader
  }})
export default class AdminIndividualOfferCard extends Vue {
  private indOfferItem: IndividualOffer = new IndividualOffer()
  private serviceList: BusinessService = new BusinessService()
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private get isClientTypeMode () {
    return (!!this.indOfferItem.clClientId && this.indOfferItem.clClientId > 0)
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

    let serviceList: Promise<BusinessService>
    if (isClientTypeMode) {
      serviceList = context.params.clienttype === 'business'
        ? getServiceContainer().businessServiceService.getForBusinessBySiteSectionSlug(context.params.siteSection)
        : getServiceContainer().businessServiceService.getForPrivatePersonBySiteSectionSlug(context.params.siteSection)
    } else {
      serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(context.params.siteSection, indOfferItem.clActivityId)
    }
    const data = await Promise.all([serviceList])
    return {
      indOfferItem,
      serviceList: data[0]

    }
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {

    const siteSectionSlug = getModule(AppStore, this.$store).currentSiteSection
    const siteSectionName = getModule(AppStore, this.$store).currentSiteSectionName

    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Индивидуальные предложения', link: 'admin-individual-offers' })
    if (siteSectionSlug) {
      this.breadCrumbList.push({ name: siteSectionName, link: 'admin-site-section-card', params: { siteSection: siteSectionSlug } })
    }
    this.breadCrumbList.push({ name: this.indOfferItem.indOfferName })
  }

  private saveOffer () {
    getServiceContainer().individualOfferService.save(this.indOfferItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveOfferImage (imageFile: string, isBig: boolean) {
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

