<template>
  <div class="brc_admin-service-list-container">
    <div class="brc-card__header__toolbar">
      <span class="brc_admin-service-list-container__help">
        <i>(Для измнения порядка следования перетащите блок)</i>
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

    <draggable v-model="serviceList" @change="handleChange">
      <div v-for="iterService in serviceList" :key="iterService.businessServiceId">
        <AdminServiceListItem
          :siteSectionUrl="siteSection.siteSectionUrl"
          :businessService="iterService"
        ></AdminServiceListItem>
      </div>
    </draggable>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService';
import AdminServiceListItem from '@/components/admin/AdminServiceListItem.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType';

@Component({
  components: {
    AdminServiceListItem
  }
})
export default class AdminServiceListContainer extends Vue {
  @Prop()
  private siteSection

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
  // border-top: 1px solid #ccc;

  .brc_admin-service-list-item {
    margin-top: 10px;
  }

  .brc_admin-service-list-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  