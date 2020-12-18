<template>
  <DealTypeWrapper>
    <template #header>Список лабораторных исследований</template>
    <template #filter>
      <div class="brc-contract-filter red-inputs">
        <div>
          <input id="valid_contract" v-model="isEndFilter" type="checkbox" />
          <label for="valid_contract">
            <span>Выполнено</span>
          </label>
        </div>
        <div style="margin-left: 18px">
          <input id="ended_contract" v-model="isPlanFilter" type="checkbox" />
          <label for="ended_contract">
            <span>Планируется</span>
          </label>
        </div>

        <div class="brc-contract-filter__sortbyname" @click="sortByName">
          <span>По наименованию</span>
          <div v-html="nameSortSymbol"></div>
        </div>

        <div class="brc-contract-filter__sortbydate" @click="sortByDate">
          <span>По дате работ</span>
          <div v-html="dateSortSymbol"></div>
        </div>

        <DealContractSortSelect
          zero-opt-name="По дате работ"
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
            {{ dealListItem.sheldServiceName }}
          </div>
          <label class="brc-deal-list__item__header_id">
            {{ "ID " + dealListItem.contractId }}
          </label>
        </template>
        <template #body="{ dealListItem }">
          <div>
            <DealStatus
              :for-work="true"
              :status-code="dealListItem.sheldServicePlanInd"
            ></DealStatus>
          </div>

          <div class="label_col">
            <label>Дата работ:</label>
            <span class="brc-deal-list__item_strong">
              {{ contractEndDate(dealListItem.sheldServiceDate) }}
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
            :class="['brc-deal-list__item__action_button']"
            @click="onContinieWork(dealListItem)"
            >{{ getActionText(dealListItem) }}</a
          >
        </template>
      </DealListWrapper>
    </template>
  </DealTypeWrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Work from '@/models/deal/Work'
import UserDealService from '@/services/UserDealService'
import { ServiceRegistry } from '@/ServiceRegistry'
import WorkContinionForm from '@/components/private/WorkContinionForm.vue'

@Component
export default class LabaratoryList extends Vue {
  private allWorkList: Work[] = []
  private workList: Work[] = []
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

  private getActionText (item: Work) {
    return item.sheldServicePlanInd === 1 ? 'Изменить дату работ' : 'Заказать еще раз';
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
    this.allWorkList = await ServiceRegistry.instance.getService(UserDealService).getLabaratoryList()
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

  public contractEndDate (contractDateEnd: string) {
    return new Date(contractDateEnd).toLocaleDateString('ru-RU')
  }

  private async updateContracts () {
    this.contracts = await ServiceRegistry.instance.getService(UserDealService).getContractsForWorks()
  }

  private async applayFilter () {
    this.workList = await ServiceRegistry.instance.getService(UserDealService).filterWork(
      this.allWorkList,
      this.isEndFilter,
      this.isPlanFilter,
      this.selectedContract,
      this.sortMode,
      this.sortOrder
    )
    // this.updateClients()
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

  private onContinieWork (work: Work) {
    this.$modalManager.modalShow(WorkContinionForm, { work }, {})

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
