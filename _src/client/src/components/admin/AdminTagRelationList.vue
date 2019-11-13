<template>
  <div class="brc-brand-relation-list_wrapper">
    <b-button
      type="is-primary"
      outlined
      @click="createNewMode = true"
      v-show="!createNewMode"
      style="margin-bottom:10px"
    >Создать</b-button>

    <div v-if="createNewMode" class="brc-admin-card-create-row" style="margin-bottom:10px">
      <b-input
        placeholder="Наименование"
        type="text"
        required
        validation-message="Наименование не может быть пустым"
        v-model="newItem.clArticleName"
      ></b-input>
      <b-button @click="saveNewTag" type="is-primary">OK</b-button>
      <b-button @click="cancelSaveNewTag">Отмена</b-button>
    </div>

    <vue-good-table :columns="headerFields" :rows="tagRelationItems">
      <template #table-row="props">
        <input
          v-if="props.column.field == 'clArticleId'"
          type="checkbox"
          :value="props.row.clArticleId"
          :checked="props.row.hasRelation"
          @change="onChecked(props.row.clArticleId,$event.target.checked)"
          :disabled="disabled"
        />
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import BusinessServiceService from '@/api/BusinessServiceService'
import ClArticleTag from '@/models/ekoset/ClArticleTag'

@Component({})
export default class AdminTagRelationList extends Vue {
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
      label: ''
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
