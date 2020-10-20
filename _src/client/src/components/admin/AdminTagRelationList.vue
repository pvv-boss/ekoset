<template>
  <div class="brc-brand-relation-list_wrapper">
    <b-button
      v-show="!createNewMode"
      type="is-primary"
      outlined
      style="margin-bottom: 10px"
      @click="createNewMode = true"
      >Создать</b-button
    >

    <div
      v-if="createNewMode"
      class="brc-admin-card-create-row"
      style="margin-bottom: 10px"
    >
      <b-input
        v-model="newItem.clArticleName"
        placeholder="Наименование"
        type="text"
        required
        validation-message="Наименование не может быть пустым"
      ></b-input>
      <b-button type="is-primary" @click="saveNewTag">OK</b-button>
      <b-button @click="cancelSaveNewTag">Отмена</b-button>
    </div>

    <vue-good-table :columns="headerFields" :rows="tagRelationItems">
      <template #table-row="props">
        <input
          v-if="props.column.field == 'clArticleId'"
          type="checkbox"
          :value="props.row.clArticleId"
          :checked="props.row.hasRelation"
          :disabled="disabled"
          @change="onChecked(props.row.clArticleId, $event.target.checked)"
        />
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>
    </vue-good-table>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessServiceService from '@/api/BusinessServiceService'
import ClArticleTag from '@/models/ekoset/ClArticleTag'

import 'vue-good-table/dist/vue-good-table.css'

@Component({
  components: {
    VueGoodTable: () => import(/* webpackChunkName: "vue-good-table" */ 'vue-good-table')
  }
}) export default class AdminTagRelationList extends Vue {
  @Prop()
  private articleUrl

  @Prop({ type: Boolean, default: false })
  private disabled

  private tagRelationItems: any[] = []
  private createNewMode = false
  private newItem: ClArticleTag = new ClArticleTag()

  private headerFields = [
    {
      field: 'clArticleId',
      label: '',
      sortable: false
    },
    {
      field: 'clArticleName',
      label: 'Наименование'
    }
  ]

  private async updateTagList () {
    this.tagRelationItems = await getServiceContainer().articleService.getArticleTagsRelation(this.articleUrl)
  }

  private mounted () {
    this.updateTagList()
  }

  private layout () {
    return 'admin'
  }

  private onChecked (tagId: number, hasRelation: boolean) {
    this.$emit('tagchecked', tagId, hasRelation)
  }

  private async saveNewTag () {
    await getServiceContainer().articleService.saveArticleTag(this.newItem)
    this.newItem = new ClArticleTag()
    this.createNewMode = false
    this.updateTagList()
  }

  private cancelSaveNewTag () {
    this.newItem = new ClArticleTag()
    this.createNewMode = false
  }
}
</script>
