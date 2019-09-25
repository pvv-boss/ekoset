<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Услуга: {{serviceItem.businessServiceName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="serviceItem.businessServiceName" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Префикс</div>
          <input type="text" v-model="serviceItem.businessServiceSlug" disabled />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
          <AdminSiteSectionSelector v-model="serviceItem.siteSectionId"></AdminSiteSectionSelector>
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
          <input type="number" v-model.number="serviceItem.businessServiceUnit" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Цена</div>
          <input type="number" v-model.number="serviceItem.businessServicePrice" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" v-model.number="serviceItem.businessServicePriority" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Статус</div>
          <AdminStatusSelector v-model="serviceItem.businessServiceStatus"></AdminStatusSelector>
        </div>

        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Превью изображение</div>
          <AdminFileUploader v-model="serviceItem.businessServiceImgSmall"></AdminFileUploader>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Основное изображение</div>
          <AdminFileUploader v-model="serviceItem.businessServiceImgBig"></AdminFileUploader>
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
              <input type="number" v-model.number="newService.businessServiceStatus" />
            </div>
            <button @click="saveNewService">Сохранить</button>
            <button @click="cancelSaveNewService">Отменить</button>
          </div>
          <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
        </div>
        <div>
          <h4>Типы клиентов</h4>
          <!-- <div>{{clientTypeRelationList}}</div> -->
          <!-- <AdminClientTypeRelationList
            :clientTypeRelationItems="clientTypeRelationList"
            @brandchecked="brandChecked"
          ></AdminClientTypeRelationList>-->
          <h4>Направления деятельности</h4>
          <!-- <div>{{activityRelationList}}</div> -->
          <AdminActivityRelationList :activityRelationItems="activityRelationList"></AdminActivityRelationList>
          <h4>Рекомендации</h4>
          <div>{{brandRelationList}}</div>
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
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminTextBlockEditor from '@/components/admin/AdminTextBlockEditor.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminActivityRelationList from '@/components/admin/AdminActivityRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import ClActivity from '@/models/ekoset/ClActivity'
import ClClient from '@/models/ekoset/ClClient'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminServiceSelector from '@/components/admin/AdminServiceSelector.vue'
import SiteSection from '@/models/ekoset/SiteSection'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'


@Component({
  components: {
    AdminTextBlockEditor,
    AdminBrandRelationList,
    AdminFileUploader,
    AdminServiceChildList,
    BreadCrumbs,
    AdminSiteSectionSelector,
    AdminServiceSelector,
    AdminStatusSelector,
    AdminActivityRelationList
  }
})
export default class AdminServiceCard extends Vue {
  private serviceItem: BusinessService = new BusinessService()
  private serviceOtherList: BusinessService = new BusinessService()
  private brandRelationList: ClBrand[] = []
  private activityRelationList: ClActivity[] = []
  private clientTypeRelationList: ClClient[] = []
  private breadCrumbList: any[] = []
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()
  private layout () {
    return 'admin'
  }


  private async asyncData (context: NuxtContext) {
    const serviceItem = await getServiceContainer().businessServiceService.getBySlug(context.params.service)
    const brandRelationList = getServiceContainer().publicEkosetService.getAdminForBusinessServiceBrands(serviceItem.businessServiceId)
    const serviceOtherList = serviceItem.businessServiceParentId == null ? getServiceContainer().businessServiceService.getChildServicesByParentId(serviceItem.businessServiceId) : getServiceContainer().businessServiceService.getMainList()
    const activityRelationList = getServiceContainer().businessServiceService.getAdminСlActivitiesForService(serviceItem.businessServiceUrl)
    const clientTypeRelationList = getServiceContainer().businessServiceService.getAdminclClientsForService(serviceItem.businessServiceUrl)

    const data = await Promise.all([brandRelationList, serviceOtherList, activityRelationList, clientTypeRelationList])
    return {
      serviceItem,
      brandRelationList: data[0],
      serviceOtherList: data[1],
      activityRelationList: data[2],
      clientTypeRelationList: data[3]
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

  private async updateServiceOtherList () {
    this.serviceOtherList = await getServiceContainer().businessServiceService.getChildServicesByParentId(this.serviceItem.businessServiceId)
  }

  private mounted () {
    this.configBreadCrumbs()
    this.newService.siteSectionId = this.serviceItem.siteSectionId
    this.newService.businessServiceParentId = this.serviceItem.businessServiceId
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Услуги', link: 'admin-services' })
    this.breadCrumbList.push({ name: this.serviceItem.businessServiceName, link: '' })
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

<style lang="scss">
.brc-admin-card_wrapper {
  width: 100%;
}
.brc-admin-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  flex: 2;
  .brc-admin-card__attributes {
    flex: 1;

    input,
    select {
      width: 100%;
    }
    .ql-container {
      height: 300px !important;
    }
  }
  .brc-admin-card__relations {
    flex: 1;
  }
}
</style>


