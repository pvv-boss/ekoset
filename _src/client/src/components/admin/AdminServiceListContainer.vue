<template>
  <div class="brc_admin-service-list-container">
    <div class="brc-card__header__toolbar">
      <span class="brc_admin-service-list-container__help">
        <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
      </span>

      <div v-if="createNewServiceMode" class="brc-admin-card-create-row">
        <b-field label="Наименование услуги:" horizontal>
          <b-input
            placeholder="Наименование"
            type="text"
            required
            validation-message="Наименование услуги не может быть пустым"
            v-model="newService.businessServiceName"
          ></b-input>
        </b-field>
        <b-button @click="saveNewService" type="is-primary">Сохранить</b-button>
        <b-button @click="cancelSaveNewService">Отмена</b-button>
      </div>

      <b-button
        type="is-primary"
        outlined
        @click="createNewServiceMode = true"
        v-show="!createNewServiceMode"
      >Создать</b-button>
    </div>

    <div class="brc_admin-service-list">
      <div class="brc_admin-service-list-item">
        <span>Статус</span>
        <span>Наименование услуги</span>
        <span>Фото на странице</span>
        <span>Фото на карточке</span>
        <span>Ед.измерения</span>
        <span>Цена, руб.</span>
        <span>Переместить</span>
        <span>Удалить</span>
      </div>

      <draggable v-model="serviceList" @change="handleChange">
        <div
          class="brc_admin-service-list-item"
          v-for="iterService in serviceList"
          :key="iterService.businessServiceId"
        >
          <b-switch
            v-model="iterService.businessServiceStatus"
            true-value="1"
            false-value="0"
            type="is-success"
            size="is-small"
            style="justify-content: flex-end;"
            @input="saveService(iterService)"
          ></b-switch>
          <nuxt-link
            :to="{ name: 'admin-service-card', params: { siteSection: siteSection.siteSectionUrl, service: iterService.businessServiceUrl}}"
          >{{iterService.businessServiceName}}</nuxt-link>

          <div>
            <b-upload @input="addServiceImage(...arguments,iterService,true)">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>

            <b-button
              @click="showBigImage(iterService)"
              v-if="!!iterService.businessServiceImgBig && iterService.businessServiceImgBig !='/img/empty-image-big.png'"
              icon-right="file-find"
              style="float:right;margin-right:70px;"
              type="is-success"
              size="is-medium"
              outlined
            ></b-button>
          </div>
          <div>
            <b-upload @input="addServiceImage(...arguments,iterService,false)">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>

            <b-button
              @click="showSmallImage(iterService)"
              v-if="!!iterService.businessServiceImgSmall && iterService.businessServiceImgSmall !='/img/empty-image.png'"
              icon-right="file-find"
              style="float:right;;margin-right:70px;"
              type="is-success"
              size="is-medium"
              outlined
            ></b-button>
          </div>

          <b-input
            placeholder="Единица измерения"
            v-model.lazy="iterService.businessServiceUnit"
            @blur="saveService(iterService)"
          ></b-input>

          <b-input
            placeholder="Цена, руб."
            v-model.lazy="iterService.businessServicePrice"
            @blur="saveService(iterService)"
          ></b-input>

          <b-button
            type="is-success"
            style="max-width:60px; margin:auto;"
            icon-right="file-move"
            @click="showMoveModal(iterService)"
          ></b-button>

          <b-button type="is-danger" icon-right="delete" @click="deleteService(iterService)"></b-button>
        </div>
      </draggable>
    </div>

    <b-modal :active.sync="isShowSmallImageActive" :can-cancel="true" :width="300">
      <ServiceListItem
        :serviceItem="previewSmallService"
        style="width:252px;height:349px;margin:0px;background-color:white;"
      ></ServiceListItem>
    </b-modal>

    <b-modal :active.sync="isShowBigImageActive" :can-cancel="true">
      <figure class="brc-admin-card-image__wrapper" style="background-color:white;">
        <img class="brc-admin-image" :src="previewBigService.businessServiceImgBig" />
        <h1 class="brc-admin-card-image-title">{{previewBigService.businessServiceH1}}</h1>
      </figure>
    </b-modal>

    <b-modal :active.sync="isMoveServiceModalActive" :width="500">
      <div style="background-color:white; height:100%; opacity:1; padding:15px;">
        <b-switch
          type="is-success"
          style="justify-content: flex-end;"
          v-model="moveServiceAsRoot"
          v-if="movedService.businessServiceParentId != null"
        >Переместить услугу в корень раздела</b-switch>

        <b-field
          label="Выберите Услугу 1-го уровня для перемещения"
          v-if="moveServiceAsRoot===false"
          style="margin-top:50px;"
        >
          <AdminServiceSelector
            :siteSectionId="siteSection.siteSectionId"
            :value="parentServiceId"
            @input="(val)=>parentServiceIdForMove=val"
          ></AdminServiceSelector>
        </b-field>
        <b-button
          class="button"
          type="button"
          @click="moveService()"
          style="float:right;margin-top:120px;margin-bottom:15px;margin-right:15px;"
        >Переместить и закрыть</b-button>
      </div>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType';
import ServiceListItem from '@/components/public/ServiceListItem.vue'
import AdminServiceSelector from '@/components/admin/AdminServiceSelector.vue'



@Component({
  components: {
    ServiceListItem,
    AdminServiceSelector
  }
})
export default class AdminServiceListContainer extends Vue {
  @Prop()
  private siteSection

  @Prop()
  private parentServiceId

  @Prop()
  private value

  private serviceList: BusinessService[] = []
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()

  private previewSmallService: BusinessService = new BusinessService()
  private isShowSmallImageActive = false
  private previewBigService: BusinessService = new BusinessService()
  private isShowBigImageActive = false

  private isMoveServiceModalActive = false
  private movedService: BusinessService = new BusinessService()
  private parentServiceIdForMove = 0
  private moveServiceAsRoot = false

  @Watch('value', { immediate: true })
  private async updateServiceList () {
    this.serviceList = this.value
  }

  private showSmallImage (service: BusinessService) {
    this.previewSmallService = service
    this.isShowSmallImageActive = !this.isShowSmallImageActive
  }

  private showBigImage (service: BusinessService) {
    this.previewBigService = service
    this.isShowBigImageActive = !this.isShowBigImageActive
  }

  private handleChange () {
    for (let i = 0; i < this.serviceList.length; i++) {
      this.serviceList[i].businessServicePriority = this.serviceList.length - i;
      this.saveService(this.serviceList[i])
    }
    this.$emit('input', this.serviceList)
  }

  private async saveNewService () {
    this.newService.siteSectionId = this.siteSection.siteSectionId
    this.newService.businessServiceH1 = this.newService.businessServiceName
    if (!!this.parentServiceId) {
      this.newService.businessServiceParentId = this.parentServiceId
    }
    const saved = await getServiceContainer().businessServiceService.save(this.newService)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newService = new BusinessService()
    this.createNewServiceMode = false
    this.$emit('newservice:saved', saved)
  }

  private cancelSaveNewService () {
    this.newService = new BusinessService()
    this.createNewServiceMode = false
  }

  private async addServiceImage (imageFile: string, serviceItem: BusinessService, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveServiceImage(serviceItem.businessServiceId, formData, isBig)
  }

  private async saveService (serviceItem: BusinessService) {
    const saved = await getServiceContainer().businessServiceService.save(serviceItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async deleteService (service: BusinessService) {
    const okCallback = async () => {
      await getServiceContainer().businessServiceService.delete(service.businessServiceId)
      this.$emit('service:deleted')
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить услугу?', 'Подтвердите удаление', okCallback)
  }

  private showMoveModal (serviceItem: BusinessService) {
    this.isMoveServiceModalActive = !this.isMoveServiceModalActive
    this.movedService = serviceItem
  }


  private async moveService () {
    if (!!this.movedService && !!this.parentServiceIdForMove && this.parentServiceIdForMove > 0) {
      this.movedService.businessServiceParentId = this.parentServiceIdForMove
      await getServiceContainer().businessServiceService.save(this.movedService)
      this.$BrcNotification(BrcDialogType.Success, `Выполнено перемещение в Услугу 1-го уровня`)
      this.$emit('service:moved')
    }

    if (!!this.movedService && this.moveServiceAsRoot === true) {
      this.movedService.businessServiceParentId = null
      await getServiceContainer().businessServiceService.save(this.movedService)
      this.$BrcNotification(BrcDialogType.Success, `Выполнено перемещение в корень раздела`)
      this.$emit('service:moved')
    }

    this.movedService = new BusinessService()
    this.parentServiceIdForMove = 0
    this.isMoveServiceModalActive = false
    this.moveServiceAsRoot = false
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-service-list-container {
  display: flex;
  flex-direction: column;

  .brc_admin-service-list-item {
    margin-top: 10px;

    display: grid;
    grid-template-columns: 50px 1fr 180px 180px 200px 180px 100px 70px;
    grid-column-gap: 20px;
    justify-content: flex-end;

    padding: 5px;
    padding-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    line-height: 2em;

    * {
      margin-bottom: 0px !important;
      font-weight: $font-regular !important;
      font-size: 15px !important;
    }

    &.brc_this_is_root_service {
      grid-template-columns: 50px 1fr 180px 180px 200px 180px 70px;
    }

    cursor: move;
  }

  .brc_admin-service-list-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  