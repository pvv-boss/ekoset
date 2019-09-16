<template>
  <div class="brc-site-section-list_wrapper">
    <h1>Подраздел сайта: {{siteSectionItem.siteSectionName}}</h1>
    <div class="brc-site-section__form" method="post" v-if="siteSectionItem.siteSectionId > 0">
      <div class="brc-site-section-card_admin">
        <div class="brc-site-section-card__attributes">
          <AdminSiteSectionAttributes v-model="siteSectionItem"></AdminSiteSectionAttributes>
          <h4>Комплексные решения</h4>
          <h4>Индивидуальные предложения</h4>
          <h4>Услуги</h4>
          <h4>Рекомендации</h4>
        </div>
        <div class="brc-site-section-card__editor">
          <div class="brc-article-attribute__caption">Текстовый блок 1</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText1"></AdminArticleEditor>
          <div class="brc-article-attribute__caption">Текстовый блок 2</div>
          <AdminArticleEditor v-model="siteSectionItem.siteSectionFreeText2"></AdminArticleEditor>
        </div>
      </div>
      <div class="brc-site-section-card__save">
        <button type="button" @click="saveSiteSection">Сохранить</button>
        <button
          v-if="siteSectionItem.siteSectionId > 0"
          type="button"
          @click="deleteSiteSection"
        >Удалить</button>
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
import AdminSiteSectionAttributes from '@/components/admin/AdminSiteSectionAttributes.vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'

@Component({
  components: {
    AdminArticleEditor,
    AdminSiteSectionAttributes
  }})
export default class AdminServiceCard extends Vue {
  private siteSectionItem: SiteSection = new SiteSection()

  private layout () {
    return 'admin'
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private async mounted () {
    if (this.getCurrentSiteSection) {
      this.siteSectionItem = await getServiceContainer().publicEkosetService.getSiteSectionBySlug(this.getCurrentSiteSection)
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

<style lang="scss">
.brc-site-section__form {
  width: 100%;
  // .brc-site-section-card__save {
  //   padding: 20px;
  // }
}
.brc-site-section-card_admin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  flex: 2;

  .brc-site-section-card__editor,
  .brc-site-section-card__attributes {
    flex: 1;

    input {
      width: 100%;
    }
  }
}

.ql-container {
  height: 300px !important;
}
</style>


