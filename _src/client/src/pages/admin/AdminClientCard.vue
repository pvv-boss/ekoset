<template>
  <div class="brc-admin_page_wrapper">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Клиент: {{clientItem.partnerName}}</h1>
    <div class="brc-admin-card">
      <div class="brc-admin-card__attributes">
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Наименование</div>
          <input type="text" v-model="clientItem.partnerName" />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Префикс</div>
          <input type="text" v-model="clientItem.partnerUrl" disabled />
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Группа</div>
          <AdminPartnerGroupSelector v-model="clientItem.partnerGroupId"></AdminPartnerGroupSelector>
        </div>
        <div class="brc-admin-card-attribute">
          <div class="brc-admin-card-attribute__caption">Приоритет</div>
          <input type="number" v-model.number="clientItem.partnerPriority" />
        </div>
        <div class="brc-admin-card__save">
          <button type="button" @click="saveClient">Сохранить</button>
        </div>
      </div>
      <div class="brc-admin-card__relations"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessService from '@/models/ekoset/BusinessService.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import Partner from '@/models/ekoset/Partner'
import AdminPartnerGroupSelector from '@/components/admin/AdminPartnerGroupSelector.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'


@Component({
  components: {
    BreadCrumbs,
    AdminPartnerGroupSelector,
  }
})
export default class AdminClientCard extends Vue {
  private clientItem: Partner = new Partner()
  private breadCrumbList: any[] = []
  private createNewItemMode = false
  private newService: BusinessService = new BusinessService()
  private layout () {
    return 'admin'
  }


  private async asyncData (context: NuxtContext) {
    const clientItem = await getServiceContainer().publicEkosetService.getPartnerById(Number(context.params.client))

    return {
      clientItem
    }
  }

  private saveClient () {
    getServiceContainer().publicEkosetService.savePartner(this.clientItem)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Клиенты', link: 'admin-clients' })
    this.breadCrumbList.push({ name: this.clientItem.partnerName, link: '' })
  }
}
</script>