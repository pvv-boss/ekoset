<template>
  <div>
    <header>Сандокументы</header>
    <DocumentListItem
      v-for="documentItem in documentList"
      :key="documentItem.documentId"
      :documentItem="documentItem"
    ></DocumentListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import DocumentListItem from '@/components/private/DocumentListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import Document from '@/models/ekoset/Document.ts'

@Component({
  components: {
    DocumentListItem
  }
})
export default class DocumentList extends Vue {
  @Prop()
  private userId

  @Prop(String)
  private mode

  private documentList: Document[] = []

  public async getDataList () {
    //FIXME: получение списка сан.документов
    const dataItems = []//await getServiceContainer().UserService.getData(this.userId)
    this.documentList = dataItems
  }

  public mounted () {
    this.$nextTick(() => {
      this.getDataList()
    })
  }
}
</script>