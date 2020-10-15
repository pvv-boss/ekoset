<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Бренд: {{ brandItem.clBrandName }}</h2>
          <AdminStatusSelector
            v-model.number="brandItem.clBrandStatus"
            status-caption="Активен"
          ></AdminStatusSelector>
          <div class="field">
            <b-switch
              v-model="brandItem.clBrandMainPageVisible"
              true-value="1"
              false-value="0"
              type="is-success"
              >Отображать на главной странице</b-switch
            >
          </div>
          <b-button type="is-primary" @click="saveBrand">Сохранить</b-button>
        </div>
      </template>
      <template #content>
        <div class="brc-admin-card_two-column">
          <div class="brc-admin-card-field-list_row" style="flex: 1">
            <b-field label="Наименование">
              <b-input
                v-model="brandItem.clBrandName"
                placeholder="Наименование"
                type="text"
                required
                validation-message="Наименование не может быть пустым"
              ></b-input>
            </b-field>
            <b-field label="Фото на карточке (логотип)">
              <AdminImageUploader
                id="clBrandImgSmall"
                :is-left="true"
                :src-image="brandItem.clBrandImgSmall"
                @uploader:newimageloaded="saveBrandImage"
              >
                <template v-slot="{ imageSrc }">
                  <RecommendationListItem
                    :brand="brandItem"
                    :image-src-for-design-mode="imageSrc"
                    style="margin: 0px; padding: 0px"
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
import ClBrand from '@/models/ekoset/ClBrand'
import ReccomendationLetter from '@/models/ekoset/ReccomendationLetter'
import AdminStore from '@/store/AdminStore'

@Component
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
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.brc-admin-card-recomm-letter-list {
  margin: 30px -15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>





