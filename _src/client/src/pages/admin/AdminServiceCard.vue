<template>
  <div class="brc-admin_page_wrapper">
    <h1>Услуга: {{serviceItem.businessServiceName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" required v-model="serviceItem.businessServiceName" />
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Заголовок H1</div>
          <input type="text" required v-model="serviceItem.businessServiceH1" />
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
          <AdminSiteSectionSelector
            v-model="serviceItem.siteSectionId"
            :disabled="serviceItem.businessServiceParentId > 0"
          ></AdminSiteSectionSelector>
        </div>
        <div class="brc-admin-card-attribute" v-if="serviceItem.businessServiceParentId > 0">
          <div class="brc-admin-card-attribute__caption">Головная услуга</div>
          <AdminServiceSelector
            v-model="serviceItem.businessServiceParentId"
            :siteSectionId="serviceItem.siteSectionId"
          ></AdminServiceSelector>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Единица измерения</div>
          <input type="text" v-model="serviceItem.businessServiceUnit" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Цена</div>
          <input type="number" required v-model.number="serviceItem.businessServicePrice" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" required v-model.number="serviceItem.businessServicePriority" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Статус</div>
          <AdminStatusSelector v-model.number="serviceItem.businessServiceStatus"></AdminStatusSelector>
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Фото на странице</div>
          <AdminImageUploader id="bigServImageFile" @upload="saveServiceImage($event,true)"></AdminImageUploader>
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Фото в карточке услуги</div>
          <AdminImageUploader id="smallServImageFile" @upload="saveServiceImage($event,false)"></AdminImageUploader>
        </div>

        <div class="brc-admin-card__editor">
          <div class="brc-service-attribute__caption">Текстовый блок 1</div>
          <AdminTextBlockEditor v-model="serviceItem.businessServiceFreeText1"></AdminTextBlockEditor>
          <div class="brc-service-attribute__caption">Текстовый блок 2</div>
          <AdminTextBlockEditor v-model="serviceItem.businessServiceFreeText2"></AdminTextBlockEditor>
        </div>
        <div class="brc-admin-card__save">
          <button type="button" @click="saveService">Сохранить</button>
          <button type="button" @click="deleteService">Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations">
        <div v-if="serviceItem.businessServiceParentId == null">
          <h4>Услуги второго уровня</h4>
          <button
            @click="createNewServiceMode = true"
            v-show="!createNewServiceMode"
          >Создать услугу второго уровня</button>

          <div v-if="createNewServiceMode">
            <div class="brc-service-attribute">
              <div class="brc-service-attribute__caption">Наименование</div>
              <input type="text" v-model="newService.businessServiceName" />
            </div>
            <div class="brc-service-attribute">
              <div class="brc-service-attribute__caption">Приоритет</div>
              <input type="number" v-model.number="newService.businessServicePriority" />
            </div>
            <div class="brc-service-attribute">
              <div class="brc-service-attribute__caption">Статус</div>
              <AdminStatusSelector v-model.number="newService.businessServiceStatus"></AdminStatusSelector>
            </div>
            <button @click="saveNewService">Сохранить</button>
            <button @click="cancelSaveNewService">Отменить</button>
          </div>
          <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
        </div>
        <div>
          <h4>Типы клиентов</h4>
          <AdminClientTypeRelationList
            :clientTypeRelationItems="clientTypeRelationList"
            @clienttypechecked="clientTypeChecked"
            :disabled="serviceItem.businessServiceParentId > 0"
          ></AdminClientTypeRelationList>
          <h4>Направления деятельности</h4>
          <AdminActivityRelationList
            :activityRelationItems="activityRelationList"
            @activitychecked="activityChecked"
            :disabled="serviceItem.businessServiceParentId > 0"
          ></AdminActivityRelationList>
          <h4>Рекомендации</h4>
          <AdminBrandRelationList
            :brandRelationItems="brandRelationList"
            @brandchecked="brandChecked"
            :disabled="serviceItem.businessServiceParentId > 0"
          ></AdminBrandRelationList>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminTextBlockEditor from '@/components/admin/AdminTextBlockEditor.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminClientTypeRelationList from '@/components/admin/AdminClientTypeRelationList.vue'
import AdminActivityRelationList from '@/components/admin/AdminActivityRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity'
import ClClient from '@/models/ekoset/ClClient'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminServiceSelector from '@/components/admin/AdminServiceSelector.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'



@Component({
  components: {
    AdminTextBlockEditor,
    AdminBrandRelationList,
    AdminServiceChildList,
    BreadCrumbs,
    AdminSiteSectionSelector,
    AdminServiceSelector,
    AdminStatusSelector,
    AdminActivityRelationList,
    AdminClientTypeRelationList,
    AdminImageUploader
  }
})
export default class AdminServiceCard extends Vue {
  private serviceItem: BusinessService = new BusinessService()
  private serviceOtherList: BusinessService[] = []
  private brandRelationList: ClBrand[] = []
  private activityRelationList: ClActivity[] = []
  private clientTypeRelationList: any[] = [1, 2, 3]
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()
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
    const serviceOtherList = serviceItem.businessServiceParentId == null ? await getServiceContainer().businessServiceService.adminGetChildServicesByParentId(serviceItem.businessServiceId) : await getServiceContainer().businessServiceService.getMainList()
    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(serviceIdForRelations)
    const activityRelation = getServiceContainer().businessServiceService.getAdminСlActivitiesForService('slug-' + serviceIdForRelations)
    const clientTypeRelation = getServiceContainer().businessServiceService.getAdminclClientsForService('slug-' + serviceIdForRelations)

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: siteSection.siteSectionName, link: 'admin-site-section-card', params: { siteSection: siteSection.siteSectionUrl } })
    breadCrumbList.push({ name: 'Услуги', link: 'admin-services' })
    if (serviceItem.businessServiceParentId && serviceItem.businessServiceParentId > 0) {
      const parentService = (serviceOtherList as BusinessService[]).filter((obj) => {
        return obj.businessServiceId === serviceItem.businessServiceParentId;
      })[0]
      breadCrumbList.push({ name: parentService.businessServiceName, link: 'admin-service-card', params: { service: parentService.businessServiceUrl } })
    }
    breadCrumbList.push({ name: serviceItem.businessServiceName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)


    const data = await Promise.all([brandRelationList, activityRelation, clientTypeRelation])
    return {
      serviceItem,
      brandRelationList: data[0],
      serviceOtherList,
      activityRelationList: data[1],
      clientTypeRelationList: data[2]
    }
  }

  private saveService () {
    getServiceContainer().businessServiceService.save(this.serviceItem)
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

  private async saveServiceImage (imageFile: string, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveServiceImage(this.serviceItem.businessServiceId, formData, isBig)
  }


  private activityChecked (clActivityId: number, hasRelation: boolean) {
    getServiceContainer().businessServiceService.addRemoveActivityType2Service(this.serviceItem.businessServiceUrl, clActivityId, hasRelation)
  }

  private async updateServiceOtherList () {
    this.serviceOtherList = await getServiceContainer().businessServiceService.getChildServicesByParentId(this.serviceItem.businessServiceId)
  }

  private mounted () {
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
  }

  private async saveNewService () {
    await getServiceContainer().businessServiceService.save(this.newService)
    this.updateServiceOtherList()
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newService = new BusinessService()
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
    this.createNewServiceMode = false
  }

  private cancelSaveNewService () {
    this.newService = new BusinessService()
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
    this.createNewServiceMode = false
  }

}
</script>



