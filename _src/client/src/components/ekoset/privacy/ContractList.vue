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
import ContractListItem from '@/components/ekoset/privacy/ContractListItem.vue'
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

  private async asyncData (context: NuxtContext) {
    //FIXME: получение списка контрагентов и договоров
    const data = await (getServiceContainer().articleService.getRootArticleList())
    if (data) {
      return {
        contractList: data
      }
    }
  }

}
</script>