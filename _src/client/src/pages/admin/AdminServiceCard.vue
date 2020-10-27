<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Услуга: {{ serviceItem.businessServiceName }}</h2>
          <LazyAdminStatusSelector
            v-model.number="serviceItem.businessServiceStatus"
            status-caption="Активна"
            @input="saveService"
          ></LazyAdminStatusSelector>

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
                  <LazyAdminImageUploader
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
                  </LazyAdminImageUploader>
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

                <LazyAdminSeoTags
                  :seo-title.sync="serviceItem.seoTitle"
                  :seo-description.sync="serviceItem.seoDescription"
                  :seo-keywords.sync="serviceItem.seoKeywords"
                  @updated="saveService"
                ></LazyAdminSeoTags>
              </div>

              <div class="brc-admin-card-field-list_row">
                <div>
                  <b-field label="Фото на карточке услуги">
                    <LazyAdminImageUploader
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
          </b-tab-item>

          <b-tab-item
            v-if="!serviceItem.businessServiceParentId"
            label="Услуги второго уровня"
          >
            <LazyAdminServiceListContainer
              v-model="serviceOtherList"
              :site-section="siteSection"
              :parent-service-id="serviceItem.businessServiceId"
              @newservice:saved="refreshServiceList"
              @service:moved="refreshServiceList"
            ></LazyAdminServiceListContainer>
          </b-tab-item>

          <b-tab-item label="Связанные услуги">
            <LazyAdminRelatedService
              :service-relation-list="serviceRelationList"
              :related-service-list="relatedServiceList"
              @service:checked="relatedServiceSelected"
              @service:priortity:changed="relatedServicePriorityChanged"
            ></LazyAdminRelatedService>
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
                  <LazyAdminClientTypeRelationList
                    :client-type-relation-items="clientTypeRelationList"
                    @clienttypechecked="clientTypeChecked"
                  ></LazyAdminClientTypeRelationList>
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
                  <LazyAdminActivityRelationList
                    :activity-relation-items="activityRelationList"
                    @activitychecked="activityChecked"
                  ></LazyAdminActivityRelationList>
                </div>
              </b-field>
            </div>
          </b-tab-item>

          <b-tab-item
            v-if="!serviceItem.businessServiceParentId"
            label="Рекомендации"
          >
            <LazyAdminBrandRelationList
              :brand-relation-items="brandRelationList"
              :disabled="serviceItem.businessServiceParentId > 0"
              @brandchecked="brandChecked"
            ></LazyAdminBrandRelationList>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity'
import AdminStore from '@/store/AdminStore'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import SiteSection from '../../models/ekoset/SiteSection'
import { ServiceRegistry } from '@/ServiceRegistry'
import PublicEkosetService from '@/services/PublicEkosetService'
import BusinessServiceService from '@/services/BusinessServiceService'
import DynamicComponentsService from '@/services/DynamicComponentsService'
import { Context } from "@nuxt/types";
import MediaService from '@/services/MediaService'


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
      this.brandRelationList = await ServiceRegistry.instance.getService(PublicEkosetService).getAdminForBusinessServiceBrands(Number(this.serviceItem.businessServiceParentId))
      // this.activityRelationList = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminСlActivitiesForService('slug-' + Number(this.serviceItem.businessServiceParentId))
      // this.clientTypeRelationList = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminclClientsForService('slug-' + Number(this.serviceItem.businessServiceParentId))
    }
    this.activityRelationList = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminСlActivitiesForService('slug-' + Number(this.serviceItem.businessServiceId))
    this.clientTypeRelationList = await ServiceRegistry.instance.getService(BusinessServiceService).getAdminclClientsForService('slug-' + Number(this.serviceItem.businessServiceId))

  }

  private async asyncData (context: Context) {
    const serviceItem = await ServiceRegistry.instance.getService(BusinessServiceService).getBySlug(context.params.service)
    const siteSection = await ServiceRegistry.instance.getService(PublicEkosetService).getSiteSectionBySlug(serviceItem.siteSectionUrl)

    const serviceIdForRelations = !!serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0 ? serviceItem.businessServiceParentId : serviceItem.businessServiceId
    const serviceOtherList = serviceItem.businessServiceParentId == null ? await ServiceRegistry.instance.getService(BusinessServiceService).adminGetChildServicesByParentId(serviceItem.businessServiceId) : []
    const brandRelationList = ServiceRegistry.instance.getService(PublicEkosetService).getAdminForBusinessServiceBrands(serviceIdForRelations)

    // const activityRelation = ServiceRegistry.instance.getService(BusinessServiceService).getAdminСlActivitiesForService('slug-' + serviceIdForRelations)
    //    const clientTypeRelation = ServiceRegistry.instance.getService(BusinessServiceService).getAdminclClientsForService('slug-' + serviceIdForRelations)
    const activityRelation = ServiceRegistry.instance.getService(BusinessServiceService).getAdminСlActivitiesForService('slug-' + serviceItem.businessServiceId)
    const clientTypeRelation = ServiceRegistry.instance.getService(BusinessServiceService).getAdminclClientsForService('slug-' + serviceItem.businessServiceId)

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: siteSection.siteSectionName, link: 'admin-site-section-card', params: { siteSection: siteSection.siteSectionUrl } })
    if (serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0) {
      const parentService = await ServiceRegistry.instance.getService(BusinessServiceService).getBySlug('slug-' + serviceItem.businessServiceParentId)
      breadCrumbList.push({ name: parentService.businessServiceName, link: 'admin-service-card', params: { service: parentService.businessServiceUrl } })
    }
    breadCrumbList.push({ name: serviceItem.businessServiceName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const dynaComponents = ServiceRegistry.instance.getService(DynamicComponentsService).getServiceDynamicComponentsInfo(siteSection.siteSectionUrl, serviceItem.businessServiceUrl, true)

    const serviceRelationListPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetServiceRelation(serviceItem.businessServiceId)
    const adminGetRelatedPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetRelated(serviceItem.businessServiceId)

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
    ServiceRegistry.instance.getService(BusinessServiceService).save(this.serviceItem)

    ServiceRegistry.instance.getService(BusinessServiceService).saveAll(this.serviceOtherList)

    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }


  private async saveDynamicComponentsInfo () {
    await ServiceRegistry.instance.getService(DynamicComponentsService).saveServiceDynamicComponentsInfo(this.serviceItem.businessServiceId, this.dynamicComponentInfo)
    await this.refreshDynamicComponentsInfo()
  }

  private async refreshDynamicComponentsInfo () {
    this.dynamicComponentInfo = await ServiceRegistry.instance.getService(DynamicComponentsService).getServiceDynamicComponentsInfo(this.serviceItem.siteSectionUrl, this.serviceItem.businessServiceUrl, true)
  }

  private brandChecked (clBrandId: number, hasRelation: boolean) {
    ServiceRegistry.instance.getService(PublicEkosetService).addOrRemoveBrand2Service(clBrandId, this.serviceItem.businessServiceId, hasRelation)
  }

  private clientTypeChecked (clClientId: number, hasRelation: boolean) {
    if (clClientId === 1) {
      ServiceRegistry.instance.getService(BusinessServiceService).addRemoveBusinessType2Service(this.serviceItem.businessServiceUrl, hasRelation)
    } else {
      ServiceRegistry.instance.getService(BusinessServiceService).addRemovePrivatePerson2Service(this.serviceItem.businessServiceUrl, hasRelation)
    }

  }

  private async addServiceImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    ServiceRegistry.instance.getService(MediaService).saveServiceImage(this.serviceItem.businessServiceId, formData, isBig)
  }


  private activityChecked (clActivityId: number, hasRelation: boolean) {
    ServiceRegistry.instance.getService(BusinessServiceService).addRemoveActivityType2Service(this.serviceItem.businessServiceUrl, clActivityId, hasRelation)
  }

  private async refreshServiceList () {
    this.serviceOtherList = await ServiceRegistry.instance.getService(BusinessServiceService).adminGetChildServicesByParentId(this.serviceItem.businessServiceId)
  }

  private async relatedServiceSelected (serviceId: number, selected: boolean) {
    await ServiceRegistry.instance.getService(BusinessServiceService).adminAddRemoveRelated(this.serviceItem.businessServiceId, serviceId, 0, selected)
    this.refreshRelatedService()
  }

  private relatedServicePriorityChanged (relatedServiceList: any[]) {
    relatedServiceList.map((iter) => {
      ServiceRegistry.instance.getService(BusinessServiceService).adminAddRemoveRelated(this.serviceItem.businessServiceId, iter.businessServiceId, iter.businessServicePriority, true)
    })
  }

  private async refreshRelatedService () {
    // const serviceRelationListPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetServiceRelation(this.serviceItem.businessServiceId)
    const adminGetRelatedPr = ServiceRegistry.instance.getService(BusinessServiceService).adminGetRelated(this.serviceItem.businessServiceId)
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



