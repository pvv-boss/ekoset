<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList" v-if="breadCrumbList.length > 0"></BreadCrumbs>
    <h1>Индивидуальное предложение: {{indOfferItem.indOfferName}}</h1>
    <div class="brc-admin-card" v-if="indOfferItem.indOfferId > 0">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="indOfferItem.indOfferName" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Префикс</div>
          <input type="text" v-model="indOfferItem.indOfferSlug" disabled />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
          <AdminSiteSectionSelector v-model="indOfferItem.siteSectionId"></AdminSiteSectionSelector>
        </div>
        <div class="brc-admin-card-attribute" v-if="!isClientTypeMode">
          <div class="brc-admin-card-attribute__caption">Направление деятельности</div>
          <AdminClActivitySelector v-model="indOfferItem.clActivityId"></AdminClActivitySelector>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" v-model.number="indOfferItem.indOfferPriority" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Статус</div>
          <input type="number" v-model.number="indOfferItem.indOfferStatus" />
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Превью изображение</div>
          <AdminFileUploader v-model="indOfferItem.indOfferImgSmall"></AdminFileUploader>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Основное изображение</div>
          <AdminFileUploader v-model="indOfferItem.indOfferImgBig"></AdminFileUploader>
        </div>
        <div class="brc-admin-card__editor">
          <div class="brc-service-attribute__caption">Текстовый блок 1</div>
          <AdminArticleEditor v-model="indOfferItem.indOfferFreeText1"></AdminArticleEditor>
          <div class="brc-service-attribute__caption">Текстовый блок 2</div>
          <AdminArticleEditor v-model="indOfferItem.indOfferFreeText2"></AdminArticleEditor>
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
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import IndividualOffer from '@/models/ekoset/IndividualOffer'
import ClActivity from '@/models/ekoset/ClActivity'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminClActivitySelector from '@/components/admin/AdminClActivitySelector.vue'

@Component({
  components: {
    AdminArticleEditor,
    AdminSiteSectionSelector,
    AdminFileUploader,
    AdminServiceChildList,
    BreadCrumbs,
    AdminClActivitySelector
  }})
export default class AdminIndividualOfferCard extends Vue {
  private indOfferItem: IndividualOffer = new IndividualOffer()
  private serviceList: BusinessService = new BusinessService()
  private breadCrumbList: any[] = []
  private isClientTypeMode = true

  private layout () {
    return 'admin'
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
      serviceList = getServiceContainer().businessServiceService.getByActivityAndBySiteSectionSlug(context.params.siteSection, indOfferItem.indOfferUrl)
    }
    const data = await Promise.all([serviceList])
    return {
      indOfferItem,
      serviceList: data[0],
      isClientTypeMode
    }
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Индивидуальные предложения', link: 'admin-individual-offers' })
    this.breadCrumbList.push({ name: this.indOfferItem.indOfferName })
  }

  private saveOffer () {
    getServiceContainer().individualOfferService.save(this.indOfferItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
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

