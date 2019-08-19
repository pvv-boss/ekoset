<template>
  <div>
    <header>Дезинфекционные работы</header>
    <DisinfectionWorkListItem
      v-for="disinfectionWorkItem in disinfectionWorkList"
      :key="disinfectionWorkItem.workId"
      :disinfectionWorkItem="disinfectionWorkItem"
    ></DisinfectionWorkListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DisinfectionWorkListItem from '@/components/private/DisinfectionWorkListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Work from '@/models/ekoset/Work.ts'

@Component({
  components: {
    DisinfectionWorkListItem
  }
})
export default class DisinfectionWorkList extends Vue {
  @Prop()
  private userId

  @Prop(String)
  private mode

  private disinfectionWorkList: Work[] = []

  public async getDataList () {
    //FIXME: получение списка дезработ
    const dataItems = []//await getServiceContainer().UserService.getData(this.userId)
    this.disinfectionWorkList = dataItems
  }

  public mounted () {
    this.$nextTick(() => {
      this.getDataList()
    })
  }
}
</script>