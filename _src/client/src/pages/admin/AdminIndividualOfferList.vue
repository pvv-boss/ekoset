<template>
  <div class="brc-service-list_wrapper" v-id="indOfferItems.length>0">
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <h1>Индивидуальные предложения</h1>
    <button @click="createNewMode = true" v-show="!createNewMode">Создать индивидуальное предложение</button>

    <div v-if="createNewMode">
      <div class="brc-service-attribute" v-if="siteSectionList.length > 0">
        <div class="brc-service-attribute__caption">Подраздел</div>
        <select class="form-control" v-model="newIndividualOffer.siteSectionId">
          <option
            v-for="siteSection in siteSectionList"
            :key="siteSection.siteSectionId"
            :value="siteSection.siteSectionId"
          >{{siteSection.siteSectionName}}</option>
        </select>
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Наименование</div>
        <input type="text" v-model="newIndividualOffer.indOfferName" />
      </div>

      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Тип клиента</div>
        <input type="number" v-model.number="newIndividualOffer.clClientId" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Вид деятельности</div>
        <input type="number" v-model.number="newIndividualOffer.clActivityId" />
      </div>

      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Приоритет</div>
        <input type="number" v-model.number="newIndividualOffer.indOfferPriority" />
      </div>
      <div class="brc-service-attribute">
        <div class="brc-service-attribute__caption">Статус</div>
        <input type="number" v-model.number="newIndividualOffer.indOfferStatus" />
      </div>
      <button @click="saveNew">Сохранить</button>
      <button @click="cancelSaveNew">Отменить</button>
    </div>
    <div v-if="indOfferItems.length>0">
      <vue-good-table :columns="headerFields" :rows="indOfferItems">
        <template slot="table-row" slot-scope="props">
          <nuxt-link
            v-if="props.column.field == 'indOfferName'"
            :to="{ name: 'admin-individual-offer-card', params: { siteSection: props.row.siteSectionId, offer: props.row.indOfferSlug+'-'+props.row.indOfferId}}"
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

@Component({
  components: {
    BreadCrumbs
  }
})
export default class AdminIndividualOfferList extends Vue {
  private breadCrumbList: any[] = []
  private indOfferItems: IndividualOffer[] = []
  private createNewMode = false
  private newIndividualOffer: IndividualOffer = new IndividualOffer()
  private siteSectionList: SiteSection[] = []
  private headerFields = [
    {
      field: "siteSectionName",
      label: "Подраздел"
    },
    {
      field: "indOfferName",
      label: "Наименование"
    },
    {
      field: "clClientId",
      label: "Тип клиента"
    },
    {
      field: "clActivityId",
      label: "Вид деятельности"
    },
    {
      field: "indOfferPriority",
      label: "Приоритет"
    },
    {
      field: "indOfferStatus",
      label: "Статус"
    }
  ]

  private layout () {
    return 'admin'
  }

  private async asyncData (context: NuxtContext) {

    const indOfferItems = getServiceContainer().individualOfferService.adminGetAll()
    const siteSectionList = getServiceContainer().publicEkosetService.getSiteSections()

    const data = await Promise.all([indOfferItems, siteSectionList])
    return {
      indOfferItems: data[0],
      siteSectionList: data[1]
    }
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
    this.breadCrumbList.push({ name: 'Индивидуальные предложения', link: 'admin-individual-offers' })
  }

  private async saveNew () {
    await getServiceContainer().individualOfferService.save(this.newIndividualOffer)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newIndividualOffer = new IndividualOffer()
    this.createNewMode = false
  }

  private cancelSaveNew () {
    this.newIndividualOffer = new IndividualOffer()
    this.createNewMode = false
  }
}
</script>




