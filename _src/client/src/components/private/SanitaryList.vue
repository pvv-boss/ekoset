<template>
  <DealTypeWrapper>
    <template #header>Список оформленных сандокументов</template>
    <template #filter>
      <div class="brc-contract-filter red-inputs">
        <div>
          <input id="valid_contract" v-model="isEndFilter" type="checkbox" />
          <label for="valid_contract">
            <span>Действует</span>
          </label>
        </div>
        <div style="margin-left: 18px">
          <input id="ended_contract" v-model="isPlanFilter" type="checkbox" />
          <label for="ended_contract">
            <span>Закончился</span>
          </label>
        </div>

        <div class="brc-contract-filter__sortbyname" @click="sortByName">
          <span>По наименованию</span>
          <div v-html="nameSortSymbol"></div>
        </div>

        <div class="brc-contract-filter__sortbydate" @click="sortByDate">
          <span>По сроку действия</span>
          <div v-html="dateSortSymbol"></div>
        </div>

        <DealContractSortSelect
          zero-opt-name="По сроку действия"
          one-opt-name="По наименованию"
          @sort-mode-changed="mobileSortModeChanged"
        ></DealContractSortSelect>

        <select v-model="selectedContract" class="brc-contract-filter__clients">
          <option :key="0" :value="0">{{ "Все договора" }}</option>
          <option
            v-for="iterContract in contracts"
            :key="iterContract.contractId"
            :value="iterContract.contractId"
          >
            {{ iterContract.contractId }}
          </option>
        </select>
      </div>
    </template>
    <template #cards>
      <DealListWrapper :deal-list="workList">
        <template #header="{ dealListItem }">
          <div class="brc-deal-list__item_strong">
            {{ dealListItem.documentName }}
          </div>
          <label class="brc-deal-list__item__header_id">
            {{ "ID " + dealListItem.contractId }}
          </label>
        </template>
        <template #body="{ dealListItem }">
          <div>
            <DealStatus :status-code="dealListItem.docDateStatus"></DealStatus>
          </div>

          <div class="label_col">
            <label>Документ №:</label>
            <span class="">
              {{ docNmbWithDate(dealListItem) }}
            </span>
          </div>

          <div class="label_col">
            <label>Срок действия:</label>
            <span class="brc-deal-list__item_strong">
              {{ contractEndDate(dealListItem.documentDateEnd) }}
            </span>
          </div>

          <div style="font-weight: 500; margin-top: 16px">
            {{ dealListItem.clientName }}
          </div>

          <div class="label_col">
            <label>Договор №:</label>
            <span>{{
              contractNmbWithDate(
                dealListItem.contractForm,
                dealListItem.contractDateStart
              )
            }}</span>
          </div>

          <div class="label_col">
            <label>Адрес:</label>
            <span>{{ dealListItem.contractAddress }}</span>
          </div>
        </template>
        <template #action="{ dealListItem }">
          <a
            :class="[
              'brc-deal-list__item__action_button',
              { action_notactive: dealListItem.contractStatus === 0 },
            ]"
            @click="
              dealListItem.contractStatus !== 0
                ? onContinieDoc(dealListItem)
                : () => {}
            "
            >Продлить документ</a
          >
        </template>
      </DealListWrapper>
    </template>
  </DealTypeWrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import SanDoc from '@/models/deal/SanDoc'
import UserDealService from '@/services/UserDealService'
import { ServiceRegistry } from '@/ServiceRegistry'
import SanitaryContinionForm from '@/components/private/SanitaryContinionForm.vue'

@Component
export default class SanitaryList extends Vue {
  private allWorkList: SanDoc[] = []
  private workList: SanDoc[] = []
  private contracts: any[] = []

  private isEndFilter = true
  private isPlanFilter = true
  private selectedContract = 0

  private sortMode = 0
  private sortOrder = false

  private get dateSortSymbol () {
    return this.sortMode === 0 ? (this.sortOrder ? '&#8593;' : '&#8595;') : ''
  }

  private get nameSortSymbol () {
    return this.sortMode === 1 ? (this.sortOrder ? '&#8593;' : '&#8595;') : ''
  }

  @Watch('selectedContract')
  private onSelectedClientChanged () {
    this.applayFilter()
  }

  @Watch('isEndFilter')
  private onIsValidContractFilterChanged () {
    this.applayFilter()
  }

  @Watch('isPlanFilter')
  private onIsEndedContractFilterChanged () {
    this.applayFilter()
  }

  public async fetch () {
    this.allWorkList = await ServiceRegistry.instance.getService(UserDealService).getSanDocsList()
    await this.applayFilter()
    await this.updateContracts()
  }

  public contractNmbWithDate (contractForm: string, contractDateStart: string) {
    return (
      contractForm +
      ' от ' +
      new Date(contractDateStart).toLocaleDateString('ru-RU')
    )
  }

  public docNmbWithDate (sanDoc: SanDoc) {
    return (
      sanDoc.documentNmb +
      ' от ' +
      new Date(sanDoc.documentDateStart).toLocaleDateString('ru-RU')
    )
  }

  public contractEndDate (contractDateEnd: string) {
    return new Date(contractDateEnd).toLocaleDateString('ru-RU')
  }

  private async updateContracts () {
    this.contracts = await ServiceRegistry.instance.getService(UserDealService).getContractsForWorks()
  }

  private async applayFilter () {
    // this.workList = this.allWorkList
    this.workList = await ServiceRegistry.instance.getService(UserDealService).filterSanDocs(
      this.allWorkList,
      this.isEndFilter,
      this.isPlanFilter,
      this.selectedContract,
      this.sortMode,
      this.sortOrder
    )
  }

  private sortByDate () {
    this.sortMode = 0
    this.sortOrder = !this.sortOrder
    this.applayFilter()
  }

  private sortByName () {
    this.sortMode = 1
    this.sortOrder = !this.sortOrder
    this.applayFilter()
  }

  private mobileSortModeChanged (sortMode: number) {
    this.sortMode = sortMode
    this.applayFilter()
  }

  private onContinieDoc (sanDoc: SanDoc) {
    this.$modalManager.modalShow(SanitaryContinionForm, { sanDoc }, {})

  }
}
</script>

<style lang="scss">
.label_col {
  margin-top: 8px;
  span {
    //  margin-left: 8px;
  }

  label,
  span {
    font-size: 0.8rem;
  }
}
</style>
