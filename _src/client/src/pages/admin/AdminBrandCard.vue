<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Бренд: {{brandItem.clBrandName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="brandItem.clBrandName" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" v-model.number="brandItem.clBrandPriority" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Статус</div>
          <AdminStatusSelector v-model.number="brandItem.clBrandStatus"></AdminStatusSelector>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Логотип (изображение)</div>
          <AdminImageUploader id="brandImageFile" @upload="saveBrandImage"></AdminImageUploader>
        </div>
        <div class="brc-admin-card__save">
          <button type="button" @click="saveBrand">Сохранить</button>
          <button type="button" @click="deleteBrand">Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Благодарственные письма</div>
          <AdminFileUploader :maxFiles="10"></AdminFileUploader>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'

@Component({
  components: {
    AdminStatusSelector,
    BreadCrumbs,
    AdminImageUploader
  }})

export default class AdminBrandCard extends Vue {
  private brandItem: ClBrand = new ClBrand()
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const brandItem = await getServiceContainer().publicEkosetService.getBrandById(Number(context.params.brand))
    return {
      brandItem
    }
  }

  private saveBrand () {
    getServiceContainer().publicEkosetService.saveBrand(this.brandItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveBrandImage (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveBrandImage(this.brandItem.clBrandId, formData, true)
  }

  private deleteBrand () {
    const self = this
    const okCallback = async () => {
      await getServiceContainer().publicEkosetService.deleteBrand(this.brandItem.clBrandId)
      self.$router.push({ name: 'admin-brands' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить бренд?', 'Подтвердите удаление', okCallback)
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    this.breadCrumbList.push({ name: this.brandItem.clBrandName, link: '' })
  }

}
</script>




