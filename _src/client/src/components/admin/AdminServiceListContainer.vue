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
        <span>Наименование услуги</span>
        <span>Ед.измерения</span>
        <span>Цена, руб.</span>
        <span>Статус</span>
      </div>

      <draggable v-model="serviceList" @change="handleChange">
        <div
          class="brc_admin-service-list-item"
          v-for="iterService in serviceList"
          :key="iterService.businessServiceId"
        >
          <nuxt-link
            :to="{ name: 'admin-service-card', params: { siteSection: siteSection.siteSectionUrl, service: iterService.businessServiceUrl}}"
          >{{iterService.businessServiceName}}</nuxt-link>

          <b-input placeholder="Единица измерения" v-model="iterService.businessServiceUnit"></b-input>

          <b-input
            placeholder="Цена, руб."
            type="number"
            v-model.number="iterService.businessServicePrice"
          ></b-input>

          <b-switch
            v-model="iterService.businessServiceStatus"
            true-value="1"
            false-value="0"
            type="is-success"
            size="is-small"
            style="justify-content: flex-end;"
          ></b-switch>
        </div>
      </draggable>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType';

@Component({
  components: {

  }
})
export default class AdminServiceListContainer extends Vue {
  @Prop()
  private siteSection

  @Prop()
  private parentServiceId

  @Prop()
  private value

  private serviceList: BusinessService[] = this.value
  private createNewServiceMode = false
  private newService: BusinessService = new BusinessService()

  @Watch('value', { immediate: true })
  private async updateServiceList () {
    this.serviceList = this.value
  }

  private handleChange () {
    for (let i = 0; i < this.serviceList.length; i++) {
      this.serviceList[i].businessServicePriority = this.serviceList.length - i;
    }
    this.$emit('input', this.serviceList)
  }

  private async saveNewService () {
    this.newService.siteSectionId = this.siteSection.siteSectionId
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

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-service-list-container {
  display: flex;
  flex-direction: column;

  // .brc_admin-service-list {
  //   display: grid;
  //   grid-template-columns: 1fr 100px 100 px 100px;
  // }

  .brc_admin-service-list-item {
    margin-top: 10px;

    display: grid;
    grid-template-columns: 1fr 200px 200px 50px;
    grid-column-gap: 15px;
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