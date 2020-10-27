<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Виды деятельности</h2>

          <div v-if="createNewMode" class="brc-admin-card-create-row">
            <b-field label="Наименование:" horizontal>
              <b-input
                v-model="newActivity.clActivityName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
              ></b-input>
            </b-field>

            <b-button type="is-primary" @click="save">Сохранить</b-button>
            <b-button @click="cancel">Отмена</b-button>
          </div>
          <b-button
            v-show="!createNewMode"
            type="is-primary"
            outlined
            class="brc-card-button__active-create"
            @click="createNewMode = true"
            >Создать</b-button
          >
        </div>
      </template>

      <template #content>
        <div class="brc_admin-active-list">
          <div class="brc_admin-active-list-item">
            <span>Наименование</span>
            <span>Главный логотип</span>
            <span>Удалить</span>
          </div>
          <div
            v-for="iterItem in itemList"
            :key="iterItem.clActivityId"
            class="brc_admin-active-list-item"
          >
            <b-input
              v-model="iterItem.clActivityName"
              placeholder="Наименование"
              type="text"
              required
              validation-message="Наименование не может быть пустым"
              @blur="saveAct(iterItem)"
            ></b-input>

            <div>
              <b-upload @input="addMainClientImage(...arguments, iterItem)">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                </a>
              </b-upload>
              <b-button
                v-if="
                  !!iterItem.clActivityMainClientImg &&
                  iterItem.clActivityMainClientImg != '/img/empty-image.png'
                "
                icon-right="file-find"
                type="is-success"
                size="is-medium"
                outlined
                style="margin-left: 20px"
                @click="showMainClientImage(iterItem)"
              ></b-button>
            </div>

            <b-button
              type="is-danger"
              icon-right="delete"
              @click="deleteActivity(iterItem)"
            ></b-button>
          </div>
        </div>
      </template>
    </BaseCard>

    <b-modal
      :active.sync="isShowMainClientImageActive"
      :can-cancel="true"
      :width="400"
    >
      <ClientListItem
        :client-item="previewClientItem"
        class="brc-page__dynamic_block"
        style="width: 265px; margin: 0px; background-color: white"
      ></ClientListItem>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'
import ClActivity from '@/models/ekoset/ClActivity'
import { Context } from "@nuxt/types";
import { ServiceRegistry } from '@/ServiceRegistry'
import PublicEkosetService from '@/services/PublicEkosetService'
import MediaService from '@/services/MediaService'

@Component
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

  private async asyncData (context: Context) {
    const itemList = ServiceRegistry.instance.getService(PublicEkosetService).getClActivityList()

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
    this.itemList = await ServiceRegistry.instance.getService(PublicEkosetService).getClActivityList()
  }

  private async save () {
    await ServiceRegistry.instance.getService(PublicEkosetService).saveClActivity(this.newActivity)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newActivity = new ClActivity()
    this.createNewMode = false
    this.updateItems()
  }

  private async saveAct (activity: ClActivity) {
    await ServiceRegistry.instance.getService(PublicEkosetService).saveClActivity(activity)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveAll () {
    for (const iterActiv of this.itemList) {
      await ServiceRegistry.instance.getService(PublicEkosetService).saveClActivity(iterActiv)
    }
  }

  private async addMainClientImage (imageFile: string, activity: ClActivity) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    ServiceRegistry.instance.getService(MediaService).saveClActivityMainClientLogo(activity.clActivityId, formData)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async deleteActivity (activity: ClActivity) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(PublicEkosetService).deleteClActivity(activity)
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

    const allClients = await ServiceRegistry.instance.getService(PublicEkosetService).getClients()
    this.previewClientItem = (allClients as any[]).find((iter) => {
      return iter.clActivityId === this.previewImageActivity.clActivityId
    })

    this.previewClientItem = this.previewClientItem ? this.previewClientItem : {}
  }


}
</script>



<style lang="scss">
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

