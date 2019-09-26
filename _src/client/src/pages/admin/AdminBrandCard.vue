<template>
  <div class="brc-admin-card_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Бренд: {{brandItem.clBrandName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-site-section-card__attributes">
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
        </div>
      </div>
      <div class="brc-admin-card__relations"></div>
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
import { returnStatement } from '@babel/types'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    AdminStatusSelector,
    BreadCrumbs
  }})

export default class AdminBrandCard extends Vue {
  private brandItem: ClBrand = new ClBrand()
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {

    const brandItem = new ClBrand()//await getServiceContainer().publicEkosetService.getBrand(context.params.brand)

    // const brandRelationList = getServiceContainer().publicEkosetService.getAdminForSiteSectionBrands(siteSectionItem.siteSectionId)
    // const serviceOtherList = getServiceContainer().businessServiceService.getBySiteSectionSlug(context.params.siteSection)
    // const offerList = getServiceContainer().individualOfferService.getForActivityBySiteSectionIdSlug(context.params.siteSection)

    // const data = await Promise.all([serviceOtherList, brandRelationList, offerList])
    return {
      brandItem
    }


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




