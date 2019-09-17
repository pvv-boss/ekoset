<template>
  <div class="brc-admin-card_wrapper">
    <h1>Услуга: {{serviceItem.businessServiceName}}</h1>
    <div class="brc-admin-card" v-if="serviceItem.businessServiceId > 0">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="serviceItem.businessServiceName" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Префикс</div>
          <input type="text" v-model="serviceItem.businessServiceSlug" disabled />
        </div>
        <div class="brc-admin-card-attribute" v-if="siteSectionList.length > 0">
          <div class="brc-admin-card-attribute__caption">Раздел сайта</div>
          <select class="form-control" v-model="serviceItem.siteSectionId">
            <option
              v-for="siteSection in siteSectionList"
              :key="siteSection.siteSectionId"
              :value="siteSection.siteSectionId"
            >{{siteSection.siteSectionName}}</option>
          </select>
        </div>
        <div
          class="brc-admin-card-attribute"
          v-if="serviceItem.businessServiceParentId > 0 && serviceOtherList.length > 0"
        >
          <div class="brc-admin-card-attribute__caption">Головная услуга</div>
          <select class="form-control" v-model="serviceItem.businessServiceParentId">
            <option
              v-for="service in serviceOtherList.filter(obj => obj.businessServiceParentId == null)"
              :key="service.businessServiceId"
              :value="service.businessServiceId"
            >{{service.businessServiceName}}</option>
          </select>
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
          <input type="number" v-model.number="serviceItem.businessServiceStatus" />
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
          <AdminArticleEditor v-model="serviceItem.businessServiceFreeText1"></AdminArticleEditor>
          <div class="brc-service-attribute__caption">Текстовый блок 2</div>
          <AdminArticleEditor v-model="serviceItem.businessServiceFreeText2"></AdminArticleEditor>
        </div>
        <div class="brc-admin-card__save">
          <button type="button" @click="saveService">Сохранить</button>
          <button type="button" @click="deleteService">Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations">
        <div v-if="serviceItem.businessServiceParentId == null && serviceOtherList.length > 0">
          <h4>Услуги второго уровня</h4>
          <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
        </div>
        <div>
          <h4>Рекомендации</h4>
          <AdminBrandRelationList :brandRelationItems="brandRelationList"></AdminBrandRelationList>
        </div>
        <div>
          <h4>Связанные новости</h4>
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
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import SiteSection from '@/models/ekoset/SiteSection'

@Component({
  components: {
    AdminArticleEditor,
    AdminBrandRelationList,
    AdminFileUploader,
    AdminServiceChildList
  }})
export default class AdminServiceCard extends Vue {
  private serviceItem: BusinessService = new BusinessService()
  private serviceOtherList: BusinessService = new BusinessService()
  private serviceSlug = ''
  private brandRelationList: ClBrand[] = []
  private siteSectionList: SiteSection[] = []
  private layout () {
    return 'admin'
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private async mounted () {
    if (this.serviceSlug !== '') {
      this.serviceItem = await getServiceContainer().businessServiceService.getBySlug(this.serviceSlug)
      const brandRelationList = getServiceContainer().publicEkosetService.getBrandsByBusinessServiceSlug(this.serviceSlug)
      const siteSectionList = getServiceContainer().publicEkosetService.getSiteSections()
      const serviceOtherList = this.serviceItem.businessServiceParentId == null ? getServiceContainer().businessServiceService.getChildServicesByParentId(this.serviceItem.businessServiceId) : getServiceContainer().businessServiceService.getMainList()

      const data = await Promise.all([brandRelationList, siteSectionList, serviceOtherList])
      if (data) {
        this.brandRelationList = data[0]
        this.siteSectionList = data[1]
        this.serviceOtherList = data[2]
      }
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

  private async asyncData (context: NuxtContext) {
    const serviceSlug = context.params.service
    return {
      serviceSlug
    }
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


