<template>
  <div class="brc-service-list_wrapper" v-id="indOfferItems.length>0">
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
    {{indOfferItems}}
    <vue-good-table :columns="headerFields" :rows="indOfferItems"></vue-good-table>
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

@Component({})
export default class AdminIndividualOfferList extends Vue {
  private indOfferItems: IndividualOffer[] = []
  private createNewMode = false
  private newIndividualOffer: IndividualOffer = new IndividualOffer()
  private siteSectionList: SiteSection[] = []
  private headerFields = [
    {
      field: "siteSectionId",
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

  private async mounted () {
    // TODO: получение списка всех индивидуальных предложений
    this.indOfferItems.push(await getServiceContainer().individualOfferService.getForBusinessBySiteSectionSlug('klining-1'))
    this.siteSectionList = await getServiceContainer().publicEkosetService.getSiteSections()
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




