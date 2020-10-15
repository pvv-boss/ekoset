<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Услуга: {{ serviceItem.businessServiceName }}</h2>
          <AdminStatusSelector
            v-model.number="serviceItem.businessServiceStatus"
            status-caption="Активна"
            @input="saveService"
          ></AdminStatusSelector>

          <b-field label="Ед. измерения" horizontal style="margin-bottom: 0px">
            <b-input
              v-model="serviceItem.businessServiceUnit"
              placeholder="Единица измерения"
              @blur="saveService"
            ></b-input>
          </b-field>

          <b-field label="Цена, руб." horizontal style="margin-bottom: 0px">
            <b-input
              v-model="serviceItem.businessServicePrice"
              placeholder="Цена, руб."
              @blur="saveService"
            ></b-input>
          </b-field>
        </div>
      </template>
      <template #content>
        <b-tabs v-model="activeTab">
          <b-tab-item label="Оформление">
            <div class="brc-admin-card_two-column">
              <div class="brc-admin-card-field-list_row brc-admin-panel__site">
                <b-field label="Фото на странице">
                  <AdminImageUploader
                    id="bigImageFile"
                    :src-image="serviceItem.businessServiceImgBig"
                    @uploader:newimageloaded="addServiceImage($event, true)"
                  >
                    <template v-slot="{ imageSrc }">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">
                          {{ serviceItem.businessServiceH1 }}
                        </h1>
                      </figure>
                    </template>
                  </AdminImageUploader>
                </b-field>

                <b-field label="Наименование">
                  <b-input
                    v-model="serviceItem.businessServiceName"
                    placeholder="Наименование"
                    type="text"
                    required
                    validation-message="Наименование услуги не может быть пустым"
                    @blur="saveService"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    v-model="serviceItem.businessServiceH1"
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                    @blur="saveService"
                  ></b-input>
                </b-field>

                <b-field label="URL (ЧПУ) на страницу">
                  <b-input
                    v-model="serviceItem.businessServiceSlug"
                    type="text"
                    @blur="saveService"
                  ></b-input>
                </b-field>

                <h3>Настройка баннера</h3>

                <div class="field">
                  <b-switch
                    v-model="serviceItem.bsBannerInSectionInd"
                    true-value="1"
                    false-value="0"
                    type="is-success"
                    size="is-small"
                    @input="saveService"
                    >Баннер отображать в Подразделе</b-switch
                  >
                </div>
                <b-field label="Заголовок для баннера в Подразделе">
                  <b-input
                    v-model="serviceItem.bsBannerInSectionTitle"
                    type="text"
                    @blur="saveService"
                  ></b-input>
                </b-field>

                <div class="field">
                  <b-switch
                    v-model="serviceItem.bsBannerInMainInd"
                    true-value="1"
                    false-value="0"
                    type="is-success"
                    size="is-small"
                    @input="saveService"
                    >Баннер отображать на Главной</b-switch
                  >
                </div>
                <b-field label="Заголовок для баннера на Главной">
                  <b-input
                    v-model="serviceItem.bsBannerInMainTitle"
                    type="text"
                    @blur="saveService"
                  ></b-input>
                </b-field>

                <AdminSeoTags
                  :seo-title.sync="serviceItem.seoTitle"
                  :seo-description.sync="serviceItem.seoDescription"
                  :seo-keywords.sync="serviceItem.seoKeywords"
                  @updated="saveService"
                ></AdminSeoTags>
              </div>

              <div class="brc-admin-card-field-list_row">
                <div>
                  <b-field label="Фото на карточке услуги">
                    <AdminImageUploader
                      id="smallImageFile"
                      :src-image="serviceItem.businessServiceImgSmall"
                      :is-left="true"
                      @uploader:newimageloaded="addServiceImage($event, false)"
                    >
                      <template v-slot="{ imageSrc }">
                        <ServiceListItem
                          :service-item="serviceItem"
                          :image-src-for-design-mode="imageSrc"
                          style="width: 263px; height: 212px; margin: 0px"
                        ></ServiceListItem>
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
          </b-tab-item>

          <b-tab-item
            v-if="!serviceItem.businessServiceParentId"
            label="Услуги второго уровня"
          >
            <AdminServiceListContainer
              v-model="serviceOtherList"
              :site-section="siteSection"
              :parent-service-id="serviceItem.businessServiceId"
              @newservice:saved="refreshServiceList"
              @service:moved="refreshServiceList"
            ></AdminServiceListContainer>
          </b-tab-item>

          <b-tab-item label="Связанные услуги">
            <AdminRelatedService
              :service-relation-list="serviceRelationList"
              :related-service-list="relatedServiceList"
              @service:checked="relatedServiceSelected"
              @service:priortity:changed="relatedServicePriorityChanged"
            ></AdminRelatedService>
          </b-tab-item>

          <b-tab-item label="Тип клиента, объекта">
            <div class="brc-admin-card-field-list_column">
              <b-field label="Типы клиентов" style="flex: 1">
                <div
                  class="brc-admin-card__help"
                  style="display: flex; flex-direction: column; flex: 1"
                >
                  <span
                    >Тип клиента определяет будет ли данная услуга выводиться в
                    списке услуг комплексных решений (по типу клиента) данного
                    раздела</span
                  >
                  <AdminClientTypeRelationList
                    :client-type-relation-items="clientTypeRelationList"
                    @clienttypechecked="clientTypeChecked"
                  ></AdminClientTypeRelationList>
                </div>
              </b-field>

              <b-field
                label="Виды деятельности"
                style="flex: 1; margin-left: 30px"
              >
                <div
                  class="brc-admin-card__help"
                  style="display: flex; flex-direction: column; flex: 1"
                >
                  <span
                    >Вид деятельности определяет будет ли данная услуга
                    выводиться в списке услуг индивидуального предложения (для
                    данного вида деятельности)</span
                  >
                  <AdminActivityRelationList
                    :activity-relation-items="activityRelationList"
                    @activitychecked="activityChecked"
                  ></AdminActivityRelationList>
                </div>
              </b-field>
            </div>
          </b-tab-item>

          <b-tab-item
            v-if="!serviceItem.businessServiceParentId"
            label="Рекомендации"
          >
            <AdminBrandRelationList
              :brand-relation-items="brandRelationList"
              :disabled="serviceItem.businessServiceParentId > 0"
              @brandchecked="brandChecked"
            ></AdminBrandRelationList>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity'
import ClClient from '@/models/ekoset/ClClient'
import AdminStore from '@/store/AdminStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SiteSection from '../../models/ekoset/SiteSection'

@Component
export default class AdminServiceCard extends Vue {
  private siteSection: SiteSection = new SiteSection()
  private serviceItem: BusinessService = new BusinessService()
  private serviceOtherList: BusinessService[] = []
  private brandRelationList: ClBrand[] = []
  private activityRelationList: ClActivity[] = []
  private clientTypeRelationList: any[] = [1, 2, 3]
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()
  private activeTab = 0
  private dynamicComponentInfo: DynamicComponentInfo[] = []
  private serviceRelationList: any[] = []
  private relatedServiceList: any[] = []

  private layout () {
    return 'admin'
  }

  @Watch('serviceItem.businessServiceParentId', { immediate: true })
  private async updateParentService () {
    if (!!this.serviceItem.businessServiceParentId && this.serviceItem.businessServiceParentId > 0) {
      this.brandRelationList = await getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(Number(this.serviceItem.businessServiceParentId))
      // this.activityRelationList = await getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + Number(this.serviceItem.businessServiceParentId))
      // this.clientTypeRelationList = await getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + Number(this.serviceItem.businessServiceParentId))
    }
    this.activityRelationList = await getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + Number(this.serviceItem.businessServiceId))
    this.clientTypeRelationList = await getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + Number(this.serviceItem.businessServiceId))

  }

  private async asyncData (context: NuxtContext) {
    const serviceItem = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const siteSection = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(serviceItem.siteSectionUrl)

    const serviceIdForRelations = !!serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0 ? serviceItem.businessServiceParentId : serviceItem.businessServiceId
    const serviceOtherList = serviceItem.businessServiceParentId == null ? await getServiceContainer().businessServiceService.adminGetChildServicesByParentId(serviceItem.businessServiceId) : []
    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(serviceIdForRelations)

    // const activityRelation = getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + serviceIdForRelations)
    //    const clientTypeRelation = getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + serviceIdForRelations)
    const activityRelation = getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + serviceItem.businessServiceId)
    const clientTypeRelation = getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + serviceItem.businessServiceId)

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: siteSection.siteSectionName, link: 'admin-site-section-card', params: { siteSection: siteSection.siteSectionUrl } })
    if (serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0) {
      const parentService = await getServiceContainer().businessServiceService.getBySlug('slug-' + serviceItem.businessServiceParentId)
      breadCrumbList.push({ name: parentService.businessServiceName, link: 'admin-service-card', params: { service: parentService.businessServiceUrl } })
    }
    breadCrumbList.push({ name: serviceItem.businessServiceName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const dynaComponents = getServiceContainer().dynamicComponentsService.getServiceDynamicComponentsInfo(siteSection.siteSectionUrl, serviceItem.businessServiceUrl, true)

    const serviceRelationListPr = getServiceContainer().businessServiceService.adminGetServiceRelation(serviceItem.businessServiceId)
    const adminGetRelatedPr = getServiceContainer().businessServiceService.adminGetRelated(serviceItem.businessServiceId)

    const data = await Promise.all([brandRelationList, activityRelation, clientTypeRelation, dynaComponents, serviceRelationListPr, adminGetRelatedPr])
    return {
      serviceItem,
      brandRelationList: data[0],
      serviceOtherList,
      activityRelationList: data[1],
      clientTypeRelationList: data[2],
      dynamicComponentInfo: data[3],
      serviceRelationList: data[4],
      relatedServiceList: data[5],
      siteSection
    }
  }

  private saveService () {
    getServiceContainer().businessServiceService.save(this.serviceItem)

    getServiceContainer().businessServiceService.saveAll(this.serviceOtherList)

    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }


  private async saveDynamicComponentsInfo () {
    await getServiceContainer().dynamicComponentsService.saveServiceDynamicComponentsInfo(this.serviceItem.businessServiceId, this.dynamicComponentInfo)
    await this.refreshDynamicComponentsInfo()
  }

  private async refreshDynamicComponentsInfo () {
    this.dynamicComponentInfo = await getServiceContainer().dynamicComponentsService.getServiceDynamicComponentsInfo(this.serviceItem.siteSectionUrl, this.serviceItem.businessServiceUrl, true)
  }

  private brandChecked (clBrandId: number, hasRelation: boolean) {
    getServiceContainer().publicEkosetService.addOrRemoveBrand2Service(clBrandId, this.serviceItem.businessServiceId, hasRelation)
  }

  private clientTypeChecked (clClientId: number, hasRelation: boolean) {
    if (clClientId === 1) {
      getServiceContainer().businessServiceService.addRemoveBusinessType2Service(this.serviceItem.businessServiceUrl, hasRelation)
    } else {
      getServiceContainer().businessServiceService.addRemovePrivatePerson2Service(this.serviceItem.businessServiceUrl, hasRelation)
    }

  }

  private async addServiceImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveServiceImage(this.serviceItem.businessServiceId, formData, isBig)
  }


  private activityChecked (clActivityId: number, hasRelation: boolean) {
    getServiceContainer().businessServiceService.addRemoveActivityType2Service(this.serviceItem.businessServiceUrl, clActivityId, hasRelation)
  }

  private async refreshServiceList () {
    this.serviceOtherList = await getServiceContainer().businessServiceService.adminGetChildServicesByParentId(this.serviceItem.businessServiceId)
  }

  private async relatedServiceSelected (serviceId: number, selected: boolean) {
    await getServiceContainer().businessServiceService.adminAddRemoveRelated(this.serviceItem.businessServiceId, serviceId, 0, selected)
    this.refreshRelatedService()
  }

  private relatedServicePriorityChanged (relatedServiceList: any[]) {
    relatedServiceList.map((iter) => {
      getServiceContainer().businessServiceService.adminAddRemoveRelated(this.serviceItem.businessServiceId, iter.businessServiceId, iter.businessServicePriority, true)
    })
  }

  private async refreshRelatedService () {
    // const serviceRelationListPr = getServiceContainer().businessServiceService.adminGetServiceRelation(this.serviceItem.businessServiceId)
    const adminGetRelatedPr = getServiceContainer().businessServiceService.adminGetRelated(this.serviceItem.businessServiceId)
    // const data = await Promise.all([serviceRelationListPr, adminGetRelatedPr])
    const data = await Promise.all([adminGetRelatedPr])
    // this.serviceRelationList = data[0]
    this.relatedServiceList = data[0]
  }

  private mounted () {
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
  }

}
</script>



