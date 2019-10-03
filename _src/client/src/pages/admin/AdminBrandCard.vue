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
        <div class="brc-admin-card-attribute brc-admin-card-attribute_chk">
          <input
            type="checkbox"
            id="clBrandMainPageVisible"
            v-model="isBrandMainPageVisible"
            @change="setBrandMainPageVisible"
          />
          <label for="clBrandMainPageVisible">Отображать на главной странице</label>
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
          <AdminImageUploader @upload="saveLetterImage($event,true)"></AdminImageUploader>

          <vue-good-table :columns="headerFields" :rows="recommendLetterList">
            <template slot="table-row" slot-scope="props">
              <a
                v-if="props.column.field == 'recommBrandImg'"
                :href="props.row.recommBrandImg"
                target="_blank"
              >{{props.row.recommBrandImg}}</a>
              <span v-else>
                <button type="button" @click="deleteRecommLetter(props.row.recommId)">Удалить</button>
              </span>
            </template>
          </vue-good-table>
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
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter'
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
  private recommendLetterList: any[] = []

  private isBrandMainPageVisible = false

  private layout () {
    return 'admin'
  }

  private headerFields = [
    {
      field: 'recommBrandImg',
      label: 'Изображение'
    },
    {
      field: 'actions',
      label: ''
    }
  ]

  private async asyncData (context: NuxtContext) {
    const brandItem = await getServiceContainer().publicEkosetService.getBrandById(Number(context.params.brand))
    const recommendLetters = getServiceContainer().publicEkosetService.getRecommendationLettersByBrand(Number(context.params.brand))

    const data = await Promise.all([recommendLetters])

    return {
      brandItem,
      recommendLetterList: data[0]
    }
  }

  private async updateLetterList () {
    this.recommendLetterList = await getServiceContainer().publicEkosetService.getRecommendationLettersByBrand(this.brandItem.clBrandId)
  }

  private async saveLetterImage (imageFile: string, isBig: boolean) {
    const letter: ReccomendationLetter = new ReccomendationLetter()
    letter.clBrandId = this.brandItem.clBrandId
    const recommLetter = await getServiceContainer().publicEkosetService.saveRecommendation(letter)

    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    await getServiceContainer().mediaService.saveRecommendationLetterImage(recommLetter.recommId, formData)
    this.updateLetterList()
  }

  private async deleteRecommLetter (recommId: number) {
    await getServiceContainer().publicEkosetService.deleteRecommendationLetter(recommId)
    this.updateLetterList()
  }

  private saveBrand () {
    getServiceContainer().publicEkosetService.saveBrand(this.brandItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveBrandImage (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveBrandImage(this.brandItem.clBrandId, formData, false)
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

  private setBrandMainPageVisible () {
    this.brandItem.clBrandMainPageVisible = this.isBrandMainPageVisible ? 1 : 0
  }

  private mounted () {
    this.configBreadCrumbs()
    this.isBrandMainPageVisible = Number(this.brandItem.clBrandMainPageVisible) === 1
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    this.breadCrumbList.push({ name: this.brandItem.clBrandName, link: '' })
  }

}
</script>

<style lang="scss">
.brc-admin-card-attribute_chk {
  display: inline;
  input {
    width: min-content !important;
  }
}
</style>




