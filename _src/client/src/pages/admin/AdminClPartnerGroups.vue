<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Группы клиентов</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="newPartnerGroup.partnerGroupName"
              ></b-input>
            </b-field>
            <b-button @click="save" type="is-primary">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>

          <b-button
            type="is-primary"
            outlined
            class="brc-card-button__partner-create"
            @click="createNewMode = true"
            v-show="!createNewMode"
          >Создать</b-button>
          <b-button
            type="is-primary"
            @click="saveAll"
            v-show="!createNewMode"
            class="brc-card-button__partner-save"
          >Сохранить</b-button>
        </div>
      </template>

      <template #content>
        <div class="brc_admin-partner-list">
          <!-- <div class="brc_admin-partner-list-item">
            <h3>Наименование</h3>
          </div>-->

          <draggable v-model="itemList">
            <div
              class="brc_admin-partner-list-item"
              v-for="iterItem in itemList"
              :key="iterItem.partnerGroupId"
            >
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="iterItem.partnerGroupName"
              ></b-input>
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
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import PartnerGroup from '@/models/ekoset/PartnerGroup'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector,
    BaseCard
  }
})
export default class AdminClPartnerGroups extends Vue {
  private itemList: PartnerGroup[] = []
  private createNewMode = false
  private newPartnerGroup: PartnerGroup = new PartnerGroup()

  private layout () {
    return 'admin'
  }

  private async saveAll () {
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].partnerGroupPriority = this.itemList.length - i;
      await getServiceContainer().publicEkosetService.savePartnerGroup(this.itemList[i])
    }
  }

  private cancel () {
    this.newPartnerGroup = new PartnerGroup()
    this.createNewMode = false
  }

  private async save () {
    await getServiceContainer().publicEkosetService.savePartnerGroup(this.newPartnerGroup)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)

    this.newPartnerGroup = new PartnerGroup()
    this.createNewMode = false

    this.updateItems()
  }

  private async updateItems () {
    this.itemList = await getServiceContainer().publicEkosetService.getPartnerGroups()
  }

  private async asyncData (context: NuxtContext) {
    const itemList = await getServiceContainer().publicEkosetService.getPartnerGroups()

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Группы клиентов', link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    return {
      itemList
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
.brc-card-button__partner-create {
  margin-left: auto;
}

.brc-card-button__partner-save {
  margin-left: 20px;
}

.brc_admin-partner-list-item {
  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr;
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