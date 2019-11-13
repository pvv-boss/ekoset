<template>
  <div class="brc-admin_page_wrapper">
    <div class="brc_admin-brand-list-container">
      <div class="brc-card__header__toolbar">
        <h2>Бренды</h2>
        <span class="brc_admin-brand-list-container__help">
          <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
        </span>

        <div v-if="createNewBrandMode" class="brc-admin-card-create-row">
          <b-field label="Наименование:" horizontal>
            <b-input
              placeholder="Наименование"
              type="text"
              required
              validation-message="Наименование не может быть пустым"
              v-model="newBrand.clBrandName"
            ></b-input>
          </b-field>
          <b-button @click="saveNewBrand" type="is-primary">Сохранить</b-button>
          <b-button @click="cancelSaveNewBrand">Отмена</b-button>
        </div>

        <b-button
          type="is-primary"
          outlined
          @click="createNewBrandMode = true"
          v-show="!createNewBrandMode"
        >Создать</b-button>
      </div>

      <div class="brc_admin-brand-list">
        <div class="brc_admin-brand-list-item">
          <span>Наименование</span>
          <span>Фото (логотип)</span>
          <!-- <span>Статус</span> -->
        </div>

        <draggable v-model="brandList" @change="handleChange">
          <div
            class="brc_admin-brand-list-item"
            v-for="iterBrand in brandList"
            :key="iterBrand.clBrandId"
          >
            <nuxt-link
              :to="{ name: 'admin-brand-card',params:{brand:iterBrand.clBrandId}}"
            >{{iterBrand.clBrandName}}</nuxt-link>

            <b-upload @input="saveBrandImage(...arguments,iterBrand)">
              <a class="button is-link">
                <b-icon icon="upload"></b-icon>
              </a>
            </b-upload>

            <!-- <b-switch
              v-model="iterBrand.clBrandStatus"
              true-value="1"
              false-value="0"
              type="is-success"
              size="is-small"
              style="justify-content: flex-end;"
            ></b-switch>-->
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import ClBrand from '@/models/ekoset/ClBrand'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'

@Component({
  components: {
    BreadCrumbs,
    AdminStatusSelector
  }
})
export default class AdminBrandList extends Vue {
  private brandList: ClBrand[] = []
  private createNewBrandMode = false
  private newBrand: ClBrand = new ClBrand()


  private layout () {
    return 'admin'
  }

  private async updateBrandList () {
    this.brandList = await getServiceContainer().publicEkosetService.getAdminAllBands()
  }

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const data = await getServiceContainer().publicEkosetService.getAdminAllBands()
    return {
      brandList: data
    }
  }

  private async saveNewBrand () {
    await getServiceContainer().publicEkosetService.saveBrand(this.newBrand)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newBrand = new ClBrand()
    this.createNewBrandMode = false
    this.updateBrandList()
  }

  private cancelSaveNewBrand () {
    this.newBrand = new ClBrand()
    this.createNewBrandMode = false
  }

  private async handleChange () {
    for (let i = 0; i < this.brandList.length; i++) {
      this.brandList[i].clBrandPriority = this.brandList.length - i;
      await getServiceContainer().publicEkosetService.saveBrand(this.brandList[i])
    }
  }

  private async saveBrandImage (imageFile: string, brandItem: ClBrand) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    brandItem.smallImageFormData = formData

    await getServiceContainer().publicEkosetService.saveBrand(brandItem)
  }
}
</script>


<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-brand-list-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: $box-shadow;
  background-color: white;

  .brc_admin-brand-list-item {
    margin-top: 10px;

    display: grid;
    //  grid-template-columns: 1fr 280px 80px;
    grid-template-columns: 1fr 280px;
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

    cursor: move;
  }

  .brc_admin-brand-list-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  


