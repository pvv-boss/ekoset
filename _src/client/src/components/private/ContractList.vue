<template>
  <DealTypeWrapper>
    <template #header>Список договоров</template>
    <template #filter>Filter</template>
    <template #cards>
      <DealListWrapper :dealList="contractList">
        <template #header="{dealListItem}">
          <div class="brc-deal-list__item_strong">{{dealListItem.clientName}}</div>
          <label class="brc-deal-list__item__header_id">{{'ID ' + dealListItem.contractId}}</label>
        </template>
        <template #body="{dealListItem}">
          <div class="brc-contract__clinet-info">
            <div>
              <label>ИНН:</label>
              <span>{{dealListItem.clientInn}}</span>
            </div>
            <label>ПланДата проверки:</label>
            <span>{{dealListItem.clentDateRospotreb}}</span>
          </div>
          <div>
            <DealStatus :statusCode="dealListItem.contractStatus"></DealStatus>
          </div>
          <div class="label_row">
            <label>Договор №</label>
            <span>{{contractNmbWithDate(dealListItem)}}</span>
          </div>

          <div class="label_row">
            <label>Срок действия</label>
            <span class="brc-deal-list__item_strong">{{contractEndDate(dealListItem)}}</span>
          </div>

          <div class="label_row">
            <label>Адрес</label>
            <span>{{dealListItem.contractAddress}}</span>
          </div>
          <div class="label_row">
            <label>Услуги</label>
            <span>{{dealListItem.contractServiceList}}</span>
          </div>
        </template>
        <template #action>
          <a class="brc-deal-list__item__action_button">Продлить договор</a>
        </template>
      </DealListWrapper>
    </template>
  </DealTypeWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Contract from '@/models/deal/Contract'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component
export default class ContractList extends Vue {

  private contractList: Contract[] = []

  public fetch () {
    this.updateContractList()
  }

  public contractNmbWithDate (contract: Contract) {
    return contract.contractForm + ' от ' + new Date(contract.contractDateStart).toLocaleDateString('ru-RU')
  }

  public contractEndDate (contract: Contract) {
    return new Date(contract.contractDateEnd).toLocaleDateString('ru-RU')
  }

  private async updateContractList () {
    this.contractList = await getServiceContainer().userDealService.getContracts()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-contract__clinet-info {
  background-color: #efefef;
  margin-left: -15px;
  margin-right: -15px;
  margin-top: -15px;
  padding: 10px 15px 10px 15px;

  span {
    font-size: 0.8rem;
  }
}
</style>