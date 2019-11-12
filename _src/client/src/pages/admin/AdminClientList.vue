<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Клиенты</h2>
          <span v-show="!createNewMode" class="brc-admin-card__help" style="margin-left:auto;">
            <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
          </span>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="newPartner.partnerName"
              ></b-input>
            </b-field>

            <b-field label="Группа:" horizontal>
              <AdminPartnerGroupSelector v-model="newPartner.partnerGroupId"></AdminPartnerGroupSelector>
            </b-field>

            <b-button @click="save" type="is-primary">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>

          <b-button
            type="is-primary"
            outlined
            class="brc-card-button__client-create"
            @click="createNewMode = true"
            v-show="!createNewMode"
          >Создать</b-button>
          <b-button
            type="is-primary"
            @click="saveAll"
            v-show="!createNewMode"
            class="brc-card-button__client-save"
          >Сохранить</b-button>
        </div>
      </template>

      <template #content>
        <div class="brc_admin-client-list">
          <div class="brc_admin-client-list-item">
            <span>Наименование</span>
            <span>Группа</span>
            <span>Статус</span>
          </div>

          <draggable v-model="itemList">
            <div
              class="brc_admin-client-list-item"
              v-for="iterItem in itemList"
              :key="iterItem.partnerId"
            >
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="iterItem.partnerName"
              ></b-input>

              <AdminPartnerGroupSelector v-model="iterItem.partnerGroupId"></AdminPartnerGroupSelector>
              <!-- <b-switch
                v-model="iterItem."
                true-value="1"
                false-value="0"
                type="is-success"
                size="is-small"
                style="justify-content: flex-end;"
              ></b-switch>-->
              <span>ff</span>
            </div>
          </draggable>
        </div>
      </template>
    </BaseCard>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import Partner from '@/models/ekoset/Partner'
import AdminPartnerGroupSelector from '@/components/admin/AdminPartnerGroupSelector.vue'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'


@Component({
  components: {
    AdminPartnerGroupSelector,
    BaseCard
  }
})
export default class AdminClientList extends Vue {
  private itemList: Partner[] = []
  private createNewMode = false
  private newPartner: Partner = new Partner()
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const itemList = getServiceContainer().publicEkosetService.getPartners()

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Клиенты', link: 'admin-clients' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await Promise.all([itemList])
    return {
      itemList: data[0]
    }
  }

  private async updateItems () {
    this.itemList = await getServiceContainer().publicEkosetService.getPartners()
  }

  private async save () {
    await getServiceContainer().publicEkosetService.savePartner(this.newPartner)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newPartner = new Partner()
    this.createNewMode = false
    this.updateItems()
  }

  private async saveAll () {
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].partnerPriority = this.itemList.length - i;
      await getServiceContainer().publicEkosetService.savePartner(this.itemList[i])
    }
  }

  private cancel () {
    this.newPartner = new Partner()
    this.createNewMode = false
  }


}
</script>



<style lang="scss">
@import '@/styles/variables.scss';
.brc-card-button__client-create {
  margin-left: auto;
}

.brc-card-button__client-save {
  margin-left: 20px;
}

.brc_admin-client-list-item {
  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr 450px 80px;
  grid-column-gap: 20px;
  justify-content: flex-end;

  // padding: 5px;
  padding-left: 10px;
  // border: 1px solid lightgrey;
  // border-radius: 2px;
  line-height: 2em;

  * {
    margin-bottom: 0px !important;
    font-weight: $font-regular !important;
    font-size: 15px !important;
  }

  cursor: move;
}
</style>  

