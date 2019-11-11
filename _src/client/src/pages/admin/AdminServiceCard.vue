<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Услуга: {{serviceItem.businessServiceName}}</h2>
          <AdminStatusSelector
            statusCaption="Активна"
            v-model.number="serviceItem.businessServiceStatus"
          ></AdminStatusSelector>

          <b-field label="Ед. измерения" horizontal style="margin-bottom:0px">
            <b-input placeholder="Единица измерения" v-model="serviceItem.businessServiceUnit"></b-input>
          </b-field>

          <b-field label="Цена, руб." horizontal style="margin-bottom:0px">
            <b-input
              placeholder="Цена, руб."
              type="number"
              v-model.number="serviceItem.businessServicePrice"
            ></b-input>
          </b-field>

          <b-button type="is-primary" @click="saveService">Сохранить</b-button>
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
                    validation-message="Наименование услуги не может быть пустым"
                    v-model="serviceItem.businessServiceName"
                  ></b-input>
                </b-field>

                <b-field label="Заголовок H1">
                  <b-input
                    placeholder="Заголовок H1"
                    type="text"
                    required
                    validation-message="Заголовок H1 не может быть пустым"
                    v-model="serviceItem.businessServiceH1"
                  ></b-input>
                </b-field>

                <b-field label="Фото на странице">
                  <AdminImageUploader
                    id="bigImageFile"
                    :srcImage="serviceItem.businessServiceImgBig"
                    @uploader:newimageloaded="addServiceImage($event,true)"
                  >
                    <template v-slot="{imageSrc}">
                      <figure class="brc-admin-card-image__wrapper">
                        <img class="brc-admin-image" :src="imageSrc" />
                        <h1 class="brc-admin-card-image-title">{{serviceItem.businessServiceH1}}</h1>
                      </figure>
                    </template>
                  </AdminImageUploader>
                </b-field>

                <div class="brc-admin-card-field-list_column">
                  <b-field label="Верхний левый блок-конструктор" class="col-2">
                    <AdminFreeContentBlockEditor
                      v-model="serviceItem.businessServiceFreeText1"
                      id="siteSectionFreeText1"
                    ></AdminFreeContentBlockEditor>
                  </b-field>
                  <b-field label="Верхний правый блок-конструктор" class="col-2">
                    <AdminFreeContentBlockEditor
                      v-model="serviceItem.businessServiceFreeText2"
                      id="siteSectionFreeText2"
                    ></AdminFreeContentBlockEditor>
                  </b-field>
                </div>

                <div class="brc-admin-card-field-list_column">
                  <b-field label="Нижний (футер) левый блок-конструктор" class="col-2">
                    <AdminFreeContentBlockEditor
                      v-model="serviceItem.businessServiceFooterContentLeft"
                      id="siteSectionFreeText11"
                    ></AdminFreeContentBlockEditor>
                  </b-field>
                  <b-field label="Нижний (футер) правый блок-конструктор" class="col-2">
                    <AdminFreeContentBlockEditor
                      v-model="serviceItem.businessServiceFooterContentRight"
                      id="siteSectionFreeText12"
                    ></AdminFreeContentBlockEditor>
                  </b-field>
                </div>
              </div>

              <div class="brc-admin-card-field-list_row">
                <div>
                  <b-field label="Фото на карточке услуги">
                    <AdminImageUploader
                      id="smallImageFile"
                      :srcImage="serviceItem.businessServiceImgSmall"
                      :isLeft="true"
                      @uploader:newimageloaded="addServiceImage($event,false)"
                    >
                      <template v-slot="{imageSrc}">
                        <ServiceListItem
                          :serviceItem="serviceItem"
                          :imageSrcForDesignMode="imageSrc"
                          style="width:252px;height:349px;margin:0px"
                        ></ServiceListItem>
                      </template>
                    </AdminImageUploader>
                  </b-field>
                </div>

                <b-field
                  v-if="!serviceItem.businessServiceParentId"
                  label="Настройка стандартных блоков"
                  class="brc-admin-field-list_column"
                  style="margin-top:15px;"
                >
                  <AdminDynamicComponentsContainer v-model="dynamicComponentInfo"></AdminDynamicComponentsContainer>
                </b-field>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Услуги второго уровня" v-if="!serviceItem.businessServiceParentId">
            <AdminServiceListContainer
              v-model="serviceOtherList"
              :siteSection="siteSection"
              :parentServiceId="serviceItem.businessServiceId"
              @newservice:saved="refreshServiceList"
            ></AdminServiceListContainer>
          </b-tab-item>

          <b-tab-item label="Тип клиента, объекта" v-if="!serviceItem.businessServiceParentId">
            <div class="brc-admin-card-field-list_column" style="justify-content: flex-start;">
              <b-field label="Типы клиентов" style="flex:1">
                <AdminClientTypeRelationList
                  :clientTypeRelationItems="clientTypeRelationList"
                  @clienttypechecked="clientTypeChecked"
                  :disabled="serviceItem.businessServiceParentId > 0"
                ></AdminClientTypeRelationList>
              </b-field>
              <b-field label="Направления деятельности" style="flex:1">
                <AdminActivityRelationList
                  :activityRelationItems="activityRelationList"
                  @activitychecked="activityChecked"
                  :disabled="serviceItem.businessServiceParentId > 0"
                ></AdminActivityRelationList>
              </b-field>

              <div class="brc-admin-card__help" style="display:flex; flex-direction:column; flex:1">
                <span>Тип клиента определяет будет ли данная услуга выводиться в списке услуг комплексных решений (по типу клиента) данного раздела</span>
                <span>
                  <br />Направление деятельности определяет будет ли данная услуга выводиться в списке услуг индивидуального предложения (для данного направления деятельности)
                </span>
              </div>
            </div>
          </b-tab-item>

          <b-tab-item label="Рекомендации" v-if="!serviceItem.businessServiceParentId">
            <AdminBrandRelationList
              :brandRelationItems="brandRelationList"
              @brandchecked="brandChecked"
              :disabled="serviceItem.businessServiceParentId > 0"
            ></AdminBrandRelationList>
          </b-tab-item>
        </b-tabs>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminClientTypeRelationList from '@/components/admin/AdminClientTypeRelationList.vue'
import AdminActivityRelationList from '@/components/admin/AdminActivityRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity'
import ClClient from '@/models/ekoset/ClClient'
import AdminServiceListContainer from '@/components/admin/AdminServiceListContainer.vue'
import AdminServiceSelector from '@/components/admin/AdminServiceSelector.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import ServiceListItem from '@/components/public/ServiceListItem.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import AdminDynamicComponentsContainer from '@/components/admin/AdminDynamicComponentsContainer.vue'
import SiteSection from '../../models/ekoset/SiteSection'

@Component({
  components: {
    AdminBrandRelationList,
    AdminServiceListContainer,
    BreadCrumbs,
    AdminServiceSelector,
    AdminStatusSelector,
    AdminActivityRelationList,
    AdminClientTypeRelationList,
    AdminImageUploader,
    BaseCard,
    AdminFreeContentBlockEditor,
    ServiceListItem,
    AdminDynamicComponentsContainer
  }
})
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

  private layout () {
    return 'admin'
  }

  @Watch('serviceItem.businessServiceParentId', { immediate: true })
  private async updateParentService () {
    if (!!this.serviceItem.businessServiceParentId && this.serviceItem.businessServiceParentId > 0) {
      this.brandRelationList = await getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(Number(this.serviceItem.businessServiceParentId))
      this.activityRelationList = await getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + Number(this.serviceItem.businessServiceParentId))
      this.clientTypeRelationList = await getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + Number(this.serviceItem.businessServiceParentId))
    }
  }

  private async asyncData (context: NuxtContext) {
    const serviceItem = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const siteSection = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(serviceItem.siteSectionUrl)

    const serviceIdForRelations = !!serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0 ? serviceItem.businessServiceParentId : serviceItem.businessServiceId
    const serviceOtherList = serviceItem.businessServiceParentId == null ? await getServiceContainer().businessServiceService.adminGetChildServicesByParentId(serviceItem.businessServiceId) : []
    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(serviceIdForRelations)
    const activityRelation = getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + serviceIdForRelations)
    const clientTypeRelation = getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + serviceIdForRelations)

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

    const data = await Promise.all([brandRelationList, activityRelation, clientTypeRelation, dynaComponents])
    return {
      serviceItem,
      brandRelationList: data[0],
      serviceOtherList,
      activityRelationList: data[1],
      clientTypeRelationList: data[2],
      dynamicComponentInfo: data[3],
      siteSection
    }
  }

  private saveService () {
    getServiceContainer().businessServiceService.save(this.serviceItem)

    getServiceContainer().dynamicComponentsService.saveServiceDynamicComponentsInfo(this.serviceItem.businessServiceId, this.dynamicComponentInfo)

    getServiceContainer().businessServiceService.saveAll(this.serviceOtherList)

    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteService () {
    const self = this
    const okCallback = async () => {
      await getServiceContainer().businessServiceService.delete(this.serviceItem.businessServiceId)
      self.$router.push({ name: 'admin-services' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить услугу?', 'Подтвердите удаление', okCallback)
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
    if (isBig) {
      this.serviceItem.bigImageFormData = formData
    } else {
      this.serviceItem.smallImageFormData = formData
    }
  }


  private activityChecked (clActivityId: number, hasRelation: boolean) {
    getServiceContainer().businessServiceService.addRemoveActivityType2Service(this.serviceItem.businessServiceUrl, clActivityId, hasRelation)
  }

  private async refreshServiceList () {
    this.serviceOtherList = await getServiceContainer().businessServiceService.adminGetChildServicesByParentId(this.serviceItem.businessServiceId)
  }

  private mounted () {
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
  }

}
</script>



