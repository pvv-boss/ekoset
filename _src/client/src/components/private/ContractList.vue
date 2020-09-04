<template>
  <DealTypeWrapper>
    <template #header>Список договоров</template>
    <template #filter>
      <div class="brc-contract-filter">
        <input id="valid_contract" v-model="isValidContractFilter" type="checkbox" />
        <label for="valid_contract">
          <span>Действует</span>
        </label>
        <input id="ended_contract" v-model="isEndedContractFilter" type="checkbox" />
        <label for="ended_contract">
          <span>Закончился</span>
        </label>
        <div class="brc-contract-filter__sortbydate" @click="sortByDate">
          <span>По сроку действия</span>
          <div v-html="dateSortSymbol"></div>
        </div>
        <div class="brc-contract-filter__sortbyname" @click="sortByName">
          <span>По наименованию</span>
          <div v-html="nameSortSymbol"></div>
        </div>

        <DealContractSortSelect @sort-mode-changed="mobileSortModeChanged"></DealContractSortSelect>

        <select v-model="selectedClient" class="brc-contract-filter__clients">
          <option
            v-for="iterClient in clients"
            :key="iterClient.clientId"
            :value="iterClient.clientId"
          >{{ iterClient.clientName }}</option>
        </select>
      </div>
    </template>
    <template #cards>
      <DealListWrapper :deal-list="contractList">
        <template #header="{ dealListItem }">
          <div class="brc-deal-list__item_strong">{{ dealListItem.clientName }}</div>
          <label class="brc-deal-list__item__header_id">
            {{
            'ID ' + dealListItem.contractId
            }}
          </label>
        </template>
        <template #body="{ dealListItem }">
          <div class="brc-contract__clinet-info">
            <div>
              <label>ИНН:</label>
              <span>{{ dealListItem.clientInn }}</span>
            </div>
            <label>ПланДата проверки:</label>
            <span>{{ dealListItem.clentDateRospotreb }}</span>
          </div>
          <div>
            <DealStatus :status-code="dealListItem.contractStatus"></DealStatus>
          </div>
          <div class="label_row">
            <label>Договор №:</label>
            <span>{{ contractNmbWithDate(dealListItem) }}</span>
          </div>

          <div class="label_row">
            <label>Срок действия:</label>
            <span class="brc-deal-list__item_strong">
              {{
              contractEndDate(dealListItem)
              }}
            </span>
          </div>

          <div class="label_row">
            <label>Адрес:</label>
            <span>{{ dealListItem.contractAddress }}</span>
          </div>
          <div class="label_row">
            <label>Услуги</label>
            <span>{{ dealListItem.contractServiceList }}</span>
          </div>
        </template>
        <template #action="{ dealListItem }">
          <a
            :class="[
              'brc-deal-list__item__action_button',
              { 'action_notactive': dealListItem.contractStatus === 0 }
            ]"
          >Продлить договор</a>
        </template>
      </DealListWrapper>
    </template>
  </DealTypeWrapper>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Contract from '@/models/deal/Contract'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class ContractList extends Vue {
  private allContractList: Contract[] = []
  private contractList: Contract[] = []
  private clients: any[] = []

  private isValidContractFilter = true
  private isEndedContractFilter = true
  private selectedClient = 0

  private sortMode = 0
  private sortOrder = false

  private get dateSortSymbol () {
    return this.sortMode === 0 ? (this.sortOrder ? '&#8593;' : '&#8595;') : ''
  }

  private get nameSortSymbol () {
    return this.sortMode === 1 ? (this.sortOrder ? '&#8593;' : '&#8595;') : ''
  }

  @Watch('selectedClient')
  private onSelectedClientChanged () {
    this.applayFilter()
  }

  @Watch('isValidContractFilter')
  private onIsValidContractFilterChanged () {
    this.applayFilter()
  }

  @Watch('isEndedContractFilter')
  private onIsEndedContractFilterChanged () {
    this.applayFilter()
  }

  public async fetch () {
    this.allContractList = await getServiceContainer().userDealService.getContracts()
    await this.applayFilter()
    await this.updateClients()
  }

  public contractNmbWithDate (contract: Contract) {
    return (
      contract.contractForm +
      ' от ' +
      new Date(contract.contractDateStart).toLocaleDateString('ru-RU')
    )
  }

  public contractEndDate (contract: Contract) {
    return new Date(contract.contractDateEnd).toLocaleDateString('ru-RU')
  }

  private async updateClients () {
    this.clients = await getServiceContainer().userDealService.getClientsByContracts(
      this.contractList
    )
  }

  private async applayFilter () {
    this.contractList = await getServiceContainer().userDealService.filterContracts(
      this.allContractList,
      this.isValidContractFilter,
      this.isEndedContractFilter,
      this.selectedClient,
      this.sortMode,
      this.sortOrder
    )
    this.updateClients()
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
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.brc-contract-filter {
  display: flex;
  padding: 10px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    // justify-content: space-between;
    flex-wrap: wrap;
    padding: 5px;
    font-size: 0.8rem;
  }

  span {
    margin-left: 5px;
    white-space: nowrap;
  }

  #ended_contract {
    margin-left: 25px;
    @media (max-width: 768px) {
      margin-left: 10px;
    }
  }

  .brc-contract-filter__clients {
    overflow: auto;
    margin-left: 25px;
    font-size: 0.9rem;
    width: 100%;

    @media (max-width: 768px) {
      margin-left: 0px;
      margin-top: 10px;
    }
  }

  .brc-contract-filter__sortbydate,
  .brc-contract-filter__sortbyname {
    @media (max-width: 768px) {
      display: none;
    }
    margin-left: 25px;
    display: flex;
    span {
      text-decoration: underline;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}

.brc-contract__clinet-info {
  background-color: #efefef;
  margin-left: -15px;
  margin-right: -15px;
  margin-top: -15px;
  padding: 10px 15px 10px 15px;

  span {
    font-size: 0.9rem;
  }
}
</style>
