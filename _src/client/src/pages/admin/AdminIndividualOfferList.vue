<template>
  <div class="brc-admin_page_wrapper">
    <h1>Индивидуальные предложения</h1>
    <button @click="createNewMode = true" v-show="!createNewMode">Создать индивидуальное предложение</button>

    <div v-if="createNewMode">
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Подраздел</div>
        <AdminSiteSectionSelector v-model="newIndividualOffer.siteSectionId"></AdminSiteSectionSelector>
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Наименование</div>
        <input type="text" v-model="newIndividualOffer.indOfferName" />
      </div>

      <!-- <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Тип клиента</div>
        <AdminClientTypeSelector v-model.number="newIndividualOffer.clClientId"></AdminClientTypeSelector>
      </div>-->
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Вид деятельности</div>
        <AdminClActivitySelector v-model="newIndividualOffer.clActivityId"></AdminClActivitySelector>
      </div>

      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newIndividualOffer.indOfferPriority" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Статус</div>
        <AdminStatusSelector v-model.number="newIndividualOffer.indOfferStatus"></AdminStatusSelector>
      </div>
      <button @click="saveNew">Сохранить</button>
      <button @click="cancelSaveNew">Отменить</button>
    </div>
    <div v-if="createNewMode === false">
      <vue-good-table :columns="headerFields" :rows="indOfferItems">
        <template slot="table-row" slot-scope="props">
          <nuxt-link
            v-if="props.column.field == 'indOfferName'"
            :to="{ name: 'admin-individual-offer-card', params: { siteSection: props.row.siteSectionUrl, offer: props.row.indOfferUrl}}"
          >{{props.row.indOfferName}}</nuxt-link>
          <span v-else>{{props.formattedRow[props.column.field]}}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import IndividualOffer from '@/models/ekoset/IndividualOffer.ts'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import SiteSection from '@/models/ekoset/SiteSection'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminSiteSectionSelector from '@/components/admin/AdminSiteSectionSelector.vue'
import AdminClActivitySelector from '@/components/admin/AdminClActivitySelector.vue'
import AdminStatusSelector from '@/components/admin/AdminStatusSelector.vue'
import AdminClientTypeSelector from '@/components/admin/AdminClientTypeSelector.vue'
import { getModule } from 'vuex-module-decorators'
import AdminStore from '@/store/AdminStore'

@Component({
  components: {
    BreadCrumbs,
    AdminSiteSectionSelector,
    AdminClActivitySelector,
    AdminStatusSelector,
    AdminClientTypeSelector
  }
})
export default class AdminIndividualOfferList extends Vue {
  private indOfferItems: IndividualOffer[] = []
  private createNewMode = false
  private newIndividualOffer: IndividualOffer = new IndividualOffer()
  private headerFields = [
    {
      field: 'siteSectionName',
      label: 'Подраздел'
    },
    {
      field: 'indOfferName',
      label: 'Наименование'
    },
    {
      field: 'clClientName',
      label: 'Тип клиента'
    },
    {
      field: 'clActivityName',
      label: 'Вид деятельности'
    },
    {
      field: 'indOfferPriority',
      label: 'Приоритет',
      type: 'number'
    },
    {
      field: 'indOfferStatus',
      label: 'Статус',
      type: 'number'
    }
  ]

  private layout () {
    return 'admin'
  }

  private async updateIndOfferList () {
    this.indOfferItems = await getServiceContainer().individualOfferService.adminGetAll()
  }

  private async asyncData (context: NuxtContext) {
    const breadCrumbList: any[] = []
    breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    breadCrumbList.push({ name: 'Индивидуальные предложения', link: 'admin-individual-offers' })
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList)

    const indOfferItems = getServiceContainer().individualOfferService.adminGetAll()
    const data = await Promise.all([indOfferItems])
    return {
      indOfferItems: data[0]
    }
  }

  private async saveNew () {
    await getServiceContainer().individualOfferService.save(this.newIndividualOffer)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.updateIndOfferList()
    this.newIndividualOffer = new IndividualOffer()
    this.createNewMode = false
  }

  private cancelSaveNew () {
    this.newIndividualOffer = new IndividualOffer()
    this.createNewMode = false
  }
}
</script>




