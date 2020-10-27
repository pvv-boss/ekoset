<template>
  <div class="brc-admin_page_wrapper">
    <BaseCard>
      <template #header>
        <div class="brc-card__header__toolbar">
          <h2>Бренд: {{ brandItem.clBrandName }}</h2>
          <LazyAdminStatusSelector
            v-model.number="brandItem.clBrandStatus"
            status-caption="Активен"
          ></LazyAdminStatusSelector>
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
              <LazyAdminImageUploader
                id="clBrandImgSmall"
                :is-left="true"
                :src-image="brandItem.clBrandImgSmall"
                @uploader:newimageloaded="saveBrandImage"
              >
                <template v-slot="{ imageSrc }">
                  <LazyRecommendationListItem
                    :brand="brandItem"
                    :image-src-for-design-mode="imageSrc"
                    style="margin: 0px; padding: 0px"
                  ></LazyRecommendationListItem>
                </template>
              </LazyAdminImageUploader>
            </b-field>
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import ClBrand from '@/models/ekoset/ClBrand'
import AdminStore from '@/store/AdminStore'
import { Context } from "@nuxt/types";
import { ServiceRegistry } from '@/ServiceRegistry'
import PublicEkosetService from '@/services/PublicEkosetService'
import MediaService from '@/services/MediaService'

@Component
export default class AdminBrandCard extends Vue {
  private brandItem: ClBrand = new ClBrand()
  private recommendLetterList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: Context) {
    const brandItem = await ServiceRegistry.instance.getService(PublicEkosetService).getBrandById(Number(context.params.brand))

    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Бренды', link: 'admin-brands' })
    breadCrumbList.push({ name: brandItem.clBrandName, link: '' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)
    return {
      brandItem
    }
  }
  private saveBrand () {
    ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(this.brandItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private async saveBrandImage (imageFile: string) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    ServiceRegistry.instance.getService(MediaService).saveBrandImage(this.brandItem.clBrandId, formData, false)
  }

}
</script>

<style lang="scss">
.brc-admin-card-recomm-letter-list {
  margin: 30px -15px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>





