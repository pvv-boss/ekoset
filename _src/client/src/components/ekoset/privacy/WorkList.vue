<template>
  <div>
    <header>Дезинфекционные работы</header>
    <WorkListItem v-for="workItem in workList" :key="workItem.workId" :workItem="workItem"></WorkListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import WorkListItem from '@/components/ekoset/privacy/WorkListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Work from '@/models/ekoset/Work.ts'

@Component({
  components: {
    WorkListItem
  }
})
export default class WorkList extends Vue {
  @Prop()
  private userId

  @Prop(String)
  private mode

  private workList: Work[] = []

  private async asyncData (context: NuxtContext) {
    //FIXME: получение списка дезинфекционных работ
    const data = await (getServiceContainer().articleService.getRootArticleList())
    if (data) {
      return {
        workList: data
      }
    }
  }
}
</script>