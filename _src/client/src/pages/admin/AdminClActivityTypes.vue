<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Виды деятельности</h2>

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
        </div>
      </template>

      <template #content>
        <div class="brc_admin-active-list">
          <div class="brc_admin-active-list-item">
            <span>Наименование</span>
            <span>Логотип Клиента</span>
            <span>Удалить</span>
          </div>
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
              @blur="saveAct(iterItem)"
            ></b-input>

            <div>
              <b-upload @input="addMainClientImage(...arguments,iterItem)">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                </a>
              </b-upload>
              <b-button
                @click="showMainClientImage(iterItem)"
                icon-right="file-find"
                type="is-success"
                size="is-medium"
                outlined
                style="margin-left:20px;"
              ></b-button>
            </div>

            <b-button type="is-danger" icon-right="delete" @click="deleteActivity(iterItem)"></b-button>
          </div>
        </div>
      </template>
    </BaseCard>

    <b-modal :active.sync="isShowMainClientImageActive" :can-cancel="true" :width="400">
      <ClientListItem
        :clientItem="previewClientItem"
        class="brc-page__dynamic_block"
        style="width:265px;margin:0px;background-color:white;"
      ></ClientListItem>
    </b-modal>
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
import ClientListItem from '@/components/public/ClientListItem.vue'

@Component({
  components: {
    BaseCard,
    ClientListItem
  }
})
export default class AdminClActivityTypes extends Vue {
  private itemList: ClActivity[] = []
  private createNewMode = false
  private newActivity: ClActivity = new ClActivity()
  private breadCrumbList: any[] = []

  private previewImageActivity = new ClActivity()
  private isShowMainClientImageActive = false
  private previewClientItem = {}

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const itemList = getServiceContainer().publicEkosetService.getClActivityList()

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Вид деятельности', link: '' })
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

  private async saveAct (activity: ClActivity) {
    await getServiceContainer().publicEkosetService.saveClActivity(activity)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveAll () {
    for (const iterActiv of this.itemList) {
      await getServiceContainer().publicEkosetService.saveClActivity(iterActiv)
    }
  }

  private async addMainClientImage (imageFile: string, activity: ClActivity) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveClActivityMainClientLogo(activity.clActivityId, formData)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async deleteActivity (activity: ClActivity) {
    const okCallback = async () => {
      await getServiceContainer().publicEkosetService.deleteClActivity(activity)
      this.updateItems()
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить вид деятельности?', 'Подтвердите удаление', okCallback)
  }

  private cancel () {
    this.newActivity = new ClActivity()
    this.createNewMode = false
  }


  private async showMainClientImage (activity: ClActivity) {
    this.previewImageActivity = activity
    this.isShowMainClientImageActive = !this.isShowMainClientImageActive

    const allClients = await getServiceContainer().publicEkosetService.getClients()
    this.previewClientItem = (allClients as any[]).find((iter) => {
      return iter.clActivityId === this.previewImageActivity.clActivityId
    })

    this.previewClientItem = !!this.previewClientItem ? this.previewClientItem : {}
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
  grid-template-columns: 1fr 160px 60px;
  //  grid-template-columns: 50px 1fr 280px 60px;
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
}
</style>  

