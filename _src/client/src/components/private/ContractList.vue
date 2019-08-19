<template>
  <div>
    <header>Контрагенты и договора</header>
    <ContractListItem
      v-for="contractItem in contractList"
      :key="contractItem.contractId"
      :contractItem="contractItem"
    ></ContractListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ContractListItem from '@/components/private/ContractListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Contract from '@/models/ekoset/Contract.ts'

@Component({
  components: {
    ContractListItem
  }
})
export default class ContractList extends Vue {
  @Prop()
  private userId

  @Prop(String)
  private mode

  private contractList: Contract[] = []

  public async getDataList () {
    //FIXME: получение списка контрагентов и договоров
    const dataItems = []//await getServiceContainer().UserService.getData(this.userId)
    this.contractList = dataItems
  }

  public mounted () {
    this.$nextTick(() => {
      this.getDataList()
    })
  }

}
</script>