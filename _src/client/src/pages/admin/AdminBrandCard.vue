<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Бренд: {{brandItem.clBrandName}}</h2>
          <AdminStatusSelector statusCaption="Активен" v-model.number="brandItem.clBrandStatus"></AdminStatusSelector>
          <div class="field">
            <b-switch
              v-model="brandItem.clBrandMainPageVisible"
              true-value="1"
              false-value="0"
              type="is-success"
            >Отображать на главной странице</b-switch>
          </div>
          <b-button type="is-primary" @click="saveBrand">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row" style="flex:1;">
            <b-field label="Наименование">
              <b-input
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
                v-model="brandItem.clBrandName"
              ></b-input>
            </b-field>
            <b-field label="Фото на карточке (логотип)">
              <AdminImageUploader
                id="clBrandImgSmall"
                :isLeft="true"
                :srcImage="brandItem.clBrandImgSmall"
                @uploader:newimageloaded="saveBrandImage"
              >
                <template v-slot="{imageSrc}">
                  <RecommendationListItem
                    :brand="brandItem"
                    :imageSrcForDesignMode="imageSrc"
                    style="margin:0px;padding:0px;"
                  ></RecommendationListItem>
                </template>
              </AdminImageUploader>
            </b-field>
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
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminImageUploader from '@/components/admin/AdminImageUploader.vue'
import AdminStore from '@/store/AdminStore'
import BaseCard from '@/components/BaseCard.vue'
import RecommendationListItem from '@/components/public/RecommendationListItem.vue'
import RecommLetterListItem from '@/components/public/RecommLetterListItem.vue'

@Component({
  components: {
    AdminStatusSelector,
    BreadCrumbs,
    AdminImageUploader,
    BaseCard,
    RecommendationListItem,
    RecommLetterListItem
  }})

export default class AdminBrandCard extends Vue {
  private brandItem: ClBrand = new ClBrand()
  private recommendLetterList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {
    const brandItem = await getServiceContainer().publicEkosetService.getBrandById(Number(context.params.brand))
    // const recommendLetters = getServiceContainer().publicEkosetService.getRecommendationLettersByBrand(Number(context.params.brand))

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    breadCrumbList.push({ name: brandItem.clBrandName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)


    // const data = await Promise.all([recommendLetters])

    return {
      brandItem
      // recommendLetterList: data[0]
    }
  }

  // private async updateLetterList () {
  //   this.recommendLetterList = await getServiceContainer().publicEkosetService.getRecommendationLettersByBrand(this.brandItem.clBrandId)
  // }
  // private async addNewLetter () {
  //   const letter: ReccomendationLetter = new ReccomendationLetter()
  //   letter.clBrandId = this.brandItem.clBrandId
  //   this.recommendLetterList.push(letter)
  // }

  // private async saveLetterImage (imageFile: string, letter: ReccomendationLetter) {
  //   // const letter: ReccomendationLetter = new ReccomendationLetter()
  //   letter.clBrandId = this.brandItem.clBrandId
  //   const recommLetter = await getServiceContainer().publicEkosetService.saveRecommendation(letter)

  //   const formData: FormData = new FormData()
  //   formData.append('file', imageFile)
  //   recommLetter.smallImageFormData = formData
  //   await getServiceContainer().mediaService.saveRecommendationLetterImage(recommLetter.recommId, formData)
  //   this.updateLetterList()
  // }

  // private async deleteRecommLetter (letter: ReccomendationLetter) {
  //   if (!!letter.recommId) {
  //     await getServiceContainer().publicEkosetService.deleteRecommendationLetter(letter.recommId)
  //   }
  //   this.updateLetterList()
  // }

  private saveBrand () {
    getServiceContainer().publicEkosetService.saveBrand(this.brandItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveBrandImage (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    getServiceContainer().mediaService.saveBrandImage(this.brandItem.clBrandId, formData, false)
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-admin-card-recomm-letter-list {
  margin: 30px -15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>





