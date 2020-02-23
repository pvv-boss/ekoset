<template>
  <div class="brc_admin-freeblock-container">
    <b-field
      label="Управление блоками"
      style="margin-top:15px; display:flex; flex-direction:column;"
    >
      <b-button
        type="is-primary"
        outlined
        @click="createNewBlockMode = true"
        v-show="!createNewBlockMode"
      >Создать блок-конструктор</b-button>

      <div v-if="createNewBlockMode" class="brc-admin-card-create-row" style="gap:0px">
        <b-input
          placeholder="Наименование"
          type="text"
          required
          validation-message="Наименование не может быть пустым"
          v-model="newComponentInfo.dispalyName"
          style="width:270px;"
        ></b-input>
        <b-button @click="saveNewBlock" type="is-primary" size="is-small" style="margin-left:auto;">
          <b-icon icon="check"></b-icon>
        </b-button>
        <b-button @click="cancelSaveNewBlock" size="is-small" style="margin-left:5px;">
          <b-icon icon="cancel"></b-icon>
        </b-button>
      </div>
    </b-field>

    <span class="brc_admin-freeblock-container__help">
      <i>(Для измнения порядка следования перетащите блок)</i>
    </span>

    <draggable v-model="dynamicComponentInfoListState" @change="handleChange">
      <div
        v-for="iterComponentInfo in dynamicComponentInfoListState"
        :key="iterComponentInfo.id + iterComponentInfo.dispalyName"
      >
        <AdminFreeBlockItem
          :dynamicComponentInfo="iterComponentInfo"
          @componentinfo:edit="freeBlockEdit(iterComponentInfo)"
          @componentinfo:status:changed="blockStatusChanged(iterComponentInfo)"
          @componentinfo:delete="deleteBlock(iterComponentInfo)"
        ></AdminFreeBlockItem>
      </div>
    </draggable>

    <b-modal
      :active.sync="isCardModalActive"
      scroll="keep"
      trap-focus
      aria-role="dialog"
      aria-modal
      :width="1120"
    >
      <AdminFreeBlockInfoEditor :dynamicComponentInfo="editableComponentInfo"></AdminFreeBlockInfoEditor>
      <b-button
        class="button"
        type="button"
        @click="closeFreeBlockEditModal"
        style="float:right;margin:20px;"
      >Сохранить и закрыть</b-button>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import AdminFreeBlockItem from '@/components/admin/AdminFreeBlockItem.vue'
import AdminFreeBlockInfoEditor from '@/components/admin/AdminFreeBlockInfoEditor.vue'

import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'


@Component({
  components: {
    AdminFreeBlockItem,
    AdminFreeBlockInfoEditor
  }
})
export default class AdminDynamicComponentsContainer extends Vue {
  @Prop()
  private value

  private dynamicComponentInfoListState: DynamicComponentInfo[] = []

  private editableComponentInfo: DynamicComponentInfo = new DynamicComponentInfo()

  private editableComponentInfoState: DynamicComponentInfo = new DynamicComponentInfo()


  private newComponentInfo: DynamicComponentInfo = new DynamicComponentInfo()

  private isCardModalActive = false

  private createNewBlockMode = false

  @Watch('value', { immediate: true })
  private async componentInfoListChanged () {
    this.dynamicComponentInfoListState = this.value
  }

  private created () {
    this.createNewComponentInfo()
  }

  private handleChange () {
    for (let i = 0; i < this.dynamicComponentInfoListState.length; i++) {
      this.dynamicComponentInfoListState[i].visibleIndex = i;
    }
    this.$emit('input', this.dynamicComponentInfoListState)
    this.fireSaveComponentsEvent()
  }

  private freeBlockEdit (blockInfo: DynamicComponentInfo) {
    this.editableComponentInfoState = blockInfo
    this.editableComponentInfo = new DynamicComponentInfo()
    this.editableComponentInfo.id = blockInfo.id
    this.editableComponentInfo.props = {}
    // this.editableComponentInfo.props.leftBlock
    this.editableComponentInfo.props.leftBlock = blockInfo.props.leftBlock
    this.editableComponentInfo.props.rightBlock = blockInfo.props.rightBlock
    this.isCardModalActive = true
  }

  private closeFreeBlockEditModal () {
    this.editableComponentInfoState.id = this.editableComponentInfo.id
    this.editableComponentInfoState.props.leftBlock = this.editableComponentInfo.props.leftBlock
    this.editableComponentInfoState.props.rightBlock = this.editableComponentInfo.props.rightBlock
    this.isCardModalActive = false
    this.editableComponentInfo = new DynamicComponentInfo()
    this.fireSaveComponentsEvent()
  }

  private saveNewBlock () {
    this.dynamicComponentInfoListState.push(this.newComponentInfo)
    this.fireSaveComponentsEvent()
    this.createNewComponentInfo()
    this.createNewBlockMode = false
  }

  private cancelSaveNewBlock () {
    this.createNewComponentInfo()
    this.createNewBlockMode = false
  }

  private deleteBlock (blockInfo: DynamicComponentInfo) {
    const okCallback = async () => {
      await getServiceContainer().dynamicComponentsService.adminDeleteDynamicComponent(blockInfo.id)
      this.$emit('freecomponent:delete')
    }

    this.$BrcAlert(
      BrcDialogType.Warning,
      'Удалить блок-конструктор ?',
      'Подтвердите удаление',
      okCallback
    )
  }

  private blockStatusChanged (blockInfo: DynamicComponentInfo) {
    this.fireSaveComponentsEvent()
  }

  private fireSaveComponentsEvent () {
    this.$emit('freecomponent:save', this.dynamicComponentInfoListState)
  }

  private createNewComponentInfo () {
    this.newComponentInfo = new DynamicComponentInfo()
    this.newComponentInfo.dispalyName = 'Конструктор'
    this.newComponentInfo.code = 6
    this.newComponentInfo.id = 0
    this.newComponentInfo.props = {}
    this.newComponentInfo.props.leftBlock = ''
    this.newComponentInfo.props.rightBlock = ''
    this.newComponentInfo.visibleIndex = this.dynamicComponentInfoListState.length - 1
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background-color: white;

  .brc_admin-freeblock-item {
    margin-top: 10px;
  }

  .brc_admin-freeblock-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  