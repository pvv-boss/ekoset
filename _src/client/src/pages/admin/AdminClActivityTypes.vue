<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Направления деятельности</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="newActivity.clActivityName"
              ></b-input>
            </b-field>

            <b-button @click="save" type="is-primary">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>

          <b-button
            type="is-primary"
            outlined
            class="brc-card-button__active-create"
            @click="createNewMode = true"
            v-show="!createNewMode"
          >Создать</b-button>
          <b-button
            type="is-primary"
            @click="saveAll"
            v-show="!createNewMode"
            class="brc-card-button__active-save"
          >Сохранить</b-button>
        </div>
      </template>

      <template #content>
        <div class="brc_admin-active-list">
          <div
            class="brc_admin-active-list-item"
            v-for="iterItem in itemList"
            :key="iterItem.clActivityId"
          >
            <b-input
              placeholder="Наименование"
              type="text"
              required
              validation-message="Наименование не может быть пустым"
              v-model="iterItem.clActivityName"
            ></b-input>
          </div>
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
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'
import ClActivity from '@/models/ekoset/ClActivity'


@Component({
  components: {
    BaseCard
  }
})
export default class AdminClActivityTypes extends Vue {
  private itemList: ClActivity[] = []
  private createNewMode = false
  private newActivity: ClActivity = new ClActivity()
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const itemList = getServiceContainer().publicEkosetService.getClActivityList()

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Направления деятельности', link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await Promise.all([itemList])
    return {
      itemList: data[0]
    }
  }

  private async updateItems () {
    this.itemList = await getServiceContainer().publicEkosetService.getClActivityList()
  }

  private async save () {
    await getServiceContainer().publicEkosetService.saveClActivity(this.newActivity)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newActivity = new ClActivity()
    this.createNewMode = false
    this.updateItems()
  }

  private async saveAll () {
    for (let i = 0; i < this.itemList.length; i++) {
      await getServiceContainer().publicEkosetService.saveClActivity(this.itemList[i])
    }
  }

  private cancel () {
    this.newActivity = new ClActivity()
    this.createNewMode = false
  }


}
</script>



<style lang="scss">
@import '@/styles/variables.scss';
.brc-card-button__active-create {
  margin-left: auto;
}

.brc-card-button__active-save {
  margin-left: 20px;
}

.brc_admin-active-list-item {
  margin-top: 10px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  justify-content: flex-end;

  padding: 5px;
  padding-left: 10px;
  // border: 1px solid lightgrey;
  // border-radius: 2px;
  line-height: 2em;

  * {
    margin-bottom: 0px !important;
    font-weight: $font-regular !important;
    font-size: 15px !important;
  }
}
</style>  

