<template>
  <div class="brc-admin-card_wrapper">
    <h1>Подраздел сайта: {{siteSectionItem.siteSectionName}}</h1>
    <div class="brc-admin-card" v-if="siteSectionItem.siteSectionId > 0">
      <div class="brc-admin-card__attributes">
        <div class="brc-site-section-card__attributes">
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Наименование</div>
            <input type="text" v-model="siteSectionItem.siteSectionName" />
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Префикс</div>
            <input type="text" v-model="siteSectionItem.siteSectionSlug" disabled />
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Приоритет</div>
            <input type="number" v-model.number="siteSectionItem.siteSectionPriority" />
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Статус</div>
            <input type="number" v-model.number="siteSectionItem.siteSectionStatus" />
          </div>

          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Превью изображение</div>
            <AdminFileUploader v-model="siteSectionItem.siteSectionImgSmall"></AdminFileUploader>
          </div>
          <div class="brc-admin-card-attribute">
            <div class="brc-admin-card-attribute__caption">Основное изображение</div>
            <AdminFileUploader v-model="siteSectionItem.siteSectionImgBig"></AdminFileUploader>
          </div>
          <div class="brc-admin-card-attribute__caption">Текстовый блок 1</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText1"></AdminArticleEditor>
          <div class="brc-admin-card-attribute__caption">Текстовый блок 2</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText2"></AdminArticleEditor>
          <button type="button" @click="saveSiteSection">Сохранить</button>
          <button
            v-if="siteSectionItem.siteSectionId > 0"
            type="button"
            @click="deleteSiteSection"
          >Удалить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations">
        <div>
          <h4>Комплексные решения</h4>
        </div>
        <div>
          <h4>Индивидуальные предложения</h4>
        </div>
        <div>
          <h4>Услуги</h4>
          <AdminServiceChildList :serviceItems="serviceOtherList"></AdminServiceChildList>
        </div>
        <div>
          <h4>Рекомендации</h4>
          <AdminBrandRelationList :brandRelationItems="brandRelationList"></AdminBrandRelationList>
        </div>
        <div>
          <h4>Новости</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import AdminArticleEditor from '@/components/admin/AdminArticleEditor.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import AdminFileUploader from '@/components/admin/AdminFileUploader.vue'
import AdminBrandRelationList from '@/components/admin/AdminBrandRelationList.vue'
import AdminServiceChildList from '@/components/admin/AdminServiceChildList.vue'
import ClBrand from '@/models/ekoset/ClBrand'
import BusinessService from '@/models/ekoset/BusinessService.ts'

@Component({
  components: {
    AdminArticleEditor,
    AdminBrandRelationList,
    AdminFileUploader,
    AdminServiceChildList
  }})

export default class AdminSiteSectionCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()
  private serviceOtherList: BusinessService = new BusinessService()
  private brandRelationList: ClBrand[] = []

  private layout () {
    return 'admin'
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private async mounted () {
    if (this.getCurrentSiteSection) {
      this.siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.getCurrentSiteSection)

      const brandRelationList = getServiceContainer().publicEkosetService.getBrandsBySiteSectionSlug(this.getCurrentSiteSection)
      const serviceOtherList = getServiceContainer().businessServiceService.getBySiteSectionSlug(this.getCurrentSiteSection)

      const data = await Promise.all([brandRelationList, serviceOtherList])
      if (data) {
        this.brandRelationList = data[0]
        this.serviceOtherList = data[1]
      }

    }
  }

  private saveSiteSection () {
    getServiceContainer().publicEkosetService.saveSiteSection(this.siteSectionItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private deleteSiteSection () {
    const self = this
    const okCallback = async () => {
      if (this.siteSectionItem.siteSectionSlug) {
        await getServiceContainer().publicEkosetService.deleteSiteSection(this.siteSectionItem.siteSectionSlug)
      }
      self.$router.push({ name: 'admin-site-sections' })
      self.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить раздел?', 'Подтвердите удаление', okCallback)
  }
}
</script>




